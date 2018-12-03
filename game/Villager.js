class Villager extends Entity {
    constructor(x, y, type) {
        super(x, y, CONFIG.villager[type]);
        villagers.push(this);
        this.type = type;
        this.loadSprites("villager" + this.type, ["dead", "idle", "grabbed", "thrown", "landing", "runup", "rundown", "runleft", "runright"]);
        this.path = null;
        this.setSprite("idle");
        this.target=this.pos;
        this.wFrame=0;
    }
    wander() {
        this.setSprite("idle");
        if(this.wFrame<=0){
            if(this.pos.dist(this.target)<=5){
                let theta=Math.random()*Math.TAU;
                let r=Math.random()*200;
                this.target = new CR.Vector.Vector2(
                    Math.max(-300, Math.min(300, this.pos.x-150+300*Math.random())),
                    Math.max(-300, Math.min(300, this.pos.y-150+300*Math.random()))
                );
                this.wFrame=Math.random()*300;
            }
        } else {
            if(this.pos.dist(this.target)<=5){
                this.wFrame--;
            } else {
                this.moveNorm(this.target.sub(this.pos));
            }
        }
    }
    enter(b) {
        this.building = b;
        this.setState("in");
        CONFIG.building[b.type].treat(b, this);
    }
    step() {
        if (this.state == "idle") {
            this.setSprite("idle");
            this.wander();
        } else if (this.state == "grabbed") {
            this.setSprite("grabbed");
            this.tangible = false;
            this.vulnerable = false;
            this.npos = player.npos.add(new CR.Vector.Vector2(45,0));
        } else if (this.state == "thrown") {
            this.setSprite("thrown");
            this.vulnerable = false;
            this.tangible = false;
            let t = this.frame / CONFIG.throwT;
            this.moveTo(this.path[0].add(this.path[1].scale(t)).add(new CR.Vector.Vector2(0, -4 * CONFIG.throwHeight * t * (1 - t))));
            if (this.frame == CONFIG.throwT) {
                this.path = null;
                
                buildings.forEach(b => this.willCollideB(b) && this.enter(b));
                enemies.forEach(v => {
                    if(this.collidingE(v)){
                        v.takeDamage(this.damage);
                        score++;
                    }
                });
                if (this.state != "in") {
                    this.setState("landing");
                    this.takeDamage(CONFIG.villager[this.type].fallDamage,1);
                }
            }
        } else if (this.state == "landing") {
            this.setSprite("landing");
            this.vulnerable = false;
            if (this.frame == CONFIG.landT) {
                this.setState("idle");
            }
        } else if (this.state == "in") {
            this.setSprite();
            if (this.frame == CONFIG.building[this.building.type].frames) {
                this.moveTo(CONFIG.building[this.building.type].exitpos.add(this.building.box.pos));
                this.building=null;
                this.setState("idle");
            }
        }
        this.npos.x = Math.max(this.r - width / 2, Math.min(width / 2 - this.r, this.npos.x));
        this.npos.y = Math.max(this.r - height / 2, Math.min(height / 2 - this.r, this.npos.y));
    }
}
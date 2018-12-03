class Enemy extends Entity {
    constructor(x, y, type) {
        super(x, y, CONFIG.enemy[type]);
        enemies.push(this);
        this.type = type;
        this.loadSprites("enemy" + this.type, ["dead", "idle", "runup", "rundown", "runleft", "runright"]);
        this.setSprite("idle");
    }
    pathfind() {
        let mindex=0;
        for(let i=0; i<villagers.length;i++)
            if(villagers[mindex].pos.dist(this.pos)>villagers[i].pos.dist(this.pos)){
                mindex=i;
            }
        if(this.pos.dist(villagers[mindex].pos)<this.pos.dist(player.pos)){
            return villagers[mindex].pos.sub(this.pos);
        } else {
            return player.pos.sub(this.pos);
        }
    }
    step() {
        if (this.state == "idle") {
            if (this.collidingE(player)) player.takeDamage(this.damage);
            villagers.forEach(v => this.collidingE(v) && v.takeDamage(this.damage));
            this.moveNorm(this.pathfind());
        }
    }
}
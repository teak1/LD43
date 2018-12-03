class Entity {
    constructor(x, y, obj) {
        this.speed = obj.speed;
        this.r = obj.r;
        this.Iframes = obj.Iframes;
        this.damage = obj.damage;
        this.pos = new CR.Vector.Vector2(x, y);
        this.maxHP = obj.hp;
        this.state = "idle";
        this.completeHeal();
        this.npos = this.pos;
        this.vel = new CR.Vector.Vector2(0, 0);
        this.frame = 0;
        this.Iframe = 0;
        this.tangible = true;
        this.vulnerable = true;
        this.sprites = {};

        if (this.HP <= 0) {
            this.setState("dead");
        }
    }
    loadSprites(name, arr) {
        let i = 0;
        while (i < arr.length) {
            this.sprites[arr[i]] = Object.assign(new Image(), {
                src: `sprites/${name}_${arr[i]}.png`
            });
            i++;
        }
    }
    setState(state) {
        this.state = state;
        this.frame = 0;
    }
    setSprite(sprite) {
        this.sprite = this.sprites[sprite];
    }
    collidingE(entity) {
        return this.pos.dist(entity.pos) <= this.r + entity.r;
    }
    willCollideB(b) {
        return (Math.abs(this.npos.x - b.box.pos.x) <= this.r + b.box.halfsize.x) &&
            (Math.abs(this.npos.y - b.box.pos.y) <= this.r + b.box.halfsize.y);
    }
    setHP(hp) {
        this.hp = Math.min(Math.max(hp, 0), this.maxHP);
        if (this.hp == 0 && this.state != "dead") this.kill();
    }
    kill() {
        this.setState("dead");
        this.setSprite("dead");
        this.vulnerable = false;
        this.tangible = false;
    }
    takeDamage(damage,override) {
        if (((this.vulnerable && !this.Iframe)||override) && damage) {
            this.Iframe = 1;
            this.setHP(this.hp - damage);
            //Audio
        }
    }
    heal(health) {
        this.setHP(this.hp + health);
        //Audio
    }
    completeHeal() {
        this.setHP(this.maxHP);
    }
    moveBy(dx, dy) {
        this.vel = new CR.Vector.Vector2(dx, dy);
        this.npos = this.pos.add(this.vel);
    }
    moveNorm(dx, dy) {
        if (dy == undefined) {
            dy = dx.y;
            dx = dx.x;
        }
        let norm = this.speed / Math.sqrt(dx * dx + dy * dy);
        if (norm == Infinity) return;
        this.moveBy(dx * norm, dy * norm);
    }
    moveTo(x, y) {
        if (y == undefined) {
            this.npos = x;
        } else {
            this.npos = new CR.Vector.Vector2(x, y);
        }
        this.vel = this.npos.sub(this.pos);
    }
    prestep() {
        if (this.hp == 0 && this.state != "dead") {
            this.setState("dead");
            this.setSprite("dead");
        }
        this.tangible = true;
        this.frame++;
        if (this.Iframe) {
            this.vulnerable = false;
            if (this.Iframe >= this.Iframes + 1) {
                this.Iframe = 0;
            } else {
                this.Iframe++;
            }
        } else {
            this.vulnerable = true;
        }
        this.npos = this.pos;
        this.vel = new CR.Vector.Vector2(0, 0);
        this.moused = this.pos.dist(mousePos) <= this.r;
        if (mousedown == 1 && this.moused) {
            this.clicked = true;
        }
    }
    poststep() {
        if (this.tangible) buildings.forEach(b => {
            if (this.willCollideB(b)) {
                if (this.pos.x + this.r <= b.box.left) {
                    this.npos.x = b.box.left - this.r;
                } else if (this.pos.x - this.r >= b.box.right) {
                    this.npos.x = b.box.right + this.r;
                }
                if (this.pos.y + this.r <= b.box.top) {
                    this.npos.y = b.box.top - this.r;
                } else if (this.pos.y - this.r >= b.box.bottom) {
                    this.npos.y = b.box.bottom + this.r;
                }
            }
        })
        if (!mousedown) this.clicked = false;
        this.pos = this.npos;
        this.vel = new CR.Vector.Vector2(0, 0);
    }
    render(ctx) {
        if (this.Iframe && Math.floor(frameCount / 6) % 3) {

        } else if (this.Iframe && frameCount % 2) {

        } else if(this.sprite) {
            ctx.drawImage(this.sprite, ctx.width / 2 + this.pos.x - this.sprite.width / 2, ctx.height / 2 + this.pos.y - this.sprite.height / 2);
        }
    }
}
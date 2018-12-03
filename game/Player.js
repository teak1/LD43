class Player extends Entity {
    constructor() {
        super(0, 0, CONFIG.player);
        this.loadSprites("player", ["dead", "idle", "runup", "rundown", "runleft", "runright", "gidle", "grunup", "grundown", "grunleft", "grunright"]);
        this.setSprite("idle");
    }
    step() {
        if (villagers.length < 2) {
            this.hp = 0;
        }
        if (this.hp == 0) {
            // throw `You're dead buddy. You got a score of ${score}.`;
            showGameOverScreen(score);
        }
        this.moveNorm(keys.d - keys.a, keys.s - keys.w);

        for (let i = 0; i < villagers.length && !this.grabbing; i++) {
            let v = villagers[i];
            if (v.clicked && !mousedown) {
                if (v.pos.dist(this.pos) < CONFIG.grabR + v.r + this.r) {
                    this.grabbing = v;
                    v.setState("grabbed");
                }
            }
        }

        if (this.grabbing) {
            if (mousedown) {
                let dir = mousePos.sub(this.pos);
                if (dir.mag() > CONFIG.throwR) {
                    dir = dir.scale(CONFIG.throwR / dir.mag());
                }
                this.grabbing.setState("thrown");
                this.grabbing.path = [this.grabbing.pos, dir];
                this.grabbing = null;
            }
        }
        this.npos.x = Math.max(this.r - width / 2, Math.min(width / 2 - this.r, this.npos.x));
        this.npos.y = Math.max(this.r - height / 2, Math.min(height / 2 - this.r, this.npos.y));
    }
}
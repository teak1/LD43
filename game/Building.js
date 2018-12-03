class Building {
    constructor(x,y,w,h,type){
        buildings.push(this);
        this.box=new CR.Box(x,y,w,h);
        this.type=type;
        this.sprite=Object.assign(new Image(), {
            src: `sprites/building${type}.png`
        });
    }
    render(ctx){
        ctx.drawImage(this.sprite, ctx.width / 2 + this.box.pos.x - this.sprite.width / 2, ctx.height / 2 + this.box.pos.y - this.sprite.height / 2);
    }
}
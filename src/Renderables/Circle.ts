import * as Vector from '../Vector';
import Renderable from '../Renderable';
import render_queue from '../renderQueue';

//Everything is centered
export class Circle extends Renderable {
    public pos: Vector.Vector2;
    public r: number;
    constructor(x, y, r, fill: any, stroke: any) {
        super(fill, stroke);
        this.pos = new Vector.Vector2(x, y);
        this.r = r;
    }
    public render(ctx) {
        this.setColor(ctx);
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.closePath();
        this.draw(ctx);
    }
}
export default {
    Circle,
    render(x, y, r, fill: any, stroke: any) {
        render_queue.add(new Circle(x, y, r, fill, stroke));
    }
}
import * as Vector from '../Vector';
import Renderable from '../Renderable';
import render_queue from '../renderQueue';

//Everything is centered
export class Polygon extends Renderable {
    public points: Array<Vector.Vector2> = new Array<Vector.Vector2>();
    constructor(fill: any, stroke: any, args) {
        super(fill, stroke);
        for (let i = 0; i < args.length; i += 2)
            this.points.push(new Vector.Vector2(args[i], args[i + 1]));
    }
    public render(ctx) {
        this.setColor(ctx);
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        this.points.forEach((v, i) => i && ctx.lineTo(v.x, v.y));
        ctx.closePath();
        this.draw(ctx);
    }
}
export default {
    Polygon,
    render(fill: any, stroke: any, ...args) {
        render_queue.add(new Polygon(fill, stroke, args));
    }
}
import * as Vector from '../Vector';
import Renderable from '../Renderable';
import render_queue from '../renderQueue';
import Box from '../Box';
import Canvas from '../Canvas';

//Everything is centered
export class Rect extends Renderable {
    public box: Box;
    constructor(x, y, w, h, fill: any, stroke: any, theta: number = 0) {
        super(fill, stroke);
        this.box = new Box(x, y, w, h);
    }
    public render(ctx) {
        this.setColor(ctx);
        if (!this.box.hasRotation) {
            ctx.fillRect(this.box.left, this.box.top, this.box.size.x, this.box.size.y);
        } else {
            ctx.beginPath();
            ctx.moveTo(this.box.vertices[0].x, this.box.vertices[0].y);
            for (let i = 1; i < this.box.vertices.length; i++) {
                ctx.lineTo(this.box.vertices[i].x, this.box.vertices[i].y);
            }
            ctx.closePath();
        }
        this.draw(ctx);
    }
}
export default {
    Rect,
    render(x, y, w, h, fill, stroke, theta) {
        new Rect(x, y, w, h, fill, stroke, theta).render(Canvas.getGlobalCanvas().context);
    }
}
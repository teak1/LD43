import * as Vector from '../Vector';
import Renderable from '../Renderable';
import render_queue from '../renderQueue';
import Box from '../Box';

//Everything is centered
export class ImageRenderable extends Renderable {
    public img: HTMLImageElement;
    public box: Box;
    constructor(URL, x, y, w, h) {
        super();
        this.img = new Image();
        this.img.src = URL;
        this.box = new Box(x, y, w, h);
    }
    public render(ctx) {
        ctx.drawImage(this.img, -this.box.size.x / 2, -this.box.size.y / 2, this.box.size.x + this.box.pos.x, this.box.size.y + this.box.pos.y);
    }
}
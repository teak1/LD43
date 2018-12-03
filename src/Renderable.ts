import Color from './Color';
import Canvas from './Canvas';
export default class Renderable {
    public colorFill: any;
    public colorStroke: any;
    constructor(fill = Color(0, 0, 0, 1), stroke = Color(0, 0, 0, 1)) {
        this.colorFill = fill;
        this.colorStroke = stroke;
    }
    setColor(ctx) {
        ctx.fillStyle = this.colorFill.toString();
        ctx.strokeStyle = this.colorStroke.toString();
    }
    draw(ctx) {
        ctx.fill();
        ctx.stroke();
    }
    public canvas() {
        return Canvas.getGlobalCanvas();
    }
    public context() {
        return this.canvas().context;
    }
}
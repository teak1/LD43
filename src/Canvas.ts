import render_queue from './renderQueue';
class Canvas {
    canvas: HTMLCanvasElement = document.createElement("canvas");
    context: CanvasRenderingContext2D = this.canvas.getContext("2d");
    constructor(w, h) {
        this.canvas.setAttribute("width", w);
        this.canvas.setAttribute("height", h);
        this.canvas.setAttribute("style", "position:absolute;top:0px;left:0px;");
    }
    put(element: Element) {
        element.appendChild(this.canvas);
    }
    render() {
        let l = null;
        while (l = render_queue.get()) {
            l.render(this.context);
        };
        this.context.fill();
        this.context.stroke();
    }
    addEventListener(type: string, func: any) {
        window.document.addEventListener(type, func);
    }
}
let global_canvas_object = null;

export function createCanvas(w, h) {
    global_canvas_object = new Canvas(w, h);
    return global_canvas_object;
}

export default {
    createCanvas,
    Canvas,
    getGlobalCanvas() {
        return global_canvas_object;
    }
}
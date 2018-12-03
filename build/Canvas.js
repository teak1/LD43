System.register(["./renderQueue"], function (exports_1, context_1) {
    "use strict";
    var renderQueue_1, Canvas, global_canvas_object;
    var __moduleName = context_1 && context_1.id;
    function createCanvas(w, h) {
        global_canvas_object = new Canvas(w, h);
        return global_canvas_object;
    }
    exports_1("createCanvas", createCanvas);
    return {
        setters: [
            function (renderQueue_1_1) {
                renderQueue_1 = renderQueue_1_1;
            }
        ],
        execute: function () {
            Canvas = class Canvas {
                constructor(w, h) {
                    this.canvas = document.createElement("canvas");
                    this.context = this.canvas.getContext("2d");
                    this.canvas.setAttribute("width", w);
                    this.canvas.setAttribute("height", h);
                    this.canvas.setAttribute("style", "position:absolute;top:0px;left:0px;");
                }
                put(element) {
                    element.appendChild(this.canvas);
                }
                render() {
                    let l = null;
                    while (l = renderQueue_1.default.get()) {
                        l.render(this.context);
                    }
                    ;
                    this.context.fill();
                    this.context.stroke();
                }
                addEventListener(type, func) {
                    window.document.addEventListener(type, func);
                }
            };
            global_canvas_object = null;
            exports_1("default", {
                createCanvas,
                Canvas,
                getGlobalCanvas() {
                    return global_canvas_object;
                }
            });
        }
    };
});
//# sourceMappingURL=Canvas.js.map
System.register(["./Color", "./Canvas"], function (exports_1, context_1) {
    "use strict";
    var Color_1, Canvas_1, Renderable;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Color_1_1) {
                Color_1 = Color_1_1;
            },
            function (Canvas_1_1) {
                Canvas_1 = Canvas_1_1;
            }
        ],
        execute: function () {
            Renderable = class Renderable {
                constructor(fill = Color_1.default(0, 0, 0, 1), stroke = Color_1.default(0, 0, 0, 1)) {
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
                canvas() {
                    return Canvas_1.default.getGlobalCanvas();
                }
                context() {
                    return this.canvas().context;
                }
            };
            exports_1("default", Renderable);
        }
    };
});
//# sourceMappingURL=Renderable.js.map
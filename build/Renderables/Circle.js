System.register(["../Vector", "../Renderable", "../renderQueue"], function (exports_1, context_1) {
    "use strict";
    var Vector, Renderable_1, renderQueue_1, Circle;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Vector_1) {
                Vector = Vector_1;
            },
            function (Renderable_1_1) {
                Renderable_1 = Renderable_1_1;
            },
            function (renderQueue_1_1) {
                renderQueue_1 = renderQueue_1_1;
            }
        ],
        execute: function () {
            //Everything is centered
            Circle = class Circle extends Renderable_1.default {
                constructor(x, y, r, fill, stroke) {
                    super(fill, stroke);
                    this.pos = new Vector.Vector2(x, y);
                    this.r = r;
                }
                render(ctx) {
                    this.setColor(ctx);
                    ctx.beginPath();
                    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
                    ctx.closePath();
                    this.draw(ctx);
                }
            };
            exports_1("Circle", Circle);
            exports_1("default", {
                Circle,
                render(x, y, r, fill, stroke) {
                    renderQueue_1.default.add(new Circle(x, y, r, fill, stroke));
                }
            });
        }
    };
});
//# sourceMappingURL=Circle.js.map
System.register(["../Renderable", "../Box", "../Canvas"], function (exports_1, context_1) {
    "use strict";
    var Renderable_1, Box_1, Canvas_1, Rect;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Renderable_1_1) {
                Renderable_1 = Renderable_1_1;
            },
            function (Box_1_1) {
                Box_1 = Box_1_1;
            },
            function (Canvas_1_1) {
                Canvas_1 = Canvas_1_1;
            }
        ],
        execute: function () {
            //Everything is centered
            Rect = class Rect extends Renderable_1.default {
                constructor(x, y, w, h, fill, stroke, theta = 0) {
                    super(fill, stroke);
                    this.box = new Box_1.default(x, y, w, h);
                }
                render(ctx) {
                    this.setColor(ctx);
                    if (!this.box.hasRotation) {
                        ctx.fillRect(this.box.left, this.box.top, this.box.size.x, this.box.size.y);
                    }
                    else {
                        ctx.beginPath();
                        ctx.moveTo(this.box.vertices[0].x, this.box.vertices[0].y);
                        for (let i = 1; i < this.box.vertices.length; i++) {
                            ctx.lineTo(this.box.vertices[i].x, this.box.vertices[i].y);
                        }
                        ctx.closePath();
                    }
                    this.draw(ctx);
                }
            };
            exports_1("Rect", Rect);
            exports_1("default", {
                Rect,
                render(x, y, w, h, fill, stroke, theta) {
                    new Rect(x, y, w, h, fill, stroke, theta).render(Canvas_1.default.getGlobalCanvas().context);
                }
            });
        }
    };
});
//# sourceMappingURL=Rect.js.map
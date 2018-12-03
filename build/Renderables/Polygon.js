System.register(["../Vector", "../Renderable", "../renderQueue"], function (exports_1, context_1) {
    "use strict";
    var Vector, Renderable_1, renderQueue_1, Polygon;
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
            Polygon = class Polygon extends Renderable_1.default {
                constructor(fill, stroke, args) {
                    super(fill, stroke);
                    this.points = new Array();
                    for (let i = 0; i < args.length; i += 2)
                        this.points.push(new Vector.Vector2(args[i], args[i + 1]));
                }
                render(ctx) {
                    this.setColor(ctx);
                    ctx.beginPath();
                    ctx.moveTo(this.points[0].x, this.points[0].y);
                    this.points.forEach((v, i) => i && ctx.lineTo(v.x, v.y));
                    ctx.closePath();
                    this.draw(ctx);
                }
            };
            exports_1("Polygon", Polygon);
            exports_1("default", {
                Polygon,
                render(fill, stroke, ...args) {
                    renderQueue_1.default.add(new Polygon(fill, stroke, args));
                }
            });
        }
    };
});
//# sourceMappingURL=Polygon.js.map
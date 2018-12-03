System.register(["../Renderable", "../Box"], function (exports_1, context_1) {
    "use strict";
    var Renderable_1, Box_1, ImageRenderable;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Renderable_1_1) {
                Renderable_1 = Renderable_1_1;
            },
            function (Box_1_1) {
                Box_1 = Box_1_1;
            }
        ],
        execute: function () {
            //Everything is centered
            ImageRenderable = class ImageRenderable extends Renderable_1.default {
                constructor(URL, x, y, w, h) {
                    super();
                    this.img = new Image();
                    this.img.src = URL;
                    this.box = new Box_1.default(x, y, w, h);
                }
                render(ctx) {
                    ctx.drawImage(this.img, -this.box.size.x / 2, -this.box.size.y / 2, this.box.size.x + this.box.pos.x, this.box.size.y + this.box.pos.y);
                }
            };
            exports_1("ImageRenderable", ImageRenderable);
        }
    };
});
//# sourceMappingURL=Image.js.map
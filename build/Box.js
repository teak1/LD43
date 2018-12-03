System.register(["./Vector"], function (exports_1, context_1) {
    "use strict";
    var Vector_1, Box;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Vector_1_1) {
                Vector_1 = Vector_1_1;
            }
        ],
        execute: function () {
            Box = class Box {
                constructor(x, y, w, h) {
                    this.vertices = [];
                    this.pos = new Vector_1.default.Vector2(x, y);
                    this.size = new Vector_1.default.Vector2(w, h);
                    this.halfsize = new Vector_1.default.Vector2(w / 2, h / 2);
                    this.top = this.pos.y - this.halfsize.y;
                    this.left = this.pos.x - this.halfsize.x;
                    this.right = this.pos.x + this.halfsize.x;
                    this.bottom = this.pos.y + this.halfsize.y;
                }
            };
            exports_1("Box", Box);
            exports_1("default", Box);
        }
    };
});
//# sourceMappingURL=Box.js.map
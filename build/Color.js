System.register(["./Vector"], function (exports_1, context_1) {
    "use strict";
    var Vector_1, ColorRGBA255, ColorRGBANormal, ColorRGB255, ColorRGBNormal, GenericColorString;
    var __moduleName = context_1 && context_1.id;
    function Color(...things) {
        if (things.length === 4) {
            return new ColorRGBA255(things[0], things[1], things[2], things[3]);
        }
        if (things.length === 3) {
            return new ColorRGB255(things[0], things[1], things[2]);
        }
        if (things.length === 2) {
            return new ColorRGBA255(things[0], things[0], things[0], things[1]);
        }
        if (things.length === 1 && things[0].constructor === Number) {
            return new ColorRGB255(things[0], things[0], things[0]);
        }
        if (things[0] != undefined)
            return new GenericColorString(things[0]);
        throw new Error("Color takes atleast 1 input");
    }
    exports_1("default", Color);
    return {
        setters: [
            function (Vector_1_1) {
                Vector_1 = Vector_1_1;
            }
        ],
        execute: function () {
            ColorRGBA255 = class ColorRGBA255 extends Vector_1.default.Vector {
                constructor(r, g, b, a = 255) {
                    super(4, "rgba", r, g, b, a);
                }
                normalize() {
                    return new ColorRGBANormal(this.r / 255, this.g / 255, this.b / 255, this.a / 255);
                }
                toString() {
                    return `rgba(${this.r},${this.g},${this.b})`;
                }
            };
            exports_1("ColorRGBA255", ColorRGBA255);
            ColorRGBANormal = class ColorRGBANormal extends Vector_1.default.Vector {
                constructor(r, g, b, a = 1) {
                    super(4, "rgba", r, g, b, a);
                }
                denormalize() {
                    return new ColorRGBA255(this.r * 255, this.g * 255, this.b * 255, this.a * 255);
                }
                toString() {
                    return this.denormalize().toString();
                }
            };
            exports_1("ColorRGBANormal", ColorRGBANormal);
            ColorRGB255 = class ColorRGB255 extends Vector_1.default.Vector {
                constructor(r, g, b) {
                    super(3, "rgb", r, g, b);
                }
                normalize() {
                    return new ColorRGBNormal(this.r / 255, this.g / 255, this.b / 255);
                }
                toRGBA(a) {
                    return new ColorRGBANormal(this.r, this.g, this.b, a || 255);
                }
                toString() {
                    return `rgb(${this.r},${this.g},${this.b})`;
                }
            };
            exports_1("ColorRGB255", ColorRGB255);
            ColorRGBNormal = class ColorRGBNormal extends Vector_1.default.Vector {
                constructor(r, g, b, a = 1) {
                    super(3, "rgb", r, g, b);
                }
                denormalize() {
                    return new ColorRGB255(this.r * 255, this.g * 255, this.b * 255);
                }
                toRGBA(a) {
                    return new ColorRGBANormal(this.r, this.g, this.b, a || 1);
                }
                toString() {
                    return this.denormalize().toString();
                }
            };
            exports_1("ColorRGBNormal", ColorRGBNormal);
            GenericColorString = class GenericColorString {
                constructor(color) {
                    this.color = color;
                }
                toString() {
                    return this.color;
                }
            };
            exports_1("GenericColorString", GenericColorString);
        }
    };
});
//# sourceMappingURL=Color.js.map
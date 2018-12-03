import Vector from './Vector';

export class ColorRGBA255 extends Vector.Vector {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r: number, g: number, b: number, a: number = 255) {
        super(4, "rgba", r, g, b, a);
    }
    normalize() {
        return new ColorRGBANormal(this.r / 255, this.g / 255, this.b / 255, this.a / 255);
    }
    toString() {
        return `rgba(${this.r},${this.g},${this.b})`;
    }
}
export class ColorRGBANormal extends Vector.Vector {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r: number, g: number, b: number, a: number = 1) {
        super(4, "rgba", r, g, b, a);
    }
    denormalize() {
        return new ColorRGBA255(this.r * 255, this.g * 255, this.b * 255, this.a * 255);
    }
    toString() {
        return this.denormalize().toString();
    }
}

export class ColorRGB255 extends Vector.Vector {
    r: number;
    g: number;
    b: number;
    constructor(r: number, g: number, b: number) {
        super(3, "rgb", r, g, b);
    }
    normalize() {
        return new ColorRGBNormal(this.r / 255, this.g / 255, this.b / 255);
    }
    toRGBA(a?: number) {
        return new ColorRGBANormal(this.r, this.g, this.b, a || 255);
    }
    toString() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }
}
export class ColorRGBNormal extends Vector.Vector {
    r: number;
    g: number;
    b: number;
    constructor(r: number, g: number, b: number, a: number = 1) {
        super(3, "rgb", r, g, b);
    }
    denormalize() {
        return new ColorRGB255(this.r * 255, this.g * 255, this.b * 255);
    }
    toRGBA(a?: number) {
        return new ColorRGBANormal(this.r, this.g, this.b, a || 1);
    }
    toString() {
        return this.denormalize().toString();
    }
}

export class GenericColorString {
    color: string;
    constructor(color: string) {
        this.color = color;
    }
    toString() {
        return this.color;
    }
}
export default function Color(...things) {
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
    if (things[0] != undefined) return new GenericColorString(things[0]);
    throw new Error("Color takes atleast 1 input");
}
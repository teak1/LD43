import Vector from './Vector';
export class Box {
    public size: any;
    public pos: any;
    public halfsize: any;
    public vertices: Array<any> = [];
    public top: number;
    public left: number;
    public right: number;
    public bottom: number;
    public hasRotation: Boolean;
    constructor(x, y, w, h) {
        this.pos = new Vector.Vector2(x, y);
        this.size = new Vector.Vector2(w, h);
        this.halfsize = new Vector.Vector2(w / 2, h / 2);
        this.top = this.pos.y - this.halfsize.y;
        this.left = this.pos.x - this.halfsize.x;
        this.right = this.pos.x + this.halfsize.x;
        this.bottom = this.pos.y + this.halfsize.y;
    }
}

export default Box;
var getterDict: Object = {};
export class _Vector {
	private size: number;
	public refs: string;
	public values: number[];
	constructor(size: number = 0, refs: string = "", ...a: number[]) {
		this.size = size;
		this.refs = refs;
		this.values = new Array<number>(this.size);
		for (var i: number = 0; i < this.values.length; i++) {
			this.values[i] = 0;
			if (a.length > i) {
				this.values[i] = a[i];
			}
			if (!getterDict[this.refs[i]]) {
				getterDict[this.refs[i]] = new Function(`return{get(){return this.get(this,"${this.refs[i]}");},set(value){return this.set(this,"${this.refs[i]}",value);}}`);
			}
			if (!getterDict[this.refs[i]]) {
				let fn = (val => {
					return _ => {
						return {
							get() {
								return this.get(this, val);
							},
							set(value) {
								return this.set(this, val, value);
							}
						}
					}
				});
				getterDict[this.refs[i]] = fn(this.refs[i]);
			}
			Object.defineProperty(this, this.refs[i], getterDict[this.refs[i]]());
		}
	}
	private get(self: _Vector, name: string): number {
		if (self.refs.indexOf(name) >= 0) {
			return self.values[self.refs.indexOf(name)];
		}
	}
	private set(self: _Vector = this, name: string, value: number): number {
		if (value === undefined) throw "MARCUS";
		if (self.refs.indexOf(name) >= 0) {
			return self.values[self.refs.indexOf(name)] = value;
		}
	}
	private validateOther(other: any) {
		if (this.refs != other.refs) {
			throw new TypeError("VECTOR NOT CONSISTANT DIMENTION");
		}
	}
	public clone(): any {
		var next: any = this.constructor;
		var vec: any = new next();
		for (var i in this.values) {
			vec.values[i] = this.values[i];
		}
		return vec;
	}
	public zero(): any {
		var next: any = this.constructor;
		var vec: any = new next();
		for (var i in vec.values) {
			vec.values[i] = 0
		}
		return vec;
	}
	private operate(self: any, other: any, operation: Function, thi?: any): typeof self {
		for (var i = 0; i < self.values.length; i++) {
			operation(self, other, i, thi);
		}
		return self;
	}
	public add(other: any): _Vector {
		this.validateOther(other);
		var op: _Vector = this.clone();
		return this.operate(op, other, this._add);
	}
	private _add(self: any, other: any, index: number) {
		self.values[index] += other.values[index];
	}
	public sub(other: any): _Vector {
		this.validateOther(other);
		var op: _Vector = this.clone();
		return this.operate(op, other, this._sub);
	}
	private _sub(self: any, other: any, index: number) {
		self.values[index] -= other.values[index];
	}
	public mult(other: any): _Vector {
		this.validateOther(other);
		var op: _Vector = this.clone();
		return this.operate(op, other, this._mult);
	}
	private _mult(self: any, other: any, index: number) {
		self.values[index] *= other.values[index];
	}
	public div(other: any): _Vector {
		this.validateOther(other);
		var op: _Vector = this.clone();
		return this.operate(op, other, this._div);
	}
	private _div(self: any, other: any, index: number) {
		self.values[index] /= other.values[index];
	}
	public scale(other: number): _Vector {
		var op: _Vector = this.clone();
		return this.operate(op, other, this._scale);
	}
	private _scale(self: any, other: number, index: number) {
		self.values[index] *= other;
	}
	public shrink(other: number): _Vector {
		return this.scale(1 / other);
	}
	public invert(): _Vector {
		return this.scale(-1);
	}
	public max(other: any): _Vector {
		this.validateOther(other);
		var op: _Vector = this.clone();
		return this.operate(op, other, this._max, this);
	}
	private _max(self: any, other: any, index: number, thi: any) {
		self.values[index] = other.values[index] < thi.values[index] ? thi.values[index] : other.values[index];
	}
	public min(other: any): _Vector {
		this.validateOther(other);
		var op: _Vector = this.clone();
		return this.operate(op, other, this._min, this);
	}
	private _min(self: any, other: any, index: number, thi: any) {
		self.values[index] = other.values[index] > thi.values[index] ? thi.values[index] : other.values[index];
	}
	public dot(other: any): number {
		this.validateOther(other);
		var acc: number = 0;
		this.values.forEach((v, i) => { acc += v * other.values[i]; });
		return acc;
	}
	public dist(other: any): number {
		this.validateOther(other);
		var acc: number = 0;
		for (var i: number = 0; i < this.values.length; i++) {
			acc += Math.pow(this.values[i] - other.values[i], 2);
		}
		return Math.sqrt(acc);
	}
	public mag(): number {
		return this.dist(this.zero());
	}
	public normalize() {
		return this.shrink(this.mag());
	}
}

export class Vector2 extends _Vector {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		super(2, "xy", x, y);
	}
	public rotate(theta: number): Vector2 {
		return new Vector2(this.x * Math.cos(theta) - this.y * Math.sin(theta), this.y * Math.cos(theta) + this.x * Math.sin(theta));
	}
}
export class Vector3 extends _Vector {
	x: number;
	y: number;
	z: number;
	constructor(x: number, y: number, z: number) {
		super(3, "xyz", x, y, z);
	}
	public cross(vec: Vector3): Vector3 {
		return new Vector3(
			this.y * vec.z - this.z * vec.y,
			this.z * vec.x - this.x * vec.z,
			this.x * vec.y - this.y * vec.x
		);
	}

	public getPerpendicularAboutY(): Vector3 {
		//I dont understand what this does but you have it so have fun.
		//https://github.com/DakotaLarson/Tanks-Server/blob/master/src/vector/Vector3.ts#L30-L32
		return new Vector3(this.z, this.y, this.x * -1);
	}
}

export class Vector4 extends _Vector {
	x: number;
	y: number;
	z: number;
	a: number;
	constructor(x: number, y: number, z: number, a: number) {
		super(4, "xyza", x, y, z, a);
	}
}

export default {
	Vector2: Vector2,
	Vector3: Vector3,
	Vector4: Vector4,
	Vector: _Vector
}

/*
*angleBetween
*signed angle between
*cross product
*lerp
*Magnitude
*Max
*Min
*Normalize
*reflect
*SmoothDamp
*direction
*/
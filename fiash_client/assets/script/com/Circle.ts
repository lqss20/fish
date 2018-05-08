import { Vector2D } from "./Vector2D";

export class Circle extends cc.Component
{
	private _radius:number;
	private _color:number;
	
	public constructor(radius:number, color:number = 0x000000)
	{
        super();
		this._radius = radius;
		this._color = color;
		// graphics.lineStyle(0, _color);
		// graphics.drawCircle(0, 0, _radius);
	}
	
	public get radius():number
	{
		return this._radius;
	}
	
	public get position():Vector2D
	{
		return new Vector2D(this.node.x, this.node.y);
    }
}

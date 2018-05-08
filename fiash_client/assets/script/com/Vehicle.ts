import { Vector2D } from "./Vector2D";

/**
 * Base class for moving characters.
 */
export class Vehicle extends cc.Component
{
	protected _edgeBehavior:String = Vehicle.WRAP;
	protected _mass:number = 1.0;
	protected _maxSpeed:number = 10;
	protected _position:Vector2D;
    protected _velocity:Vector2D;
    
    private stage:any;
	
	// potential edge behaviors
	public static WRAP:String = "wrap";
	public static BOUNCE:String = "bounce";
	
	/**
	 * Constructor.
	 */
	public constructor()
	{
        super();
		this._position = new Vector2D();
		this._velocity = new Vector2D();
		this.stage ={stageWidth:300,stageHeight:60}
		// draw();
	}
	
	/**
	 * Default graphics for vehicle. Can be overridden in subclasses.
	 */
	protected draw()
	{
		// graphics.clear();
		// graphics.lineStyle(0);
		// graphics.moveTo(10, 0);
		// graphics.lineTo(-10, 5);
		// graphics.lineTo(-10, -5);
		// graphics.lineTo(10, 0);
	}
	
	/**
	 * Handles all basic motion. Should be called on each frame / timer numbererval.
	 */
	public updatePosition()
	{
		// make sure this.velocity stays within max speed.
		this._velocity.truncate(this._maxSpeed);
		
		// add this.velocity to this.position
		this._position = this._position.add(this._velocity);
		
		// handle any edge behavior
		if(this._edgeBehavior == Vehicle.WRAP)
		{
			this.wrap();
		}
		else if(this._edgeBehavior == Vehicle.BOUNCE)
		{
			this.bounce();
		}
		
		// update this.position of sprite
		this.x = this.position.x;
		this.y = this.position.y;
		
		// rotate heading to match this.velocity
        // this.rotation = this._velocity.angle * 180 / Math.PI;
		this.node.rotation = this._velocity.angle * 180 / Math.PI*-1;
		// cc.log(this.node.rotation)
	}
	
	/**
	 * Causes character to bounce off edge if edge is hit.
	 */
	private bounce()
	{
       
		if(this.stage != null)
		{
			if(this.position.x > this.stage.stageWidth)
			{
				this.position.x = this.stage.stageWidth;
				this.velocity.x *= -1;
			}
			else if(this.position.x < -this.stage.stageWidth)
			{
				this.position.x = -this.stage.stageWidth;
				this.velocity.x *= -1;
			}
			
			if(this.position.y > this.stage.stageHeight)
			{
				this.position.y = this.stage.stageHeight;
				this.velocity.y *= -1;
			}
			else if(this.position.y < -this.stage.stageHeight)
			{
				this.position.y = -this.stage.stageHeight;
				this.velocity.y *= -1;
			}
		}
	}
	
	/**
	 * Causes character to wrap around to opposite edge if edge is hit.
	 */
	private wrap()
	{
		if(this.stage != null)
		{
			if(this.position.x > this.stage.stageWidth) this.position.x = -this.stage.stageWidth;
			if(this.position.x < -this.stage.stageWidth) this.position.x = this.stage.stageWidth;
			if(this.position.y > this.stage.stageHeight) this.position.y = -this.stage.stageHeight;
			if(this.position.y < -this.stage.stageHeight) this.position.y = this.stage.stageHeight;
		}
	}
	
	/**
	 * Sets / gets what will happen if character hits edge.
	 */
	public set edgeBehavior(value:String)
	{
		this._edgeBehavior = value;
	}
	public get edgeBehavior():String
	{
		return this._edgeBehavior;
	}
	
	/**
	 * Sets / gets mass of character.
	 */
	public set mass(value:number)
	{
		this._mass = value;
	}
	public get mass():number
	{
		return this._mass;
	}
	
	/**
	 * Sets / gets maximum speed of character.
	 */
	public set maxSpeed(value:number)
	{
		this._maxSpeed = value;
	}
	public get maxSpeed():number
	{
		return this._maxSpeed;
	}
	
	/**
	 * Sets / gets this.position of character as a Vector2D.
	 */
	public set position(value:Vector2D)
	{
        // this.node.setPosition(cc.v2(value.x,value.y))
		this._position = value;
		this.x = this._position.x;
		this.y = this._position.y;
	}
	public get position():Vector2D
	{
		return this._position;
	}
	
	/**
	 * Sets / gets this.velocity of character as a Vector2D.
	 */
	public set velocity(value:Vector2D)
	{
		this._velocity = value;
	}
	public get velocity():Vector2D
	{
		return this._velocity;
	}
	
	/**
	 * Sets x this.position of character. Overrides Sprite.x to set numberernal Vector2D this.position as well.
	 */
	public set x(value:number)
	{
		// super.x = value;
        this._position.x = value;
		this.node.setPositionX(value);
		// console.log("x:",value)
	}
	
	/**
	 * Sets y this.position of character. Overrides Sprite.y to set numberernal Vector2D this.position as well.
	 */
	public set y(value:number)
	{
        this._position.y = value;
		this.node.setPositionY(value);
		// console.log("y:",value)
	}
	
}

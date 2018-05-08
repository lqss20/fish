import { Vector2D } from "./Vector2D";
import { Circle } from "./Circle";
import { Vehicle } from "./Vehicle";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SteeredVehicle extends Vehicle
{
	private _maxForce:number = 1;
	private _steeringForce:Vector2D;
	private _arrivalThreshold:number = 100;
	private _wanderAngle:number = 0;
	private _wanderDistance:number = 10;
	private _wanderRadius:number = 5;
	private _wanderRange:number = 1;
	private _pathIndex:number = 0;
	private _pathThreshold:number = 20;
	private _avoidDistance:number = 300;
	private _avoidBuffer:number = 20;
	private _inSightDist:number = 200;
	private _tooCloseDist:number = 60;
	
	public constructor()
	{
        super();
		this._steeringForce = new Vector2D();
	}
	
	public set maxForce(value:number)
	{
		this._maxForce = value;
	}
	public get maxForce():number
	{
		return this._maxForce;
	}
	
	public set arriveThreshold(value:number)
	{
		this._arrivalThreshold = value;
	}
	public get arriveThreshold():number
	{
		return this._arrivalThreshold;
	}
	
	public set wanderDistance(value:number)
	{
		this._wanderDistance = value;
	}
	public get wanderDistance():number
	{
		return this._wanderDistance;
	}
	
	public set wanderRadius(value:number)
	{
		this._wanderRadius = value;
	}
	public get wanderRadius():number
	{
		return this._wanderRadius;
	}
	
	public set wanderRange(value:number)
	{
		this._wanderRange = value;
	}
	public get wanderRange():number
	{
		return this._wanderRange;
	}
	
	public set pathIndex(value:number)
	{
		this._pathIndex = value;
	}
	public get pathIndex():number
	{
		return this._pathIndex;
	}
	
	public set pathThreshold(value:number)
	{
		this._pathThreshold = value;
	}
	public get pathThreshold():number
	{
		return this._pathThreshold;
	}
	
	public set avoidDistance(value:number)
	{
		this._avoidDistance = value;
	}
	public get avoidDistance():number
	{
		return this._avoidDistance;
	}
	
	public set avoidBuffer(value:number)
	{
		this._avoidBuffer = value;
	}
	public get avoidBuffer():number
	{
		return this._avoidBuffer;
	}
	
	public set inSightDist(value:number)
	{
		this._inSightDist = value;
	}
	public get inSightDist():number
	{
		return this._inSightDist;
	}
	
	public set tooCloseDist(value:number)
	{
		this._tooCloseDist = value;
	}
	public get tooCloseDist():number
	{
		return this._tooCloseDist;
	}
	
	public updatePosition()
	{
		this._steeringForce.truncate(this._maxForce);
		this._steeringForce = this._steeringForce.divide(this._mass);
		this._velocity = this._velocity.add(this._steeringForce);
		this._steeringForce = new Vector2D();
		super.updatePosition();
	}
	
	public seek(target:Vector2D)
	{
		let desiredVelocity:Vector2D = target.subtract(this._position);
		desiredVelocity.normalize();
		desiredVelocity = desiredVelocity.multiply(this._maxSpeed);
		let force:Vector2D = desiredVelocity.subtract(this._velocity);
		this._steeringForce = this._steeringForce.add(force);
	}
	
	public flee(target:Vector2D)
	{
		let desiredVelocity:Vector2D = target.subtract(this._position);
		desiredVelocity.normalize();
		desiredVelocity = desiredVelocity.multiply(this._maxSpeed);
		let force:Vector2D = desiredVelocity.subtract(this._velocity);
		this._steeringForce = this._steeringForce.subtract(force);
	}
	
	public arrive(target:Vector2D)
	{
		let desiredVelocity:Vector2D = target.subtract(this._position);
		desiredVelocity.normalize();
		
		let dist:number = this._position.dist(target);
		if(dist > this._arrivalThreshold)
		{
			desiredVelocity = desiredVelocity.multiply(this._maxSpeed);
		}
		else
		{
			desiredVelocity = desiredVelocity.multiply(this._maxSpeed * dist / this._arrivalThreshold);
		}
		
		let force:Vector2D = desiredVelocity.subtract(this._velocity);
		this._steeringForce = this._steeringForce.add(force);
	}
	
	public pursue(target:Vehicle)
	{
		let lookAheadTime:number = this.position.dist(target.position) / this._maxSpeed;
		let predictedTarget:Vector2D = target.position.add(target.velocity.multiply(lookAheadTime));
		this.seek(predictedTarget);
	}
	
	public evade(target:Vehicle)
	{
		let lookAheadTime:number = this.position.dist(target.position) / this._maxSpeed;
		let predictedTarget:Vector2D = target.position.subtract(target.velocity.multiply(lookAheadTime));
		this.flee(predictedTarget);
	}
	
	public wander()
	{
		let center:Vector2D = this.velocity.clone().normalize().multiply(this._wanderDistance);
		let offset:Vector2D = new Vector2D(0);
		offset.length = this._wanderRadius;
		offset.angle = this._wanderAngle;
		this._wanderAngle += Math.random() * this._wanderRange - this._wanderRange * .5;
		let force:Vector2D = center.add(offset);
		this._steeringForce = this._steeringForce.add(force);
	}
	
	public avoid(circles:Circle[])
	{
	    for(let i:number = 0; i < circles.length; i++)
	    {
		let circle:Circle = circles[i] as Circle;
		let heading:Vector2D = this._velocity.clone().normalize();
		
		// vector between circle and vehicle:
		let difference:Vector2D = circle.position.subtract(this._position);
		let dotProd:number = difference.dotProd(heading);
		
		// if circle is in front of vehicle...
		if(dotProd > 0)
		{
		    // vector to represent "feeler" arm
		    let feeler:Vector2D = heading.multiply(this._avoidDistance);
		    // project difference vector onto feeler
		    let projection:Vector2D = heading.multiply(dotProd);
		    // distance from circle to feeler
		    let dist:number = projection.subtract(difference).length;
		    
		    // if feeler numberersects circle (plus buffer),
		    //and projection is less than feeler length,
		    // we will collide, so need to steer
		    if(dist < circle.radius + this._avoidBuffer &&
		       projection.length < feeler.length)
		    {
			// calculate a force +/- 90 degrees from vector to circle
			let force:Vector2D = heading.multiply(this._maxSpeed);
			force.angle += difference.sign(this._velocity) * Math.PI / 2;
			
			// scale this force by distance to circle.
			// the further away, the smaller the force
			force = force.multiply(1.0 - projection.length /
						     feeler.length);
			
			// add to steering force
			this._steeringForce = this._steeringForce.add(force);
			
			// braking force
			this._velocity = this._velocity.multiply(projection.length / feeler.length);
		    }
		}
	    }
	}
	
	public followPath(path:Vector2D[], loop:boolean = false)
	{
		let wayPonumber:Vector2D = path[this._pathIndex];
		if(wayPonumber == null) return;
		if(this._position.dist(wayPonumber) < this._pathThreshold)
		{
			if(this._pathIndex >= path.length - 1)
			{
				if(loop)
				{
					this._pathIndex = 0;
				}
			}
			else
			{
				this._pathIndex++;
			}
		}
		if(this._pathIndex >= path.length - 1 && !loop)
		{
			this.arrive(wayPonumber);
		}
		else
		{
			this.seek(wayPonumber);
		}
	}
	
	public flock(vehicles:Vehicle[])
	{
		let averageVelocity:Vector2D = this._velocity.clone();
		let averagePosition:Vector2D = new Vector2D();
		let inSightCount:number = 0;
		for(let i:number = 0; i < vehicles.length; i++)
		{
			let vehicle:Vehicle = vehicles[i] as Vehicle;
			if(vehicle != this && this.inSight(vehicle))
			{
				averageVelocity = averageVelocity.add(vehicle.velocity);
				averagePosition = averagePosition.add(vehicle.position);
				if(this.tooClose(vehicle)) this.flee(vehicle.position);
				inSightCount++;
			}
		}
		if(inSightCount > 0)
		{
			averageVelocity = averageVelocity.divide(inSightCount);
			averagePosition = averagePosition.divide(inSightCount);
			this.seek(averagePosition);
			this._steeringForce.add(averageVelocity.subtract(this._velocity));
		}
	}
	
	public inSight(vehicle:Vehicle):boolean		
	{
		if(this._position.dist(vehicle.position) > this._inSightDist) return false;
		let heading:Vector2D = this._velocity.clone().normalize();
		let difference:Vector2D = vehicle.position.subtract(this._position);
		let dotProd:number = difference.dotProd(heading);
		
		if(dotProd < 0) return false;
		return true;
	}
	
	public tooClose(vehicle:Vehicle):boolean
	{
		return this._position.dist(vehicle.position) < this._tooCloseDist;
	}
}

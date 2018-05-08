import SteeredVehicle from "../com/SteeredVehicle";


// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Fish extends cc.Component {

    @property(cc.Sprite)
    fishImg: cc.Sprite = null;

    //动画相关
    private spriteFrames:cc.SpriteFrame[];
    private currFrame:number;
    private startFrame:number;
    private endFrame:number;
    private stepNumber:number;
    private timeId:number;
    //帧频对应的毫秒
    private rates:number[];

    private steeredVehicle:SteeredVehicle

    
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // cc.game.setFrameRate(30);
        
        this.rates=[16,40]
        this.endFrame = 0;
        this.stepNumber =1;
        cc.loader.loadRes("fish/11",cc.SpriteAtlas,null,(err,altas)=>{
            if(err)
            {
                cc.error("load error:",err);
            }
            this.spriteFrames = altas.getSpriteFrames();
            this.setAction(0);
            this.fishImg.node.scale =0.4;
            this.fishImg.node.scaleX*=-1;
            this.fishImg.spriteFrame = this.spriteFrames[this.currFrame]
            this.timeId = setInterval(this.enterFarme.bind(this),this.rates[1])
        });

        this.steeredVehicle = this.node.getComponent(SteeredVehicle);
        this.steeredVehicle.maxSpeed = 1;
        // this.steeredVehicle.edgeBehavior = Vehicle.BOUNCE;
        this.steeredVehicle.wanderRadius = 1;
        this.steeredVehicle.mass = 5;
    }
    enterFarme()
    {
        if(this.endFrame > 0)
        {
            (this.currFrame>=this.endFrame)&&(this.currFrame =this.startFrame)
            this.fishImg.spriteFrame = this.spriteFrames[this.currFrame]
            // console.log("当前：",this.currFrame,this.fishImg.spriteFrame.name)
            this.currFrame +=this.stepNumber;
            // (this.currFrame>=this.totalFrame)&&(this.stepNumber =-1)||(this.currFrame<=0)&&(this.stepNumber =1)
        }
        this.updatePos();
    }
    getPath()
    {
        //角度
        // let angle = Math.random()*20;
        // //距离
        // let dl = 400*Math.cos(angle);
        let tx = (Math.random()>0.5?-1:1)*400;
        let ty = (Math.random()>0.5?-1:1)*240;

    }
    updatePos()
    {
        this.steeredVehicle.wander();
        this.steeredVehicle.updatePosition();
    }
    setAction(act:number)
    {
        //鱼的动作，1帧---正常状态，17帧---向外侧转向，33---向内侧转向，48---转向完毕
        switch(act)
        {
            case 0:
                this.startFrame = 0;
                this.endFrame = 16;
            break;
            case 1:
                this.startFrame = 16;
                this.endFrame = 31;
                break;
            case 2:
                this.startFrame = 32;
                this.endFrame = 46;
            break;
        }
        this.currFrame = this.startFrame;
    }
    // update (dt) {
       
        
    // }
}

import { Utils } from "../Utils";
import { CfgData } from "../data/CfgData";
import FishData from "../data/FishData";

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
export default class FishMovice extends FishData {

    @property(cc.Sprite)
    fishImg: cc.Sprite = null;

    
    //动画相关
    private spriteFrames:cc.SpriteFrame[];
    private currFrame:number;
    private startFrame:number;
    private endFrame:number;
    private stepNumber:number;
    private timeId:number;
    private action:number;
    //帧频对应的毫秒
    private  rates:number[];
    private currRate:number;


    // 移动范围
    private fishWidth: number = 0;
    private minX: number = 0;
    private  maxX: number = 0;
    private minY: number = 0;
    private maxY: number = 0;
    private moveX: number = 0;
    private targetPos: cc.Vec2 = new cc.Vec2();
    private speed: number = 0;
    private speedVec: cc.Vec2 = new cc.Vec2();
    private fishRoot :cc.Node;
    
    private fishScaleX:number;
    private fishCurrScaleX:number;
    //数据相关
  
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.fishRoot = this.node;
        this.speed = 1;
        this.rates=[16,40]
        this.endFrame = 0;
        this.stepNumber =1;
        this.timeId = NaN;
        this.fishCurrScaleX = 1;
    }

    // start () {
    //     // cc.game.setFrameRate(30);
       
    //     this.refreshData();
    // }
  
    protected refreshByData()
    {
        super.refreshByData();
        
        this.initFishSprite();
        this.initMoveRect();
        this.randomMove(true);
        
    }
    private initFishSprite()
    {
        
        cc.loader.loadRes("fish/"+this._cfgData.cid,cc.SpriteAtlas,null,(err,altas)=>{
            if(err)
            {
                cc.error("load error:",err);
            }
            this.spriteFrames = altas.getSpriteFrames();
            this.setAction(0);
            this.fishImg.node.scale =0.4;
            // this.fishImg.node.scaleX*=-1;
            this.fishImg.spriteFrame = this.spriteFrames[this.currFrame];
        });
    }
    /**随机帧帧 */
    private randomFrameRate(r:number = NaN)
    {
        
        if(isNaN(r))
        {
            r= Math.random();
            r = r>0.8?this.rates[0]:this.rates[1];
        }
        if(this.currRate != r)
        {
            if(!isNaN(this.timeId))
            {
                clearInterval(this.timeId);
            }
            this.currRate = r
            this.timeId = setInterval(this.enterFarme.bind(this),r);
        }
        
    }
    private enterFarme()
    {
        if(this.endFrame > 0)
        {
            if(this.currFrame>=this.endFrame)
            {
               
                if(this.action != 0) //如果不是正常动作，则说明是转向动作，需重回正常动作，并完成后续转向行为
                {
                    this.setAction(0);
                    this.fishTurn();
                }else
                {
                    this.currFrame = 0;
                }
            }
            this.fishImg.spriteFrame = this.spriteFrames[this.currFrame]
            // console.log("当前：",this.currFrame,this.fishImg.spriteFrame.name)
            this.currFrame +=this.stepNumber;
            // (this.currFrame>=this.totalFrame)&&(this.stepNumber =-1)||(this.currFrame<=0)&&(this.stepNumber =1)
        }
        this.randomMove(false);
    }
    private setAction(act:number)
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
        this.action = act;
        this.currFrame = this.startFrame;
    }
    // update (dt) { }

    private randomMove(newPos: boolean) {
        // this.node.stopAllActions();
        if (this.speed == 0) {
            return;
        }

        //是否需要新随机一个坐标
        if (newPos) {
            this.targetPos.x = this.minX + Math.random() * this.maxX;
            this.targetPos.y = Math.random() * this.maxY;
            this.calculateSpeed(this.targetPos);
            this.randomFrameRate();
        }
        //判断是否到目标点
        if (cc.pDistance(this.node.position, this.targetPos) < cc.pDistance(new cc.Vec2(0, 0), this.speedVec)) {
            this.randomMove(true);
        }
        else {
            this.node.position = this.node.position.add(this.speedVec);
            // console.log("当前坐标:",this.node.position)
        }
    }

    private calculateSpeed(tPos:cc.Vec2)
    {
        let angle = Utils.getAngle(this.node.position,tPos);
        let rad = Utils.angleToRadian(angle);
        // let rad = Utils.getRadian(this.node.position,this.targetPos);
        let speedX = Math.cos(rad) * this.speed;
        let speedY = Math.sin(rad) * this.speed;
        this.speedVec = new cc.Vec2(speedX, speedY);

        this.speedVec.x = tPos.x > this.node.x ? Math.abs(this.speedVec.x) : -Math.abs(this.speedVec.x);
        this.speedVec.y = tPos.y > this.node.y ? Math.abs(this.speedVec.y) : -Math.abs(this.speedVec.y);

        this.fishScaleX = tPos.x <= this.node.x ? 1 : -1;
        this.node.rotation = -angle;

        if(this.fishScaleX != this.fishCurrScaleX) //需要转向，先播转向动作，再进行转向
        {
            this.setAction(1);
        }            
       
    }
    /**转向 */
    private fishTurn()
    {
        this.fishRoot.scaleX = this.fishScaleX * Math.abs(this.fishRoot.scaleX);
        this.fishCurrScaleX = this.fishScaleX;
    }
    private initMoveRect() {
        //移动范围计算
        
        this.fishWidth = this.fishRoot.getContentSize().width;
        let x = 400-this.fishWidth/2;
        this.minX = -x;
        this.minY = -100;
        let containerSize = cc.size(400,200);
        this.maxX = x;
        this.maxY = 200;

        this.node.x = this.minX + Math.random() * (this.maxX - this.minX);
        this.node.y = Math.random() * this.maxY;
    }

    eatFood(tpos:cc.Vec2)
    {
        this.targetPos = this.node.convertToNodeSpace(tpos);
        this.calculateSpeed(tpos);
        this.randomFrameRate(16);
    }

    lateUpdate()
    {
        if(this.isHungry())
        {

        }
        if(this.dropGold())
        {

        }
    }
}

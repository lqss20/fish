import ComponentData from "../data/ComponentData";
import { CfgData } from "../data/CfgData";

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
export default class Deco extends ComponentData {

    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () { }

    // update (dt) {}
    protected setCfgData()
    {
        this._cfgData = CfgData.getDecoCfg(this._data.mid);
    }
    protected refreshByData()
    {
        super.refreshByData();
       
        let spr = this.node.getComponent(cc.Sprite);
        spr.spriteFrame = new cc.SpriteFrame("deco/"+this._data.mid);
        this.node.x = this._data.x;
        this.node.y = this._data.y;
     
    }
}

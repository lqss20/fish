import SteeredVehicle from "../com/SteeredVehicle";
import { Vector2D } from "../com/Vector2D";
import { GD } from "../data/GameData";
import FishMovice from "./FishMovice";
import Deco from "./Deco";
import GameConst from "../data/GameConst";
import ComponentData from "../data/ComponentData";
import TankData from "../data/TankData";


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
export default class NewClass extends TankData {

    //鱼池相关
    @property(cc.Node)
    tankNode: cc.Node = null;
    @property(cc.Node)
    decoNode: cc.Node = null;
    @property(cc.Node)
    fishNode: cc.Node = null;
    @property(cc.Node)
    touchNode: cc.Node = null;
    

    /**鱼 */
    fishs:any;
    decos:any;

    /** */

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
      this.setData(GD.getTandData(GD.tankIndex+""));
    }
    protected refreshByData()
    {
        super.refreshByData();
        let td = this._data
        let ds = td.decos;
        for(let key in ds)
        {
            let spr = new cc.Sprite();
            // let deco = spr.addComponent("Deco");
            // deco.setData(ds[key]);
        }
        ds = td.fishs;
        for(let key in ds)
        {
            this.loadFish(ds[key]);
        }
        this.touchNode.on(cc.Node.EventType.TOUCH_END,this.onClickTank,this);
    }
    private onClickTank(e:cc.Event.EventTouch)
    {

        // if(GD.gameState == GameConst.GAME_STATE_FEED)
        // {
            e.stopPropagation();
            console.log("点击了:",e.getDelta(),e.getLocation());
            
           
        // }
        
        
    }

    loadFish(data:any)
    {
        let self = this;
        
        //-------动态加载prefab资源
        cc.loader.loadRes("prefab/FishSprite", function (err, prefab) {
                
            //加入下面這兩行進行判斷
                if( err ) { cc.log( '加載失敗, ' + err ); return; }
                if( !( prefab instanceof cc.Prefab ) ) { cc.log( '加載資源成功, 但該對象不是Prefab' ); return; }

                    let fishSprite = cc.instantiate(prefab);
                    self.fishNode.addChild(fishSprite);
                    fishSprite.setPosition(cc.v2(0,0));
                    fishSprite.on(cc.Node.EventType.TOUCH_START,self.onClickFish,this);
                    let selfCom:SteeredVehicle;
                    selfCom = fishSprite.getComponent(SteeredVehicle);
                    if(selfCom)
                    {
                        selfCom.position = new Vector2D(0,0);
                        cc.log(fishSprite.getPosition());
                    }
                    let fmovice = fishSprite.getComponent(FishMovice);
                    fmovice.setData(data);
                    
        });
    }

    private onClickFish(e:cc.Event)
    {
        console.log("点击了鱼");
        
    }
}

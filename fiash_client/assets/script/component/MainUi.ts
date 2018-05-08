import { GD } from "../data/GameData";
import GameConst from "../data/GameConst";


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
export default class NewClass extends cc.Component {

    //ui相关
    @property(cc.Node)
    touUI: cc.Node = null;
    @property(cc.Sprite)
    headImg:cc.Sprite = null;
    @property(cc.Label)
    nameLabel:cc.Label = null;
    @property(cc.Label)
    goldLabel:cc.Label = null;
    @property(cc.Label)
    moneyLabel:cc.Label = null;

    @property(cc.Node)
    rightUI: cc.Node = null;
    @property(cc.Node)
    btnFood:cc.Node = null;
    @property(cc.Node)
    btnShop:cc.Node = null;
    @property(cc.Node)
    btnFriend:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        //初始化touUI
        let pd = GD.playerData;
        

        //初始化lefUI;
        this.nameLabel.string = pd.name;
        this.goldLabel.string = pd.gold;
        this.moneyLabel.string = pd.pearl;

        //右侧菜单加事件
        this.btnFood.on(cc.Node.EventType.TOUCH_START,this.onClickFood,this);
        this.btnShop.on(cc.Node.EventType.TOUCH_START,this.onClickShop,this);
        this.btnFriend.on(cc.Node.EventType.TOUCH_START,this.onClickFriend,this);
    }
    onClickFood(e)
    {
        console.log("onClickFood");
        GD.gameState = GameConst.GAME_STATE_FEED;
    }
    onClickShop(e)
    {
        console.log("onClickShop");
    }
    onClickFriend(e)
    {
        console.log("onClickFriend");
    }
    // update (dt) {}
}

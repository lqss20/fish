import { GD } from "../data/GameData";
import { CfgData } from "../data/CfgData";
import { NetHelp } from "../help/NetHelp";


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
export default class Loading extends cc.Component {

    @property(cc.Node)
    progress: cc.Node = null;
    @property(cc.Sprite)
    bar: cc.Sprite = null;
    @property(cc.Sprite)
    enter_btn:cc.Sprite = null;
    

    progressNum:number;
    loaded:boolean;
    dataInited:boolean;
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
       cc.game.setFrameRate(24); 

        this.loadConifg();
        this.initGame();

        this.enter_btn.node.on(cc.Node.EventType.TOUCH_END,this.EnterGame,this);
        this.progress.active = true;
        this.bar.node.scaleX = this.progressNum = 0;
    }
    EnterGame(e:any)
    {
        if(this.loaded && this.dataInited)
        {
            cc.director.loadScene("game");
        }
        
    }
    loadConifg() {
        let resArr = [
            cc.url.raw('resources/cfg/fish.json'),
            cc.url.raw('resources/cfg/deco.json'),
        ]
        cc.loader.load(resArr, (count,total,item)=>{
            this.progressNum = count/total;
            console.log("load cfg:"+this.progressNum);
        },(err, assets) => {
            if (err) {
                console.log("load config failed", err);
                return;
            }
            console.log("load config success");

            CfgData.fishCfg = assets.getContent(resArr[0]);
            CfgData.decoCfg = assets.getContent(resArr[1]);
            // let arr = CfgData.decoCfg.decos;
            // let len = arr.length;
            // let obj = {};
            // for(let i=0;i<len;i++)
            // {
            //     obj[arr[i].mid]=arr[i];
            // }
            // console.log(JSON.stringify(obj));
            this.loaded = true;
            // this.EnterGame(null);
        });
    }
    initGame()
    {
        NetHelp.login("",(data:any)=>{
            GD.playerData= data.player;
            GD.tankDatas = data.tank;
            console.log("login end"+JSON.stringify(data));
            this.dataInited = true;
            // this.EnterGame(null);
        },this);
       
    }
    update (dt) {
        if(this.progressNum >=1)
        {
            this.enter_btn.node.active = true;
            this.progress.active = false;
        }else
        {
            this.progressNum += 0.1
            this.bar.node.scaleX = this.progressNum;
        }
        
    
    }
}

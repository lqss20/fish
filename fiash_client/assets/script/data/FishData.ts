import ComponentData from "./ComponentData";
import { CfgData } from "./CfgData";

export default class FishData extends ComponentData
{
    /** 数据
     * cfgData----
     * "mid":1
    *"cid":1
    *"turnfix":-10
    *"size":0.8
    *"csize":[1,1]
    *"floor":0  底部　地面，地板
    *"limited":""   限制
    *"spark":0  火花，发光
    *"allCup":0 全杯赛(成就)
    *"species":1 种类，物种
    *"aqu_type":0
    *"gold":250 金币
    *"dmd":0    钻石
    *"heart":0  心
    *"gsec":408000  
    *"adultime":4   成年期
    *"level":1  等级
    *"star":0   星
    *"hsize":1
    *"notmate":0    不结伴的
    *"dsec":0
    *"sell":true    卖
     * cfgData----
     * 
    */

    protected setCfgData()
    {
        this._cfgData = CfgData.getFishCfg(this._data.mid);
    }
    protected refreshByData()
    {
        super.refreshByData();
    }
   
}
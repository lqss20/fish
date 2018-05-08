class ConfigData
{
    private static _inst:ConfigData;
    public static getInst():ConfigData
    {
        return ConfigData._inst||(ConfigData._inst = new ConfigData())
    }
    
    fishCfg:any;
    decoCfg:any;
    /**
     * 
     * @param id 
     * 
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
     */
    getFishCfg(id:string)
    {
        return this.fishCfg[id];
    }
    /**
     * 
     * @param id 
     * 
     * mid      
    *photo  相框
    *bg     背景
    *dmd    钻石
    *gold   金币
    *maxscale   
    *minscale
    *props  道具，支持
    *istime 
    *time
    *aq 
    *floor  地板
    *limit  限制
    *lying  横卧的
    *curtain    窗帘
    *masked
    *off
    *position
    *spray  喷射
    *sticky 粘性的
    *target
    *aqu_type
     */
    getDecoCfg(id:string)
    {
        return this.decoCfg[id];
    }
}
export var CfgData = ConfigData.getInst();
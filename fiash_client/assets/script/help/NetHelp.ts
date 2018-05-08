class NetWorkHelp
{
    private static _inst:NetWorkHelp;
    public static getInst():NetWorkHelp
    {
        return NetWorkHelp._inst||(NetWorkHelp._inst = new NetWorkHelp())
    }

    login(id:string,cb:Function,thisObj:any)
    {
        let data = {id:1,name:"张三",level:"1",head:"",gold:1000,money:0};
        let tdata = {
                        "0":{decos:{"30":{mid:30,x:0,y:0}},fishs:{"1":{mid:11}},gold:10000,maxFishNum:12},
                    };
        cb.call(thisObj,{player:data,tank:tdata})
    }
}

export var NetHelp = NetWorkHelp.getInst();
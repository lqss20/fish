import ComponentData from "./ComponentData";

export default class TankData extends ComponentData
{
    public decos:any;
    public fishs:any;

    protected refreshByData()
    {
        this.decos = this._data.decos;
        this.fishs = this._data.fishs;
    }
    
    public addFish(data:any)
    {

    }
    public addDeco(data:any)
    {

    }
    /**
     * gold   可收金币
     * exp  可收经验
     * idx  索引
     * decos    装饰
     * fishs    鱼
     */
    public get data():any
    {
        return this._data;
    }
}
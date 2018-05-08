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
}
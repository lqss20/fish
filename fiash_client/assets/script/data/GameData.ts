import TankData from "./TankData";

export class GameData
{
    private static _inst:GameData;
    public static getInst():GameData
    {
        return GameData._inst||(GameData._inst = new GameData())
    }
    private constructor()
    {
        this.tankIndex = 0;
    }
    /**水箱数据 */
    public tankDatas:any;
    /**玩家数据 */
    public playerData:any;
    /**游戏状态 */
    public gameState:number;
    /**当前水箱索引 */
    public tankIndex:number;

    public cfg:any;
   
    public getTandData(tid:string):any
    {
        return this.tankDatas[tid];
    }

    public refreshData(dt:number)
    {

    }
}
export var GD = GameData.getInst();
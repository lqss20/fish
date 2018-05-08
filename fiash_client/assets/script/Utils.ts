export class Utils {
    static loadUrlImage(url: string, sprite: cc.Sprite, callback?: Function) {
        console.log("utils.loadUrlImage", url)
        if (!url) {
            return;
        }
        // return;
        cc.loader.load(url, function (err, tex) {
            if (err || !(tex instanceof cc.Texture2D)) {
                console.log('loadUrlImage failed: ', "[" + err + "]");
            } else {
                console.log('loadUrlImage success: ', url, tex);
                sprite.spriteFrame = new cc.SpriteFrame(tex, new cc.Rect(0, 0, tex.pixelWidth, tex.pixelHeight));
            }
            if (callback) {
                callback(err, tex);
            }
        });
    }
    //min ≤ r ≤ max
    static Random(min: number, max: number) {
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        console.log("Random value =", random);
        return random;
    }

    static getRadian(start: cc.Vec2, end: cc.Vec2): number {
        let diff_x = end.x - start.x;
        let diff_y = end.y - start.y;

        if (diff_x == 0) {
            return diff_y == 0 ? 0 : (diff_y > 0 ? 90 : 270);
        }

        return Math.atan((diff_y)/(diff_x))

        //返回角度,不是弧度
        //return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
    }

    static getAngle(start: cc.Vec2, end: cc.Vec2){
        let diff_x = end.x - start.x;
        let diff_y = end.y - start.y;

        if (diff_x == 0) {
            return diff_y == 0 ? 0 : (diff_y > 0 ? 90 : 270);
        }

        // return Math.atan((diff_y)/(diff_x))

        //返回角度,不是弧度
        return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
    }

    static angleToRadian(angle): number {
        return (angle * Math.PI) / 180;
    }
    static radianToAngle(radian): number {
        return (180 * radian) / Math.PI;
    }
}
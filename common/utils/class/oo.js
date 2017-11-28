/**
 * Created by zhiyong on 2017/2/26.
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.r = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
}

var p = new Point(1, 1);

p.r();
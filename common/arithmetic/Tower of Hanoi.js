/**
 * Created by zhiyong on 08/08/2017.
 */
/**
 *
 * @param disc 盘子的数目
 * @param origin 源座
 * @param assist 辅助座
 * @param destination 目的座
 */
let hanoi = function (disc, origin, assist, destination) {
  if (disc > 0) {
    hanoi(disc - 1, origin, destination, assist);
    console.log(` \n Move disc ${disc} form ${origin} to ${destination} \n <br> `);
    hanoi(disc - 1, assist, origin, destination);
  }
}

hanoi(3, 'origin', 'assist', 'destination');
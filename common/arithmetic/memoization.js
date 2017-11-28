/**
 * Created by zhiyong on 18/08/2017.
 */
const memoizer = function (memo, formula) {
  let recur = function (n) {
    let result = memo[n];
    if (typeof result !== 'number') {
      result = formula(recur, n);
      memo[n] = result;
    }
    return result;
  };
  return recur;
};

/**
 * 斐波那契数列
 */
const fibonacci = memoizer([0, 1], function (recur, n) {
  return recur(n - 1) + recur(n - 2);
});

/**
 * 阶乘
 */
const factorial = memoizer([1, 1], function (recur, n) {
  return n * recur(n - 1);
})

export default {
  memoizer,
  fibonacci,
  factorial,
}
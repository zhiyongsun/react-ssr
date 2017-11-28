/**
 * Created by zhiyong on 18/08/2017.
 */

/**
 * 没有进行优化的版本
 * @param n
 * @returns {*}
 */
const fibonacciWorse = function (n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

/**
 * 把结果进行存储
 */
const fibonacci = function () {
  let memo = [0, 1],
    fib = function (n) {
      let result = memo
      if (typeof result !== 'number') {
        result = fib(n - 1) + fib(n - 2);
        memo[n] = result;
      }
      return result;
    }
  return fib;
}

export default {
  fibonacciWorse,
  fibonacci,
}
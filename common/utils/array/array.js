/**
 * Created by zhiyong on 5/8/17.
 */
function toArray(...rest) {
  return [...rest]
}

function toArray2(...rest) {
  return Array.from(rest)
}

/**
 * 合并数组
 * @param arr1
 * @param arr2
 * @returns {Number}
 */
function connect(arr1 = [], arr2 = []) {
  return arr1.push(...arr2)
}

/**
 * 数组去重:利用Set数据结构不能包含重复的值,Array.from可以把Set结构转换成数组
 * @param array
 * @returns {Array}
 */
function dedupe(array) {
  return Array.from(new Set(array))
}

/**
 * 使用扩展运算符去重
 * @param array
 * @returns {[*]}
 */
function dedupe2(array) {
  return [...new Set(array)]
}

/**
 * 数组的并集
 * @param a
 * @param b
 * @returns {Set}
 */
function union(a, b) {
  return new Set([...a, ...b])
}

/**
 * 数组的并集
 * @param a
 * @param b
 * @returns {Set}
 */
function intersect(a, b) {
  return new Set([...a].filter(x => b.has(x)));
}

/**
 * 数组的差集
 * @param a
 * @param b
 * @returns {Set}
 */
function difference(a, b) {
  return new Set([...a].filter(x => !b.has(x)));
}

/**
 * 将纯数字的嵌套函数扁平化,var arr = [1, [[2, 3], 4],[5, 6]]
 * @param a
 */
function* flat(a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item
    }
  }
}
export {
  toArray,
  toArray2,
  connect,
  dedupe,
  dedupe2,
  union,
  intersect,
  difference,
  flat
}
export default {
  toArray,
  toArray2,
  connect,
  dedupe,
  dedupe2,
  union,
  intersect,
  difference,
  flat
}

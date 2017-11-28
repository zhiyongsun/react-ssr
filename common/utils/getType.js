/**
 * Created by zhiyong on 9/5/17.
 */

/**
 *
 * @param data
 * @param str is what type you want to check. It can ben one of 'Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error','Window','Undefined','Array','Null','Data'
 * @returns {boolean}
 */

function getType(data, str) {
  if (typeof str !== 'String') {
    throw new Error('str must be a string');
  }
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase() === str.toLowerCase();
}

export default {
  getType,
};


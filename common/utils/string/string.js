/**
 * Created by zhiyong on 5/8/17.
 */
/**
 * 避免由于JavaScript将32位Unicode字符识别为2个字符('x\uD83D\uDE80y'.length==4,然而,[...'x\uD83D\uDE80y'].length==3),
 * @param rest
 * @returns {Number}
 */
const getLength = (...rest) => [...rest].length;

export {
    getLength
}

export default {
    getLength
}
/**
 * Created by zhiyong on 1/19/17.
 */
/**
 * 判断是否支持touch,可用于判断是否是移动端
 * @returns {boolean|*}
 */
export function isSupportTouch() {
    return 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0;
}
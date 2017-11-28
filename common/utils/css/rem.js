/**
 * Created by zhiyong on 10/18/17.
 */
import {BASE_FONT_SIZE} from '../../configs/configs';

// 缓存原有class及上一次的宽度
var prevWidth = 0;

function addRem(width = 750) {
  var calculate_size = function() {
    var clientWidth = window.innerWidth;

    // 排除键盘弹起引起的窗口变化
    if (prevWidth === clientWidth || !clientWidth) return;

    var docEl = document.documentElement;
    docEl.style.fontSize = BASE_FONT_SIZE * (clientWidth / width) + 'px';
    prevWidth = clientWidth;
  };

  if (document.addEventListener) {
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(resizeEvt, calculate_size);
    document.addEventListener('DOMContentLoaded', calculate_size);
    calculate_size();
  }
}

export default addRem;

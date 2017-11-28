/**
 * Created by zhiyong on 9/15/17.
 */
export const decimalFormat = function(number = 0, len = 0, settings = {}) {
  let reg;
  reg = new RegExp("(\\d*)(?:(\\.\\d{0," + len + "})\\d*)?");
  number = number.toString().replace(reg, '$1$2');

  number = parseFloat(number);

  number = number.toFixed(len);
  let integer = parseInt(number).toString(), //整数
    formatInteger = integer.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,'),
    decimal = number.replace(/^(\d+)/, '');//小数

  if (settings.integer) {
    return {
      default: formatInteger + decimal,
      integer: integer,
      formatInteger: formatInteger,
      decimal: decimal
    }
  }
  return formatInteger + decimal
};

export default {
  decimalFormat
}

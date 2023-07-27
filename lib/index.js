"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performDamping = performDamping;
exports.revokeDamping = revokeDamping;
/*
 * @Author: Huangjs
 * @Date: 2023-02-13 15:22:58
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-07-27 14:59:57
 * @Description: ******
 */

function damping(value, max, expo) {
  var revoke = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (value < 1 || max < 1 ||
  // 反算的时候value必须小于max
  revoke && value > max || expo <= 0 || expo > 1) {
    return value;
  }
  if (revoke) {
    return Math.pow((max - 1) * value / (max - value), 1 / expo);
  }
  return max / (1 + (max - 1) / Math.pow(value, expo));
}
// 阻尼值
function performDamping(value) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (value === 0) {
    return 0;
  }
  var _option$max = option.max,
    max = _option$max === void 0 ? 9999 : _option$max,
    _option$mode = option.mode,
    mode = _option$mode === void 0 ? 0 : _option$mode,
    _option$expo = option.expo,
    expo = _option$expo === void 0 ? 0.88 : _option$expo;
  var _value = Math.abs(value);
  if (_value < 1) {
    if (mode === 1) {
      // 倒数模式
      _value = 1 / damping(1 / _value, max, expo);
    } else {
      // 加1模式
      _value = damping(_value + 1, max, expo) - 1;
    }
  } else {
    _value = damping(_value, max, expo);
  }
  return _value * (value > 0 ? 1 : -1);
}
// 阻尼原值
function revokeDamping(value) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (value === 0) {
    return 0;
  }
  var _option$max2 = option.max,
    max = _option$max2 === void 0 ? 9999 : _option$max2,
    _option$mode2 = option.mode,
    mode = _option$mode2 === void 0 ? 0 : _option$mode2,
    _option$expo2 = option.expo,
    expo = _option$expo2 === void 0 ? 0.88 : _option$expo2;
  var _value = Math.abs(value);
  if (_value < 1) {
    if (mode === 1) {
      // 倒数模式
      _value = 1 / damping(1 / _value, max, expo, true);
    } else {
      // 加1模式
      _value = damping(_value + 1, max, expo, true) - 1;
    }
  } else {
    _value = damping(_value, max, expo, true);
  }
  return _value * (value > 0 ? 1 : -1);
}
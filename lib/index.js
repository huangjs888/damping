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
 * @LastEditTime: 2023-07-21 16:31:01
 * @Description: ******
 */

var expo = 0.88;
function damping(value, max) {
  var revoke = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (value < 1) {
    return value;
  }
  if (max < 1) {
    return 1;
  }
  if (revoke) {
    // 反算的时候value必须小于max
    if (value > max) {
      return value;
    }
    return Math.pow((max - 1) * value / (max - value), 1 / expo);
  }
  return max / (1 + (max - 1) / Math.pow(value, expo));
}

// 阻尼值
function performDamping(value, max) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (value === 0) {
    return 0;
  }
  var _value = Math.abs(value);
  if (_value < 1) {
    if (mode === 1) {
      // 倒数模式
      _value = 1 / damping(1 / _value, max);
    } else {
      // 加1模式
      _value = damping(_value + 1, max) - 1;
    }
  } else {
    _value = damping(_value, max);
  }
  return _value * (value > 0 ? 1 : -1);
}
// 阻尼原值
function revokeDamping(value, max) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (value === 0) {
    return 0;
  }
  var _value = Math.abs(value);
  if (_value < 1) {
    if (mode === 1) {
      // 倒数模式
      _value = 1 / damping(1 / _value, max, true);
    } else {
      // 加1模式
      _value = damping(_value + 1, max, true) - 1;
    }
  } else {
    _value = damping(_value, max, true);
  }
  return _value * (value > 0 ? 1 : -1);
}
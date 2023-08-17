(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Damping = {}));
})(this, (function (exports) { 'use strict';

  /*
   * @Author: Huangjs
   * @Date: 2023-02-13 15:22:58
   * @LastEditors: Huangjs
   * @LastEditTime: 2023-07-27 14:59:57
   * @Description: ******
   */

  function damping(value, max, expo, revoke) {
    if (revoke === void 0) {
      revoke = false;
    }
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
  function performDamping(value, option) {
    if (option === void 0) {
      option = {};
    }
    if (value === 0) {
      return 0;
    }
    var _option = option,
      _option$max = _option.max,
      max = _option$max === void 0 ? 9999 : _option$max,
      _option$mode = _option.mode,
      mode = _option$mode === void 0 ? 0 : _option$mode,
      _option$expo = _option.expo,
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
  function revokeDamping(value, option) {
    if (option === void 0) {
      option = {};
    }
    if (value === 0) {
      return 0;
    }
    var _option2 = option,
      _option2$max = _option2.max,
      max = _option2$max === void 0 ? 9999 : _option2$max,
      _option2$mode = _option2.mode,
      mode = _option2$mode === void 0 ? 0 : _option2$mode,
      _option2$expo = _option2.expo,
      expo = _option2$expo === void 0 ? 0.88 : _option2$expo;
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

  exports.performDamping = performDamping;
  exports.revokeDamping = revokeDamping;

}));
//# sourceMappingURL=damping.js.map

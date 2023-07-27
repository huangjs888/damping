/*
 * @Author: Huangjs
 * @Date: 2023-02-13 15:22:58
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-07-21 16:31:01
 * @Description: ******
 */

const expo = 0.88;

function damping(value: number, max: number, revoke: boolean = false) {
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
    return Math.pow(((max - 1) * value) / (max - value), 1 / expo);
  }
  return max / (1 + (max - 1) / Math.pow(value, expo));
}

// 阻尼值
export function performDamping(value: number, max: number, mode: number = 0) {
  if (value === 0) {
    return 0;
  }
  let _value = Math.abs(value);
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
export function revokeDamping(value: number, max: number, mode: number = 0) {
  if (value === 0) {
    return 0;
  }
  let _value = Math.abs(value);
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

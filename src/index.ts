/*
 * @Author: Huangjs
 * @Date: 2023-02-13 15:22:58
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-11-01 14:41:37
 * @Description: ******
 */

/*
 *
 * 阻尼算法和阻尼反算：
 * 𝑢=𝑚/(1+(𝑚−1)/𝑣^𝑒 )
 * 𝑣=(𝑢(𝑚−1)/(𝑚−𝑢))^(1/𝑒)
 * 0<𝑒≤1, 𝑚≥𝑢≥1, 𝑣≥1
 * e 是阻尼因子(指数值)，m 是阻尼最大值，u 是阻尼值，v 是原值
 *
 */

function damping(value: number, max: number, expo: number, revoke: boolean = false) {
  if (
    value < 1 ||
    max < 1 ||
    // 反算的时候value必须小于max
    (revoke && value > max) ||
    expo <= 0 ||
    expo > 1
  ) {
    return value;
  }
  if (revoke) {
    return Math.pow(((max - 1) * value) / (max - value), 1 / expo);
  }
  return max / (1 + (max - 1) / Math.pow(value, expo));
}

type DampingOption = {
  max?: number;
  mode?: number;
  expo?: number;
};

// 阻尼值，阻尼的value一般要求是大于1的，这里对于小于0的，取相反数计算，对于小于1的先+1计算，后再-1返回，或先倒数计算，再取倒数返回两种方式
export function performDamping(value: number, option: DampingOption = {}) {
  if (value === 0) {
    return 0;
  }
  const { max = 9999, mode = 0, expo = 0.88 } = option;
  let _value = Math.abs(value);
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
// 阻尼原值，阻尼的value一般要求是大于1的，这里对于小于0的，取相反数计算，对于小于1的先+1计算，后再-1返回，或先倒数计算，再取倒数返回两种方式
export function revokeDamping(value: number, option: DampingOption = {}) {
  if (value === 0) {
    return 0;
  }
  const { max = 9999, mode = 0, expo = 0.88 } = option;
  let _value = Math.abs(value);
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

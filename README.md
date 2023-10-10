<!--
 * @Author: Huangjs
 * @Date: 2021-05-10 15:55:29
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-10-10 14:30:31
 * @Description: ******
-->

## damping

拖动阻尼算法

### 安装使用

```sh

npm install @huangjs888/damping --save

```

### 使用方法

```js

import { revokeDamping, performDamping } from '@huangjs888/damping';

const a = performDamping(100, 500);
const b = revokeDamping(a, 500);

  
```

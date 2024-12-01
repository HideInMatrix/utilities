# 字符串首字母大写函数

## strCapital 函数

### 描述

`strCapital` 函数用于将给定字符串的第一个字母大写，其余部分保持不变。

### 参数

| 参数名 | 类型   | 描述                           |
| ------ | ------ | ------------------------------ |
| `str`  | string | 需要进行首字母大写处理的字符串 |

### 返回值

- `string` - 返回一个新字符串，其中首字母大写，其余部分保持不变。

### 示例

```typescript
import { strCapital } from '@micromatrix/utilities'

const input = "hello world";
const result = strCapital(input);
console.log(result); // 输出: "Hello world"
```

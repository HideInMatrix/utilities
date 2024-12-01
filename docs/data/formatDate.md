# `formatDate` 函数文档

`formatDate` 函数用于格式化给定的日期对象或日期字符串为指定的格式，帮助您方便地将日期转换为所需的字符串表现形式。

## 使用方法

```typescript
import { formatDate } from '@micromatrix/utilities';

const date = new Date();
const formattedDate = formatDate(date, "YYYY-MM-DD HH:mm:SS");
console.log(formattedDate);  // 示例输出: 2023-12-01 14:30:45
```

## 参数说明

### `formatDate(date: Date | string, format: string): string`

| 参数   | 类型            | 描述 |
|--------|-----------------|------|
| `date` | `Date` | `string`  | 需要被格式化的日期。可以传入 `Date` 对象，也可以传入一个有效的日期字符串（如 `'2023-12-01T10:00:00Z'`）。 |
| `format` | `string`       | 定义日期的输出格式。支持的格式标识符有：<br> - `YYYY`: 年份，例如 `2023`<br> - `MM`: 月份，带有前导零，例如 `01`、`12`<br> - `DD`: 日期，带有前导零，例如 `01`、`31`<br> - `HH`: 小时，24小时制，带有前导零，例如 `01`、`23`<br> - `mm`: 分钟，带有前导零，例如 `00`、`59`<br> - `SS`: 秒，带有前导零，例如 `00`、`59` |

## 返回值

- **`string`**: 格式化后的日期字符串。

## 示例

```typescript
// 示例 1：使用日期对象
const formattedDate1 = formatDate(new Date(), "YYYY-MM-DD");
console.log(formattedDate1);  // 输出类似: 2023-12-01

// 示例 2：使用日期字符串
const formattedDate2 = formatDate("2023-12-01T10:00:00Z", "YYYY/MM/DD HH:mm");
console.log(formattedDate2);  // 输出: 2023/12/01 10:00

// 示例 3：完整日期格式
const formattedDate3 = formatDate("2023-12-01", "YYYY-MM-DD HH:mm:SS");
console.log(formattedDate3);  // 输出类似: 2023-12-01 00:00:00
```

## 错误处理

如果传入的日期无效，函数会抛出一个错误：

```typescript
try {
  const formattedDate = formatDate("invalid-date", "YYYY-MM-DD");
} catch (error) {
  console.error(error.message);  // 输出: Invalid date
}
```

## 注意事项

- 月份 (`MM`) 是基于从 `0` 开始的 JavaScript `Date` 对象的 `getMonth()` 方法，因此返回时需要加 `1`。
- 请确保传入的日期是一个有效的日期对象或者可解析的日期字符串，否则会抛出 `Invalid date` 错误。


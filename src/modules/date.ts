function formatDate(date: Date | string, format: string): string {
  const parsedDate = new Date(date);

  // 检查日期是否有效
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date");
  }

  const options: { [key: string]: number | string } = {
    YYYY: parsedDate.getFullYear(),
    MM: String(parsedDate.getMonth() + 1).padStart(2, "0"), // 月份从0开始
    DD: String(parsedDate.getDate()).padStart(2, "0"),
    HH: String(parsedDate.getHours()).padStart(2, "0"),
    mm: String(parsedDate.getMinutes()).padStart(2, "0"),
    SS: String(parsedDate.getSeconds()).padStart(2, "0"),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|SS/g, (match) => {
    return String(options[match]);
  });
}

export { formatDate };

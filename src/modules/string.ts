
/**
 * 该函数将给定字符串的第一个字母大写。
 * @public
 * @param str - 参数“str”是一个字符串输入，表示需要大写的文本。
 * @returns 函数 `str_capital` 返回一个新字符串，第一个字符大写，其余字符不变。
 */
function str_capital(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 该函数将给定字符串中每个单词的首字母大写。
 * @public
 * @param str - 包含一个或多个由空格分隔的单词的字符串。
 * @returns 函数 str_capital_all 返回一个新字符串，其中输入字符串中的所有单词都大写。
 */
function str_capital_all(str: string) {
    return str.split(' ').map(str_capital)
        .join(' ')
}
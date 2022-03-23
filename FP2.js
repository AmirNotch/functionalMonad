function parse(str) {
    //быстрая реализация; надо ухитриться сделать то же самое муторно, без использования конструктора
    return new Function("", `return ${str}`)();
}
function calc(str) {
    const rgxp = /\(([^\)\(]+)\)/g;
    if (!rgxp.test(str)) {
        return parse(str);
    }
    return calc(str.replace(rgxp, (str, n) => parse(n)));
}
console.log(calc(""));
console.log(Math.sqrt(2 + 2 ))
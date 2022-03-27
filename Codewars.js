// Simple Encryption #1 - Alternating Split
// 3

function encrypt(text, n) {
    console.log(text, n);
    if (!text || n <= 0) return text;
    while (n--) {
        let ans = '';
        for (let i = 1; i < text.length; i += 2) {
            ans += text[i];
        }
        for (let i = 0; i < text.length; i += 2) {
            ans += text[i];
        }
        text = ans;
    }
    return text;
}

function decrypt(encryptedText, n) {
    if (!encryptedText || n <= 0) return encryptedText;
    const ans = new Array(encryptedText.length);
    while (n--) {
        let j = 0;
        for (let i = 1; i < ans.length; i += 2) {
            ans[i] = encryptedText[j++];
        }
        for (let i = 0; i < ans.length; i += 2) {
            ans[i] = encryptedText[j++];
        }
        encryptedText = ans.join('');
    }
    return encryptedText;
}

// Write Number in Expanded Form
// 1

function expandedForm(num) {
    let numStr = num.toString().split('');
    for(let i = 0 ; i < numStr.length; i++ ){
        for(let y = numStr.length - i; y > 1; y--){
            numStr[i] += '0';
        }
    }
    numStr = numStr.filter(value => !value.startsWith(0));
    return numStr.join(' + ')
}

console.log(expandedForm(23));

// RGB To Hex Conversion
// 2

function rgb(r, g, b) {
    const convert = function(val) {
        if(val > 255) {
            return 'FF';
        }
        if(val < 0) {
            return '00';
        }
        return (val > 15 ? val.toString(16) : '0' + val.toString(16)).toUpperCase();
    }
    return convert(r) + convert(g) + convert(b);
}

console.log(rgb(173,255,47))

// Range Extraction
// 7

function solution(list)
{
    let result = "";
    let isRange = false;

    for (let i = 0; i < list.length; ++i)
    {
        const j = list[i];

        if (list[i + 1] !== j + 1)
        {
            if (isRange) result += (list[i] === list[i - 2] + 2) ? "-" : ",";
            result += j + ",";
            isRange = false;
        }
        else if (!isRange)
        {
            result += j;
            isRange = true;
        }
        debugger;
    }
    return result.slice(0, -1);
}

// Weight for weight
// 4

function orderWeight(string) {
    let obj = {};
    if (string) {
        strng.split(" ").forEach( (str) => {
            let total = str.split('').map(Number).reduce((accumulator, currentValue) => accumulator + currentValue )
            !obj[total] ? obj[total] = [str] : obj[total].push(str)
        });
    }

    let orderedObj = {};
    Object.keys(obj).sort().forEach( (key) => {
        orderedObj[key] = obj[key];
    });

    let finalArr = [];
    Object.keys(orderedObj).forEach( (key) => {
        orderedObj[key].length > 1 ? finalArr = [...finalArr, ...orderedObj[key].sort()] : finalArr.push(orderedObj[key][0])
    });

    return finalArr.join(' ')
}
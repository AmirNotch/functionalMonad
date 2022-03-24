const exp = document.getElementById('exp');
const calcButton = document.getElementById('calc');
const calcResult = document.getElementById('result');

calcButton.addEventListener('click', calcFunc);

const actions = {
    multiplication: {
        value: '*',
        label: 'multiplication',
        func: (a,b) => (parseInt(a) * parseInt(b))
    },
    division: {
        value: '/',
        label: 'division',
        func: (a,b) => (a / b)
    },
    addition: {
        value: '+',
        label: 'addintion',
        func: (a,b) => (parseInt(a) + parseInt(b))
    },
    subtraction: {
        value: '-',
        label: 'subtraction',
        func: (a,b) => (parseInt(a) - parseInt(b))
    }
}

function calcFunc() {
    const res = parseBrackets(exp.value);
    calcResult.innerHTML = res;
}

function parseBrackets(str) {
    const out = str.match(/\((.*)\)/);
    if (out) {
        const expResult = parseBrackets(out[1]);
        str = str.replace(out[0], expResult);
        return calcExpr(str);
    } else {
        return calcExpr(str);
    }
}

function calcExpr(str) {
    let res;
    Object.keys(actions).map(function(type) {
        res = parseExpr(str, actions[type]);
        if (res) {
            str = str.replace(res.str, res.value.toString());
            str = calcExpr(str);
        }
    });
    return str;
}

function parseExpr(str, action) {
    const reg = new RegExp(`((\\d+)\\s*\\${action.value}\\s*(\\d+))`);
    const out = str.match(reg);
    if (!out) return false;

    const result = {
        str: out[1]
    };

    result.value = action.func(out[2], out[3]);
    return result;
}
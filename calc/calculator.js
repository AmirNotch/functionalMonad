function parse(str) {
    //быстрая реализация; надо ухитриться сделать то же самое муторно, без использования конструктора
    return new Function("", `return ${str}`)();
}
function calc(str) {
    const rgxp = /\(([^\)\(]+Math.sqrt)\)/g;
    if (!rgxp.test(str)) {
        return parse(str);
    }
    return calc(str.replace(rgxp, (str, n) => parse(n)));
}
console.log(calc("3 + (5 * 7) * (6 - 4)"));



$(function (){

    var calculator = $("#calculator");
    var functionButtons = "CBack*/-+=";

    var lines = [
        ["C", "Math.sqrt(", "()", "/"],
        ["7", "8", "9", "*"],
        ["4", "5", "6", "+"],
        ["1", "2", "3", "-"],
        ["0", ".", "Посчитать", "Back"]
    ];

    var input = $("<div class='input'></div>");
    calculator.append(input);

    var equal, times, plus, minus, sqrt, back, clear, slash,
    skobki;

    for (var i = 0; i < lines.length; i++){
        var line = $("<div class='line'></div>");
        for (var j = 0; j < lines[i].length; j++){
            var btn = $("<div class='button b"+lines[i]
                [j]+"'>"+lines[i][j]+"</div>");

            if (lines[i][j] == "+") plus = btn;
            else if (lines[i][j] == "-") minus = btn;
            else if (lines[i][j] == "*") times = btn;
            else if (lines[i][j] == "/") slash = btn;
            else if (lines[i][j] == "Math.sqrt(") sqrt = btn;
            else if (lines[i][j] == "Back") back = btn;
            else if (lines[i][j] == "Посчитать") equal = btn;
            else if (lines[i][j] == "C") clear = btn;
            else if (lines[i][j] == "()") skobki = btn;
            line.append(btn);
        }
        calculator.append(line)
    }

    window.onkeydown = function (event) {
        var e = event;
        switch (e.keyCode) {
            case 8:
                back.trigger("click");
                break;
            case 67:
                back.trigger("click");
                break;
            case 13:
                if (e.keyCode) sqrt.trigger("click");
                else equal.trigger("click");
                break;
            case 187:
                if (e.keyCode) plus.trigger("click");
                else equal.trigger("click");
                break;
            case 189:
                minus.trigger("click")
                break;
            case 57:
                if (e.shiftKey) skobki.trigger("click");
                else $("#calculator .button.b9").trigger("click");
                break;
            case 48:
                if (e.shiftKey) skobki.trigger("click");
                else $("#calculator .button.b0").trigger("click");
                break;
            case 56:
                if (e.shiftKey) times.trigger("click");
                else $("#calculator .button.b8").trigger("click");
                break
            case 191:
                slash.trigger("click")
                break
            case 220:
                slash.trigger("click")
                break
            default:
                $("#calculator .button.b" + (e.keyCode - 48)).trigger("click");
                break;
        }

    }

    $("#calculator .button").each(function () {
        var $t = $(this);
        $(this).click(function () {
            if (input.text() != "NaN" && input.text() !=
                "Infinity") {
                if (+$t.text() >= 0 && +$t.text() <= 9 ||
                    $t.text() == "." && input.text().slice(-1) !=
                    ".") {
                    input.text(input.text() + $t.text());
                }
            }
        })
    });

    equal.click(function () {
        if (functionButtons.indexOf(input.text().slice(-1)) <
            0 && input.text().indexOf("Infinity") < 0 &&
            input.text().indexOf("NaN") < 0)
            {
                input.text(calc(input.text()));
            }
    })

    times.click(function () {
        if (input.text().length == 0 || (input.text().length
            == 1 &&
            functionButtons.indexOf(input.text().slice(-1)) >=
            0)) return;
        if (functionButtons.indexOf(input.text().slice(-1))
        >= 0)
        {
            input.text(input.text().slice(0, input.text().length -
                1) + $(this).text());
        }   else {
            input.text(input.text() + $(this).text());
        }
    })

    slash.click(function () {
        if (input.text().length == 0 || (input.text().length
            == 1 &&
            functionButtons.indexOf(input.text().slice(-1)) >=
            0)) return;
        if (functionButtons.indexOf(input.text().slice(-1))
        >= 0)
        {
            input.text(input.text().slice(0, input.text().length -
                1) + $(this).text());
        }   else {
            input.text(input.text() + $(this).text());
        }
    })

    plus.click(function () {
        if (functionButtons.indexOf(input.text().slice(-1))
        >= 0)
        {
            input.text(input.text().slice(0, input.text().length -
                1) + $(this).text());
        }   else {
            input.text(input.text() + $(this).text());
        }
    })

    minus.click(function () {
        if (functionButtons.indexOf(input.text().slice(-1))
        >= 0)
        {
            input.text(input.text().slice(0, input.text().length -
                1) + $(this).text());
        }   else {
            input.text(input.text() + $(this).text());
        }
    })

    clear.click(function () {
        input.text("");
    })

    sqrt.click(function () {
        if (functionButtons.indexOf(input.text().slice(-1))
            >= 0)
        {
            input.text(input.text().slice(0, input.text().length +
                1) + $(this).text());
        }   else {
            input.text(input.text() + $(this).text());
        }
    })

    back.click(function () {
        input.text(input.text().slice(0, input.text().length - 1))
    })

    skobki.click(function () {
        var symbol = input.text().split("");
        var countOpening = 0;
        var countClosing = 0;
        for (var i = 0; i < symbol.length; i++) {
            if (symbol[i] == "(") countOpening++;
            else if (symbol[i] == ")") countClosing++;
        }

        if (input.text().slice(-1) != "." && input.text() != "Infinity" &&
        input.text() != "NaN") {
            if (functionButtons.indexOf(input.text().slice(-1)) >= 0) {
                input.text(input.text() + "(");
            } else if (countOpening > countClosing && input.text().slice(-1)
                != "(") {
                input.text(input.text() + ")");
            }
        }
    })
})
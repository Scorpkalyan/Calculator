var buttons = document.querySelectorAll(".calc-button")
var screen = document.querySelector(".calculator-screen")
var equals = document.querySelector(".equal-sign")
var clearScreen = document.querySelector(".all-clear")
var clearCh = document.querySelector(".back-space")
var historyList = document.getElementById("history-list")

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}
function addToHistory(expression, result) {
    let listItem = document.createElement("li");
    listItem.textContent = `${expression} = ${result}`;
    listItem.dataset.userInput = expression;
    listItem.addEventListener('click', addBackToScreen);
    historyList.appendChild(listItem);
}
function addBackToScreen(event) {
    screen.value = event.target.dataset.userInput;
}


buttons.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        let value = event.target.dataset.number;
        if (screen.value === "0" || screen.value === "00" || screen.value === "error") {

            screen.value = value;
        }
        else if (value == '.' && /(?:\.)(?!.*(?:\+|\-|\*|\/))/.test(screen.value)) {
            return
        }
        else {
            screen.value = screen.value + event.target.dataset.number;
        }
    })
})
equals.addEventListener('click', function (event) {
    try {
        let expression = screen.value;
        let userInput = screen.value;
        let result = eval(screen.value)
        screen.value = eval(screen.value
            .replaceAll('sin', 'Math.sin')
            .replaceAll('cos', 'Math.cos')
            .replaceAll('tan', 'Math.tan')
            .replaceAll('^2', '**2')
            .replaceAll('^3', '**3')
            .replaceAll('√', 'Math.sqrt')
            .replaceAll('∛', 'Math.cbrt')
            .replace(/(\d+)!/g, (match, number) => {
                return factorial(parseInt(number));
            }
            ))
        screen.value = result;
        addToHistory(expression, result);

    } catch (error) {
        screen.value = "Error";
    }
})
clearScreen.addEventListener('click', function (event) {
    screen.value = ""
})
clearCh.addEventListener('click', function (event) {
    if (screen.value.length <= 1) {
        screen.value = '0'
        return
    }
    screen.value = screen.value.slice(0, -1);
})

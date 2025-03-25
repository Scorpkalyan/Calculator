var buttons = document.querySelectorAll(".calc-button")
var screen = document.querySelector(".calculator-screen")
var equals = document.querySelector(".equal-sign")
var clearScreen = document.querySelector(".all-clear")
var clearCh = document.querySelector(".back-space")
var historyList = document.getElementById("history-list")
var delAllButton = document.getElementById("del-all-button")
var addHistoryButton = document.getElementById("add-history")

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}
function addToHistory(expression, result) {
    let listItem = document.createElement("li");
    let divElement = document.createElement("div")
    let remButton = document.createElement("button")
    let paragraph = document.createElement("p")
    // let delAllButton = document.createElement("del-All-button")
    

    delAllButton.textContent = "Del";
    delAllButton.addEventListener("click", clearHistory);


    remButton.textContent = "Remove";
    remButton.addEventListener('click',remEle);

    paragraph.dataset.userInput = expression;
    paragraph.textContent = `${expression} = ${result}`;
    paragraph.addEventListener('click', addBackToScreen);

    divElement.appendChild(paragraph);
    divElement.appendChild(remButton);
    listItem.appendChild(divElement);
    historyList.appendChild(listItem);
}

function addBackToScreen(event) {
    screen.value = event.target.dataset.userInput;
}

function remEle(event){
    event.target.parentNode.parentNode.remove();
}

function clearHistory(){
    historyList.innerHTML = '';
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
equals.addEventListener('click', function () {
    try {
        let expression = screen.value;
        let result = eval(screen.value
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
            ));
        screen.value = result;
        addToHistory(expression, result);

    } catch (error) {
        screen.value = "Error: " + error;
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

// Ensure the H+ button is properly selected and add debugging
var addHistoryButton = document.getElementById("add-history");

if (addHistoryButton) {
    console.log("H+ Button found!");  // Debugging to check if button is selected properly

    // Event listener for H+ button
    addHistoryButton.addEventListener("click", function() {
        let historyItems = document.querySelectorAll("#history-list li");  // Get all history items
        let total = 0;

        if (historyItems.length === 0) {
            console.log("No history items found.");
        }

        // Loop through each history item
        historyItems.forEach(function(item) {
            let resultText = item.querySelector("div p").textContent;  // Get the full text from the <p> tag
            console.log("Result Text:", resultText);  // Debugging to see the result text

            // Use regex to match the number after the '=' sign
            let resultMatch = resultText.match(/=\s*(-?\d+(\.\d+)?)/);  // Match numbers (positive or negative, integer or float)

            console.log("Match:", resultMatch);  // Debugging to see if regex is working

            if (resultMatch && resultMatch[1]) {
                // Add the matched result (the number after the "=")
                total += parseFloat(resultMatch[1]);
            }
        });

        // Display the total in the calculator screen
        console.log("Total Sum:", total);  // Debugging to show the total result
        screen.value = total.toString();
    });
} else {
    console.log("H+ Button not found!");  // If the button is not found, log an error
}
var inputList = []
var eventList = []
var timeRemaining = 7
var clock = document.getElementById("clock-el")
var guess = document.getElementById("guess-el")
var result = document.getElementById("result-el")
var events = document.getElementById("events-el")
document.getElementById("button1").addEventListener("click", click1)
document.getElementById("button2").addEventListener("click", click2)
document.getElementById("button3").addEventListener("click", click3)
document.getElementById("buttonSubmit").addEventListener("click", submit)
document.getElementById("buttonClear").addEventListener("click", clear)
function display() {
    clock.innerHTML = "Guesses until police arrive: " + timeRemaining
    let guessString = "Current Guess: "
    //add numbers
    for(let i = 0; i < inputList.length; i++) {
        guessString += inputList[i]
    }
    //add spaces
    let numSpaces = 3 - inputList.length

    for(let i = 0; i < numSpaces; i++) {
        guessString += " - "
    }
    //empty the events div
    while(events.firstChild) {
        events.removeChild(events.firstChild)
    }
    //add updated elements to the div
}

function click1() {
    inputList.push(" 1 ")
    display()
}

function click2() {
    inputList.push(" 2 ")
    display()
}

function click3() {
    inputList.push(" 3 ")
    display()
}
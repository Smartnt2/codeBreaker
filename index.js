var inputList = []
var eventList = []
var vaultCode = []
//even index is 1 turn slower, odd index is 1 turn faster
var randomEventPossibilities = [
    "Traffic jam. Police arrive 1 turn slower.",
    "Officers in the area. Police arrive 1 turn faster.",
    "Donut party at the station. Police arrive 1 turn slower", 
    "Clear roads. Police arrive 1 turn faster."
]
var timeRemaining = 7
var clock = document.getElementById("clock-el")
var guess = document.getElementById("guess-el")
var result = document.getElementById("result-el")
var events = document.getElementById("events-el")

startGame()

function startGame() {
    generateCode()
    display()
}

function generateCode() {
    for(let i = 0; 1 < 3; i++) {
        let int = Math.floor(Math.random() * 3) + 1
        vaultCode.push(int)
    }
}

function display() {
    clock.innerHTML = "Guesses until police arrive: " + timeRemaining
    let guessString = "Current Guess: "
    //add numbers
    for(let i = 0; i < inputList.length; i++) {
        guessString += " " + inputList[i] + " "
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
    inputList.push("1")
    display()
}

function click2() {
    inputList.push("2")
    display()
}

function click3() {
    inputList.push("3")
    display()
}

function submit() {
    let vaultCodeString = ""
    let guessCodeString = ""
    for(let i = 0; i < 3; i++) {
        vaultCodeString += vaultCode[i]
        guessCodeString += guessCodeString[i] 
    }

    let vaultCodeValue = parseInt(vaultCodeString)
    let guessCodeValue = parseInt(guessCodeString)

    if(vaultCodeValue == guessCodeValue) {
        eventList.push("You cracked the safe!")
    } else if(vaultCodeValue > guessCodeValue) {
        eventList.push("your guess is smaller than the code! (" + guessCodeString + ")")
        clear()
    } else {
        eventList.push("Your guess is larger than the code! (" + guessCodeString + ")")
        clear()
    }

    rollRandomEvent()
    display()
}

function clear() {
    inputList = []
    display()
}

function rollRandomEvent() {
    if(Math.floor(Math.random() * 100) + 1 <= 5) {
        let randInt = Math.floor(Math.random() * 4)
        eventList.push(randomEventPossibilities[randInt])
        
        if(randInt % 2 == 0) {
            timeRemaining++;
        } else {
            timeRemaining--;
        }
    }
}
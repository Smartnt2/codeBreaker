var score = 0
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
var scoreEl = document.getElementById("score-el")
var clock = document.getElementById("clock-el")
var guess = document.getElementById("guess-el")
var result = document.getElementById("result-el")
var events = document.getElementById("eventLog")

startGame()

function startGame() {
    timeRemaining = 7
    gameOver = false
    eventList = []
    generateCode()
    display()
}

function generateCode() {
    for(let i = 0; i < 3; i++) {
        let int = Math.floor(Math.random() * 3) + 1
        vaultCode.push(int)
    }
}

function display() {
    scoreEl.innerHTML = "Score: " + score
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

    guess.innerHTML = guessString

    //empty the events div
    while(events.firstChild) {
        events.removeChild(events.firstChild)
    }

    //add updated elements to the div
    for(let i = 0; i < eventList.length; i++) {
        let event = document.createElement("li")
        event.innerHTML = eventList[i]
        events.appendChild(event)
    }
}

function click1() {
    if(inputList.length < 3) {
        inputList.push("1")
        display()
    }
}

function click2() {
    if(inputList.length < 3) {
        inputList.push("2")
        display()
    }
}

function click3() {
    if(inputList.length < 3) {
        inputList.push("3")
        display()
    }
}

function submit() {
    if(inputList.length < 3) {
        eventList.push("Make sure the guess is 3 numbers long")
    } else {
        timeRemaining--;
        if(timeRemaining < 0) {
            gameOver = true
            eventList.push("You got caught! Press Clear to start a new game")
            score = 0
            clearInputs()
            return
        }
        let vaultCodeString = ""
        let guessCodeString = ""
        for(let i = 0; i < 3; i++) {
            vaultCodeString += vaultCode[i]
            guessCodeString += inputList[i] 
        }

        let vaultCodeValue = parseInt(vaultCodeString)
        let guessCodeValue = parseInt(guessCodeString)

        if(vaultCodeValue == guessCodeValue) {
            gameOver = true;
            eventList.push("You cracked the safe! Press Clear to start a new game!")
            score += 7 - timeRemaining 
        } else if(vaultCodeValue > guessCodeValue) {
            eventList.push("your guess is smaller than the code! (" + guessCodeString + ")")
            clearInputs()
        } else {
            eventList.push("Your guess is larger than the code! (" + guessCodeString + ")")
            clearInputs()
        }

        rollRandomEvent()
    }
    display()
}

function clearInputs() {
    if(gameOver) {
        startGame()
    }
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

/* import { WORDS } from "./words.js"; */

const tone = ['C2','C#2','D2','D#2','E2','F2','F2#','G2','G#2','A2','A#2','B2',
'C3','C#3','D3','D#3','E3','F3','F3#','G3','G#3','A3','A#3','B3'];

const NUMBER_OF_GUESSES = 3;
const NUMBER_OF_TONE = 4

let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextCode = 0;
let rightGuessString= [1,3,7,9]

function initBoard() {
console.log(typeof window )
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"

        for (let j = 0; j < NUMBER_OF_TONE; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
         }

        board.appendChild(row)
    }
}

initBoard()
const test1 = tone[1]
const test2 = tone[2]
const test3 = tone[3]
const test4 = tone[4]

insertCode(test1,1)
insertCode(test2,2)
insertCode(test3,3)
insertCode(test4,4)

function insertCode (code,num) {
    if (nextCode === NUMBER_OF_TONE) {
        return
    }
    let row = document.getElementsByClassName("letter-row")[3 - guessesRemaining]
    let box = row.children[nextCode]
    box.textContent = code
    box.classList.add("filled-box")
    currentGuess.push(Number(num))
    nextCode += 1
}

function deleteCode () {
    let row = document.getElementsByClassName("letter-row")[3 - guessesRemaining]
    let box = row.children[nextCode - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextCode-= 1
}

/* Not key listner but getting the piano code */
document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) {
        return
    }
    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextCode !== 0) {
        deleteCode()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[0-9]/gi)
    if (!found || found.length > 1) {
        return
    }
    else {
        insertCode(tone[pressedKey],pressedKey)
    }
})

function shadeKeyBoard(letter, color) {
  console.log("called - shake keyboard ")
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            }
            if (oldColor === 'yellow' && color !== 'green') {
                return
            }
            elem.style.backgroundColor = color
            break
        }
    }
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[3 - guessesRemaining]
    let guessString = []
    for(const val of currentGuess) {
        guessString += val
    }
    if (guessString.length != NUMBER_OF_TONE ) {
        alert("Not enough letters!")
        return
    }
    for (let i = 0; i < 4; i++) {
        let bgColor = ''
        let box = row.children[i]
        let current_code = currentGuess[i]
        if(rightGuessString.includes(current_code)=== true){
          if(rightGuessString[i] === current_code ) {
          bgColor = 'green'
          }
          else {
          bgColor = 'yellow'
          }
        }
        else {
          bgColor = 'grey'
        }

        let delay = 250 * i
        setTimeout(()=> {            //shade box
            box.style.backgroundColor = bgColor
            shadeKeyBoard(box,bgColor)
        }, delay)
   }

   if (currentGuess.toString() === rightGuessString.toString()) {
        alert("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextCode = 0;
    }
    if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${rightGuessString}"`)
        }
}


/* import { WORDS } from "./words.js"; */

const tone = ['C2','C#2','D2','D#2','E2','F2','F2#','G2','G#2','A2','A#2','B2',
'C3','C#3','D3','D#3','E3','F3','F3#','G3','G#3','A3','A#3','B3'];

const NUMBER_OF_GUESSES = 3;
const NUMBER_OF_TONE = 4

let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextChord = 0;
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

insertChord(test1,1)
insertChord(test2,2)
insertChord(test3,3)
insertChord(test4,4)

function insertChord (chord,num) {
    if (nextChord === NUMBER_OF_TONE) {
        return
    }
    let row = document.getElementsByClassName("letter-row")[3 - guessesRemaining]
    let box = row.children[nextChord]
    box.textContent = chord
    box.classList.add("filled-box")
    currentGuess.push(Number(num))
    console.log(currentGuess+"currentGuess")
    nextChord += 1
}

function deleteChord () {
    console.log("colled-delete")
    let row = document.getElementsByClassName("letter-row")[3 - guessesRemaining]
    let box = row.children[nextChord - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    console.log(currentGuess+"currentGuess")
    nextChord-= 1
}

/* Not key listner but getting the piano chord */
document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) {
        return
    }
    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextChord !== 0) {
        deleteChord()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[0-9]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertChord(tone[pressedKey],pressedKey)
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
        toastr.warning("Not enough letters!")
        return
    }
    for (let i = 0; i < 4; i++) {
        let bgColor = ''
        let box = row.children[i]
        let current_chord = currentGuess[i]
        if(rightGuessString.includes(current_chord)=== true){
          if(rightGuessString[i] === current_chord ) {
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
        toastr.success("you guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextChord = 0;
    }
    if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!")
            toastr.info(`The right word was: "${rightGuessString}"`)
        }
}

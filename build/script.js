/* test git hub change */

/* saki ni yonmozi de seikai wo */
/* 12 mozi charactor de 3 letter ireru houga yoikamo */
/* maching check ga 2 mozi zutsu ninaru to shinu */
/* CSS no BOX nado mo shinu kamo */
/* hitomozi irerunomo taihenkamo */
const test = 1;

import { WORDS } from "./words.js";

/* 6->5 */
/* Nokori 4-1 kai aterareru */
const NUMBER_OF_GUESSES = 3;
const NUMBER_OF_INPUT = 12;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;

/* seikai - not words, but 8 charactor - C1 C3 C5 C7*/
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)

function initBoard() {
console.log(typeof window )
    let board = document.getElementById("game-board");

/* gyou  */
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"

/* letter */
        for (let j = 0; j < 4 /* NUMBER_OF_INPUT*/ ; j++) {
            let box = document.createElement("div")
            let box2 = document.createElement("div")
            let box3 = document.createElement("div")
            let box_dummy = document.createElement("div")
            box.className = "letter-box"
            box2.className = "letter-box2"
            box3.className = "letter-box3"
            row.appendChild(box)
            row.appendChild(box2)
            row.appendChild(box3)
        }

        board.appendChild(row)
    }
}
initBoard()
/* kokomade OK */

/* proto input the code */
insertLetter("A")
insertLetter("#")
insertLetter("3")

/* Not key listner but getting the piano code */
document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }
    let found = pressedKey.match(/[a-z3-4#\s]/gi)
    /* let found = pressedKey.match(/[a-z]/gi)*/
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

/* 5->4 */
function insertLetter (pressedKey) {
    if (nextLetter === NUMBER_OF_INPUT) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

  /* 6->5 */
    let row = document.getElementsByClassName("letter-row")[3 - guessesRemaining]
    let box = row.children[nextLetter]

    console.log(box + 'box')
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[3 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

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
    /* pianotle right guess is every 3 notes */
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)
    let rightnote = []
    /* add i.e. C#3 */
    for (let i = 0; i < 4 /* temp */; i++) {
      rightnote[i] = rightGuess[i*3]+rightGuess[i*3+1]+rightGuess[i*3+2]
    }
    console.log(rightnote[0]+rightnote[1]+rightnote[2]+" rightNote")
    console.log(rightGuess+" rightguess")
    console.log(currentGuess+" currentGuess")

    for (const val of currentGuess) {
        guessString += val
    }
    console.log(guessString+" :val")

    if (guessString.length != NUMBER_OF_INPUT) {
        alert("Not enough letters!")
        return
    }

/* remove this list but Animetaion doesn't work
    if (!WORDS.includes(guessString)) {
        alert("Word not in list!")
        return
    } */

    /* check every 3 string */
    for (let i = 0; i < 4 /* temp */; i++) {
        let letterColor = ''
        let box = row.children[i*3]
        let box2 = row.children[i*3+1]
        let box3 = row.children[i*3+2]
        let letter = currentGuess[i*3]
        let letter2 = currentGuess[i*3+1]
        let letter3 = currentGuess[i*3+2]

        let letterPosition = rightGuess.indexOf(currentGuess[i*3])
        let letterPosition2 = rightGuess.indexOf(currentGuess[i*3+1])
        let letterPosition3 = rightGuess.indexOf(currentGuess[i*3+2])

        if((letterPosition === -1)||(letterPosition2 === -1)||(letterPosition3 === -1)){
        // is letter in the correct guess
/*        if (letterPosition === -1) {*/
          letterColor = 'grey'
          } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position
              /* if (currentGuess[i] === rightGuess[i]) {*/
              if ((currentGuess[i*3] === rightGuess[i*3])&&
              (currentGuess[i*3+1] === rightGuess[i*3+1])&&
              (currentGuess[i*3+2] === rightGuess[i*3+2]))
              {
                // shade green
                letterColor = 'green'

            } else {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
          }

        let delay = 250 * i * 3
        setTimeout(()=> {            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)

        let delay2 = 250 * i *3 + 1
        setTimeout(()=> {            //shade box
            box2.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay2)

        let delay3 = 250 * i * 3 + 2
        setTimeout(()=> {            //shade box
            box3.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay3)




    } /* every 3 check is done */

    if (guessString === rightGuessString) {
        alert("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${rightGuessString}"`)
        }
    }
}

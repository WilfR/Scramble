/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**
 * help()
 * Displays the game instructions.
 * @Return: String
 */

function help () {
  return `Welcome to Scramble.
The game where you unscramble letters to make words.

Once you start the game, you will be given a scrambled word.
If you correctly guess the word, you will receive a point.
If you guess incorrectly you will receive a strike.
You can also pass on a word.

To start a new game use start().
To make guess use guess('word').
To skip a word use pass().
To show these instructions again use help().`
}

// Displays the instructions when the page loads.
console.log(help())

/**********************************************
 * YOUR CODE BELOW
 **********************************************/
/* Pseudo code

/* Array of String (words)
Must Contain at least 10 items
*/

const words = ['DOG', 'GOOSE', 'DONKEY', 'CHEETAH', 'COUGAR', 'KANGAROO', 'FLAMINGO']

/*
* Game object used to hold game status
  * - active: boolean
  * - words: array(shuffled)
  * - word: string
  * - scrambled:  string
  * - strikes: numbers
  * - points: numbers
  * - maxStrikes: numbers
  * - passes: numbers
  * - maxPasses: numbers
*/

const game = {
  words: [],
  word: '',
  scrambled: '',
  active: false,
  strikes: 0,
  passes: 0,
  points: 0,
  maxStrikes: 3,
  maxPasses: 1
}

/*
 * The start() function
*   check if game.active is false (needs to be false to create a new game)
*     set strikes to 0
*     set points to 0
*     set passes to 0
*     set game.active to true
*     Use Shuffle function to Create a copy of the words array and store in game.words
*     Get the first word off of the games.words array and store in game.word (****USE SHIFT to remove item off of the array***)
*     Use shuffle function to scramble the game.word and store in game.scrambled
*     Respond to player: the scrambled word
*   else
      Respond to player: game already started
*/


function start () {
  if ( game.active ) {
    return 'The game is already started'
    }

    game.active  = true
    game.strikes = 0
    game.points  = 0
    game.passes  = 0
    game.words   = shuffle(words)
    getNewScrambledWord()
    return useCurrentScrambledWord()

}

function guess (guessedWord) {

  if ( !game.active ) {
      console.log('There is no current game')
      return 'Please use start() to start a new game.'
      }

  if (guessedWord.toLowerCase() === game.word.toLowerCase()) {
      game.points++
      console.log(`Correct! You have ${game.points} points`)
      return tryNextWord()
      }

  // guessedWord is incorrect

  game.strikes++

  console.log(`Incorrect! You have ${game.strikes} strikes (out of ${game.maxStrikes} allowed)`)

  if ( game.strikes >= game.maxStrikes )  {
      return endTheGame()
      }

  return useCurrentScrambledWord()
}



function pass () {
  if ( !game.active ) {
      console.log('There is no current game')
      return 'Please use start() to start a new game.'
      }

  if ( game.passes >= game.maxPasses ) {
      console.log(`You have already used ${game.passes} of ${game.maxPasses} passes`)
      return useCurrentScrambledWord()
      }

  game.passes++
  console.log(`Pass! You have used ${game.passes} passes (out of ${game.maxPasses} allowed)`)
  return tryNextWord()
  }


/* The status function is helpful for debugging */

function status() {
    console.log(`Active    : ${game.active}`)
    console.log(`Points    : ${game.points}`)
    console.log(`Strikes   : ${game.strikes} out of ${game.maxStrikes}`)
    console.log(`Passes    : ${game.passes} out of ${game.maxPasses}`)
    console.log(`Words     : ${game.words}`)
    console.log(`Word      : ${game.word}`)
    console.log(`Scrambled : ${game.scrambled}`)
    }


function useCurrentScrambledWord() {
      console.log(`The word is:`)
      return game.scrambled
}

function tryNextWord() {
  if ( anyWordsLeft() ) {
      console.log('The new word is:')
      return getNewScrambledWord()
      }
  return endTheGame()
}

function getNewScrambledWord () {
  game.word = game.words.shift()
  game.scrambled = game.word.slice(0)
  game.scrambled = shuffle(game.scrambled)
  return game.scrambled
}


function endTheGame() {
    game.active = false
    if ( game.strikes >= game.maxStrikes ) {
        console.log(`You used all of your strikes.`)
        return "Sorry, you lost."
        }

    else {
        console.log(`You win!`)
        console.log(`You got ${game.points} points.`)
        console.log(`You got ${game.strikes} strikes (out of ${game.maxStrikes} allowed)`)
        console.log(`You used ${game.passes} passes (out of ${game.maxPasses} allowed)`)
        return "Congratulations, you won!"
    }
}


function anyWordsLeft() {
    return game.words.length > 0
    }


/**  The guess (accepts a parameter) function */
/**
Don’t forget to check for end of game requirements inside the guess() function.

*     check if game.active is false (game needs to be started first)
*       return Must start a game in order to take a guess
      if to check that player doesnt have too many strikes (game.strike < game.maxStrikes || game.words.length > 0  )
  *      check if game.word == game.scramble.toLowerCase() (**case does not matter**)
           Use splice to remove the game.word from game.words array
  *        set game.points to 1
           return Correct and display current score
         else check game.word =! game.scramble.toLowerCase()
           game.strike++
*          return wrong and display how many strikes are left
      else
        game.active = false
        Return you are out of strikes, game over and display final score

*/


/*
 The pass() function (make sure player does not receive a point)
*     check if game.active is false (game needs to be started first)
*       return Must start a game in order to pass
      else game.passess >= game.maxPasses
        return You have used up all of your passes
      else if
*       Use splice to remove the game.word from game.words array
        game.passes++
        Return You used a pass and how many passes are left
*/

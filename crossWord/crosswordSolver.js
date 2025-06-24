import {
  verifyStarts,
  canplacehorizontal,
  canplacevertical,
  Input,
} from './utils/verifier.js'

import {
  placehorizontal,
  removehorizontal,
  placevertical,
  removevertical,
} from './utils/solver.js'

const puzzle = `1000`;
const words = [];

if (typeof puzzle !== 'string' || !Array.isArray(words) || words.length === 0) {
  
  console.error('Error');
  process.exit(1);
}

const NewPuzzle = puzzle.split('\n')
export const TheFirstPuzzle = puzzle.split('\n')
export const CountPuzzle = NewPuzzle.map(row => row.split('').map(_ => 0))
export const previousCharStack = NewPuzzle.map(
  row => row.split('').map(() => [])
)

const solutions = []

function solve(newpuzle, words, index) {
  if (index === words.length) {
    if (verifyStarts()) {
      solutions.push(newpuzle.join('\n'))
    }
    return
  }

  const rows = newpuzle.length
  const col = newpuzle[0].length
  const word = words[index]

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      if (canplacehorizontal(newpuzle, word, i, j)) {
        placehorizontal(newpuzle, word, i, j)
        solve(newpuzle, words, index + 1)
        removehorizontal(newpuzle, word, i, j)
      }

      if (canplacevertical(newpuzle, word, i, j)) {
        placevertical(newpuzle, word, i, j)
        solve(newpuzle, words, index + 1)
        removevertical(newpuzle, word, i, j)
      }
    }
  }
}

function crosswordSolver(puzzle,words){

  const isValid = Input(puzzle, words);
  if (!isValid){
    console.error('Error');
    process.exit(1);
  }
  
  const NewPuzzle = puzzle.split('\n')
  
  solve(NewPuzzle, words, 0)
}




crosswordSolver(puzzle,words)


solutions.length === 1 ? console.log(solutions[0])  : console.log('Error'); 

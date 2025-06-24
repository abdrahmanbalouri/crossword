import { TheFirstPuzzle, CountPuzzle } from '../crosswordSolver.js'

export function verifyStarts() {
  for (let i = 0; i < CountPuzzle.length; i++) {
    for (let j = 0; j < CountPuzzle[i].length; j++) {
      const cell = TheFirstPuzzle[i][j]
      if (cell === '1') {
        if (CountPuzzle[i][j] !== 1) return false
      } else if (cell === '2') {
        if (CountPuzzle[i][j] !== 2) return false
      } else if (cell === '0') {
        if (CountPuzzle[i][j] !== 0) return false
      }
    }
  }
  return true
}

export function canplacevertical(newpuzle, word, i, j) {
  if (TheFirstPuzzle[i][j] === '0') return false
  if (TheFirstPuzzle[i][j] === '1' && CountPuzzle[i][j] >= 1) return false // DIDNT GET IT
  if (TheFirstPuzzle[i][j] === '2' && CountPuzzle[i][j] >= 2) return false
  if (i + word.length > newpuzle.length) return false

  for (let n = 0; n < word.length; n++) {
    const row = i + n
    const cell = newpuzle[row][j]
    if (cell === '.') return false
    if (cell !== '0' && cell !== '1' && cell !== '2' && cell !== word[n]) return false
  }

  return true
}

export function canplacehorizontal(newpuzle, word, i, j) {
  if (TheFirstPuzzle[i][j] === '0') return false
  if (TheFirstPuzzle[i][j] === '1' && CountPuzzle[i][j] >= 1) return false
  if (TheFirstPuzzle[i][j] === '2' && CountPuzzle[i][j] >= 2) return false
  if (j + word.length > newpuzle[i].length) return false

  for (let n = 0; n < word.length; n++) {
    const cell = newpuzle[i][j + n]
    if (cell === '.') return false
    if (cell !== '0' && cell !== '1' && cell !== '2' && cell !== word[n]) return false
  }

  return true
}

export function Input(puzzle, words) {
  if (puzzle.includes(' ')) return false;

  if (!Array.isArray(words) || words.length === 0) return false;

  if (new Set(words).size !== words.length) return false;

  if (words.some(word => typeof word !== 'string' || !/^[a-zA-Z]+$/.test(word))) {
    return false;
  }

  return true;
}


// const puzzle = '   2001\n   0..0\n   1000\n   0..0'
// const words = ['casa', 'alan', 'ciao', 'anta']
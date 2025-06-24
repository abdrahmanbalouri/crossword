import { previousCharStack, CountPuzzle } from '../crosswordSolver.js'

export function placehorizontal(newpuzle, word, i, j) {
  CountPuzzle[i][j]++
  let row = newpuzle[i].split('')
  for (let n = 0; n < word.length; n++) {
        previousCharStack[i][j+n].push(row[j+n]) 
    row[j + n] = word[n]
  }
  newpuzle[i] = row.join('')
}

export function removehorizontal(newpuzle, word, i, j) {
  CountPuzzle[i][j]--
  let row = newpuzle[i].split('')
  for (let n = 0; n < word.length; n++) {
    row[j + n] = previousCharStack[i][j+n].pop() 
  }
  newpuzle[i] = row.join('')
}


export function placevertical(newpuzle, word, i, j) {
  CountPuzzle[i][j]++
  for (let n = 0; n < word.length; n++) {
    let row = newpuzle[i + n].split('')
      previousCharStack[i+n][j].push(row[j])
    row[j] = word[n]
    newpuzle[i + n] = row.join('')
  }
}

export function removevertical(newpuzle, word, i, j) {
  CountPuzzle[i][j]--
  for (let n = 0; n < word.length; n++) {
    let row = newpuzle[i + n].split('')
    row[j] =  previousCharStack[i+n][j].pop()
    newpuzle[i + n] = row.join('')
  }
}



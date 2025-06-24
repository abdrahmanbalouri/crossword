const puzzle = '1000\n1000'


const words = ['casa', 'an']


const k = puzzle.split('\n')
const newpuzle = puzzle.split('\n')
const startCount = newpuzle.map(row => row.split('').map(_ => 0))
const previousCharStack = newpuzle.map(
  row => row.split('').map(() => [])
)
console.log(previousCharStack);


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

function canplacehorizontal(newpuzle, word, i, j) {
  if (newpuzle[i][j] === '0') return false
  if (newpuzle[i][j] === '1' && startCount[i][j] >= 1) return false
  if (newpuzle[i][j] === '2' && startCount[i][j] >= 2) return false
  if (j + word.length > newpuzle[i].length) return false

  for (let n = 0; n < word.length; n++) {
    const cell = newpuzle[i][j + n]
    if (cell === '.') return false
    if (cell !== '0' && cell !== '1' && cell !== '2' && cell !== word[n]) return false
  }

  return true
}

function placehorizontal(newpuzle, word, i, j) {
  startCount[i][j]++
  let row = newpuzle[i].split('')
  for (let n = 0; n < word.length; n++) {
        previousCharStack[i][j+n].push(row[j+n]) 
    row[j + n] = word[n]
  }
  newpuzle[i] = row.join('')
}

function removehorizontal(newpuzle, word, i, j) {
  startCount[i][j]--
  let row = newpuzle[i].split('')
  for (let n = 0; n < word.length; n++) {
    row[j + n] = previousCharStack[i][j+n].pop() 
  }
  newpuzle[i] = row.join('')
}

function canplacevertical(newpuzle, word, i, j) {
  if (newpuzle[i][j] === '0') return false
  if (newpuzle[i][j] === '1' && startCount[i][j] >= 1) return false
  if (newpuzle[i][j] === '2' && startCount[i][j] >= 2) return false
  if (i + word.length > newpuzle.length) return false

  for (let n = 0; n < word.length; n++) {
    const row = i + n
    const cell = newpuzle[row][j]
    if (cell === '.') return false
    if (cell !== '0' && cell !== '1' && cell !== '2' && cell !== word[n]) return false
  }

  return true
}

function placevertical(newpuzle, word, i, j) {
  startCount[i][j]++
  for (let n = 0; n < word.length; n++) {
    let row = newpuzle[i + n].split('')
      previousCharStack[i+n][j].push(row[j])
    row[j] = word[n]
    newpuzle[i + n] = row.join('')
  }
}

function removevertical(newpuzle, word, i, j) {
  startCount[i][j]--
  for (let n = 0; n < word.length; n++) {
    let row = newpuzle[i + n].split('')
    row[j] =  previousCharStack[i+n][j].pop()
    newpuzle[i + n] = row.join('')
  }
}

function verifyStarts() {
  for (let i = 0; i < startCount.length; i++) {
    for (let j = 0; j < startCount[i].length; j++) {
      const cell = k[i][j]
      if (cell === '1') {
        if (startCount[i][j] !== 1) return false
      } else if (cell === '2') {
        if (startCount[i][j] !== 2) return false
      } else if (cell === '0') {
        if (startCount[i][j] !== 0) return false
      }
    }
  }
  return true
}

solve(newpuzle, words, 0)
console.log(solutions);

  
if (solutions.length === 1) {
  console.log(solutions[0]) 
} else {
  console.log('error')       
}


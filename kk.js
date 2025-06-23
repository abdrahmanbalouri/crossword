const puzzle = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`

const words = [
    'sun',
    'sunglasses',
    'suncream',
    'swimming',
    'bikini',
    'beach',
    'icecream',
    'tan',
    'deckchair',
    'sand',
    'seaside',
    'sandals',
]

const newpuzle = puzzle.split('\n')

function solve(newpuzle, words, index) {
    if (index === words.length) {
        return true
    }

    const rows = newpuzle.length
    const cols = newpuzle[0].length
    const word = words[index]

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (canPlaceHorizontal(newpuzle, word, i, j)) {
                placeHorizontal(newpuzle, word, i, j)
                if (solve(newpuzle, words, index + 1)) {
                    return true
                }
                removeHorizontal(newpuzle, word, i, j)
            }

            if (canPlaceVertical(newpuzle, word, i, j)) {
                placeVertical(newpuzle, word, i, j)
                if (solve(newpuzle, words, index + 1)) {
                    return true
                }
                removeVertical(newpuzle, word, i, j)
            }
        }
    }

    return false
}

function canPlaceHorizontal(puz, word, i, j) {
    if (j + word.length > puz[i].length) return false

    for (let k = 0; k < word.length; k++) {
        const c = puz[i][j + k]
        if (c === '.') return false
        if (c !== '1' && c !== '0' && c !== '2' && c !== word[k]) return false
    }

    return true
}

function placeHorizontal(puz, word, i, j) {
    const row = puz[i].split('')
    for (let k = 0; k < word.length; k++) {
        row[j + k] = word[k]
    }
    puz[i] = row.join('')
}

function removeHorizontal(puz, word, i, j) {
    const row = puz[i].split('')
    for (let k = 0; k < word.length; k++) {
        row[j + k] = '1'
    }
    puz[i] = row.join('')
}

function canPlaceVertical(puz, word, i, j) {
    if (i + word.length > puz.length) return false

    for (let k = 0; k < word.length; k++) {
        if (j >= puz[i + k].length) return false

        const c = puz[i + k][j]
        if (c === '.') return false
        if (c !== '1' && c !== '0' && c !== '2' && c !== word[k]) return false
    }

    return true
}

function placeVertical(puz, word, i, j) {
    for (let k = 0; k < word.length; k++) {
        const row = puz[i + k].split('')
        row[j] = word[k]
        puz[i + k] = row.join('')
    }
}

function removeVertical(puz, word, i, j) {
    for (let k = 0; k < word.length; k++) {
        const row = puz[i + k].split('')
        row[j] = '1'
        puz[i + k] = row.join('')
    }
}

if (solve(newpuzle, words, 0)) {
    console.log(newpuzle.join('\n'))
} else {
    console.log('Error')
}

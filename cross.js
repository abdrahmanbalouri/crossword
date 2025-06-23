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
].reverse()
const newpuzle = puzzle.split('\n')






function solve(newpuzle, words, index) {
	if (index === words.length) {
		return true
	}

	const rows = newpuzle.length
	const col = newpuzle[0].length
	const word = words[index]

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < col; j++) {
			if (canplacehorizontal(newpuzle, word, i, j)) {
				placehorizontal(newpuzle, word, i, j)

				if (solve(newpuzle, words, index + 1)) {
					return true
				}

				removehorizontal(newpuzle, word, i, j)


			}
			if (canplacevertical(newpuzle, word, i, j)) {
				placevertical(newpuzle, word, i, j)

				if (solve(newpuzle, words, index + 1)) {
					return true
				}

				removevertical(newpuzle, word, i, j)
			}
		}
	}
	return false
}

function canplacehorizontal(newpuzle, words, i, j) {
	if (j + words.length > newpuzle[i].length) {
		return false
	}

	for (let n = 0; n < words.length; n++) {
		const c = newpuzle[i][j + n]
		if (c === '.') {

			return false
		}
		if (c !== '1' && c !== '2' && c !== words[n] && c !== '0') {



			return false
		}
	}
	return true

}

function placehorizontal(newpuzle, words, i, j) {
	const r = newpuzle[i].split('')

	for (let n = 0; n < words.length; n++) {
		r[j + n] = words[n]

	}

	newpuzle[i] = r.join('')


}
function removehorizontal(newpuzle, words, i, j) {
	const r = newpuzle[i].split('')

	for (let n = 0; n < words.length; n++) {
		r[j + n] = '1'

	}

	newpuzle[i] = r.join('')
}

function canplacevertical(newpuzle, words, i, j) {
	if (i + words.length > newpuzle.length) {
		return false

	}
	for (let n = 0; n < words.length; n++) {
		if (j >= newpuzle[i + n].length) {


			return false
		}

		const c = newpuzle[i + n][j]
		if (c == '.') {
			return false
		}
		if (c !== '1' && c !== '2' && c !== words[n] && c !== '0') {
			return false
		}
	}
	return true
}
function placevertical(newpuzle, words, i, j) {


	for (let n = 0; n < words.length; n++) {
		const r = newpuzle[i + n].split('')
		r[j] = words[n]
		newpuzle[i + n] = r.join('')


	}

}

function removevertical(newpuzle, words, i, j) {

	for (let n = 0; n < words.length; n++) {

		let r = newpuzle[i + n].split('')

		r[j] = '1'

		newpuzle[i + n] = r.join('')
	}
}

let kk = solve(newpuzle, words, 0)
if (kk) {
	console.log(newpuzle.join('\n'));
} else {
	console.log('eroor');
}


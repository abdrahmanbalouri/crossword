  package main
import (
	"fmt"
	"strings"
)

func canPlaceHorizontal(puz []string, word string, row, col int) bool {
	if col+len(word) > len(puz[row]) {
		return false
	}
	for k := 0; k < len(word); k++ {
		c := puz[row][col+k]
		fmt.Println(string(c))
		if c == '.' {
			return false
		}
		if c != '1' && c != word[k] && c != '0' && c != '2' {
			return false
		}
	}
	return true
}

func placeHorizontal(puz []string, word string, row, col int) {
	r := []rune(puz[row])
	for k := 0; k < len(word); k++ {
		r[col+k] = rune(word[k])
	}
	puz[row] = string(r)
}

func removeHorizontal(puz []string, word string, row, col int) {
	r := []rune(puz[row])
	for k := 0; k < len(word); k++ {
		r[col+k] = '1'
	}
	puz[row] = string(r)
}

func canPlaceVertical(puz []string, word string, row, col int) bool {
	if row+len(word) > len(puz) {
		return false
	}
	for k := 0; k < len(word); k++ {
		if col >= len(puz[row+k]) {
			return false
		}
		c := puz[row+k][col]
		if c == '.' {
			return false
		}
		if c != '1' && c != word[k] && c != '0' && c != '2' {
			return false
		}
	}
	return true
}

func placeVertical(puz []string, word string, row, col int) {
	for k := 0; k < len(word); k++ {
		r := []rune(puz[row+k])
		r[col] = rune(word[k])
		puz[row+k] = string(r)
	}
}

func removeVertical(puz []string, word string, row, col int) {
	for k := 0; k < len(word); k++ {
		r := []rune(puz[row+k])
		r[col] = '1'
		puz[row+k] = string(r)
	}
}


func solve(puz []string, words []string, index int) bool {
	if index == len(words) {
		return true
	}

	rows := len(puz)
	cols := len(puz[0])

	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			if canPlaceHorizontal(puz, words[index], i, j) {
				placeHorizontal(puz, words[index], i, j)
				if solve(puz, words,  index+1) {
					return true
				}
				removeHorizontal(puz, words[index], i, j)
			}
			if canPlaceVertical(puz, words[index], i, j) {
				placeVertical(puz, words[index], i, j)
				fmt.Println(puz)
				if solve(puz, words, index+1) {
					return true
				}
				removeVertical(puz, words[index], i, j)
			}
		}
	}


	return false
}

func main() {
	puzzle := `2001
0..0
1000
0..0`

	puz := strings.Split(puzzle, "\n")
	words := []string{"casa", "alan", "ciao", "anta"}

	if solve(puz, words, 0) {
		for _, line := range puz {
			fmt.Println(line)
		}
	} else {
		fmt.Println(puz)
		fmt.Println("Error")
	}

}
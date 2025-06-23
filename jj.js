const emptyPuzzle = `2001 0..0 1000 0..0`;
const words = ['casa', 'alan', 'ciao', 'anta'];

let newPuzzle = emptyPuzzle.split('\n');

let puz = newPuzzle[0];

puz = 'g' + puz.slice(1);

console.log(puz);

newPuzzle[0] = puz;

console.log(newPuzzle);

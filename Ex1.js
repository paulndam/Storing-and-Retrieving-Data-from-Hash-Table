/** @format */

var readline = require("readline");

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function HashTable() {
	this.table = new Array(137);
	this.simpleHash = simpleHash;
	this.betterHash = betterHash;
	this.display = display;
	this.put = put;
	this.get = get;
}

function simpleHash(data) {
	let total = 0;
	for (let i = 0; i < data.length; i++) {
		total += data.charCodeAt(i);
	}
	return total % this.table.length;
}

function betterHash(string) {
	let primeNum = 31;
	let total = 0;

	for (let i = 0; i < string.length; i++) {
		total += primeNum * total + string.charCodeAt(i);
	}

	total = total % this.table.length;
	if (total < 0) {
		total += this.table.length - 1;
	}
	return parseInt(total);
}

// put function will insert or place a data in the hash table.
// it will get the array index value from the simpleHash method, then store that data element in that position.
// function put(data) {
// 	const position = this.simpleHash(data);
// 	this.table[position] = data;
// }

// Retrievinga and storind data in a hash table
// this function will take two params, a key and data. The key will be used the hash the value and then store the data.
function put(key, data) {
	const position = this.betterHash(key);
	this.table[position] = data;
}

// function get will retrieve the data that will be stored in the hash table. it will have one params which is the key. it will hash the key to determine where the data is stored and then once it does that, it will then retrieve that data from its position in the table.

function get(key) {
	return this.table[this.betterHash(key)];
}

// this function will display the data in the hash table
function display() {
	const number = 0;
	for (let i = 0; i < this.table.length; i++) {
		if (this.table[i] !== undefined) {
			console.log(`${i} ${this.table[i]}`);
		}
	}
}

var numbers = new HashTable();

var name, number;
while (name != "finished") {
	console.log("enter name or finished when done");
	name = rl.question(`enter name or finished when done`, (answer) => {
		console.log(`${answer}`);
		rl.close();
	});
	if (name == "finished") {
		break;
	}
	console.log("enter a number");
	number = rl.question(`enter a number`, (answer) => {
		console.log(`${answer}`);
		rl.close();
	});
	numbers.put(name, number);
}
name = "";
console.log("name for number, enter quit to stop");
while (name != "quit") {
	name = rl.question(`name for number, enter quit to stop`, (answer) => {
		console.log(`${answer}`);
		rl.close();
	});
	if (name == "quit") {
		break;
	}
	console.log(`${name}'s number is ${numbers.get(name)}`);
	console.log(`name for number (enter quit to stop)`);
}

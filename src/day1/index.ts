import * as fs from "fs";

//#region  Part 1
let input = fs.readFileSync(`${__dirname}/input.md`, "utf8");
let stringArr = input.trim().split(`\r`);
// console.log(stringArr);
let numArr = stringArr.map((string) => {
  var regex = /\d+/g;
  var matches = string.match(regex);
  let numbers = matches?.toString().split(",");
  console.log(`reading ${string}, result is: ${numbers}`);
  let results = 0;
  if (numbers) {
    let firstNumber = numbers[0];
    let lastNumber = numbers[numbers.length - 1];

    let firstDigit = firstNumber.toString().charAt(0);
    let lastDigit = lastNumber.toString().charAt(lastNumber.length - 1);

    results = parseInt(`${firstDigit}${lastDigit}`);
  }

  return results;
});

let results = numArr.reduce((x, y) => x + y, 0);
console.log("result for day 1 is", results);

//#endregion

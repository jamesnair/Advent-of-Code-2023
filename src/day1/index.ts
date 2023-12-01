import * as fs from "fs";
import { getFirstAndLastDigit_1 } from "./part1";
import { getFirstAndLastDigit_2 } from "./part2";

function getSumOfNumArray(numArr: number[]) {
  return numArr.reduce((x, y) => x + y);
}

let input = fs.readFileSync(`${__dirname}/input.md`, "utf8");
let stringArr = input.trim().split(`\r`);
let numArr_1 = stringArr.map(getFirstAndLastDigit_1);
let result_1 = getSumOfNumArray(numArr_1);

let numArr_2 = stringArr.map(getFirstAndLastDigit_2);
let result_2 = getSumOfNumArray(numArr_2);

console.log("result for part 1 is", result_1);
console.log("result for part 2 is", result_2);

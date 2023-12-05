import * as fs from "fs";
import { getPartNumbers } from "./part1";

let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
let rows = input.split(`\r`).map((r) => r.trim());

let parts = getPartNumbers(rows);
let result_1 = parts.reduce((x, y) => x + y);
console.log("result for part 1 is", result_1);

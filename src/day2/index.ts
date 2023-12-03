import * as fs from "fs";
import { computeGame } from "./part1";
import { computePower } from "./part2";

let input = fs.readFileSync(`${__dirname}/input.md`, "utf8");
let gameArr = input
  .split("\r")
  .map((game) => game.trim())
  .filter((x) => x !== "");

let results = 0;
gameArr.map((game) => {
  if (game !== "") {
    let { id, possible } = computeGame(game);
    if (possible) {
      results += id;
    }
  }
});

let result_2 = gameArr
  .map((game, index) => {
    let power = computePower(game);
    console.log(`power for ${index} is ${power}`);
    return power;
  })
  .reduce((x, y) => x + y);

// console.log("result for part 1 is", results);
console.log("result for part 2 is", result_2);

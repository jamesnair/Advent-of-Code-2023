import * as fs from "fs";
import { computeGame } from "./part1";

let input = fs.readFileSync(`${__dirname}/input.md`, "utf8");
let gameArr = input.split("\r").map((game) => game.trim());

let results = 0;
gameArr.map((game) => {
  if (game !== "") {
    let { id, possible } = computeGame(game);
    if (possible) {
      results += id;
    }
  }
});

console.log("result for part 1 is", results);

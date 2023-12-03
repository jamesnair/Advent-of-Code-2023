import { Color, getMarblesForSet } from "./helpers";

export const Bag: Record<Color, number> = {
  red: 12,
  blue: 14,
  green: 13,
};

export function computeGame(gameString: string) {
  let stringArr = gameString.split(":");
  let id = stringArr[0].split(" ")[1];

  let sets = stringArr[1].split(";");
  let possible = true;

  for (var set of sets) {
    let marbles = getMarblesForSet(set);
    if (
      marbles.red > Bag.red ||
      marbles.blue > Bag.blue ||
      marbles.green > Bag.green
    ) {
      possible = false;
      break;
    }
  }
  return {
    id: parseInt(id),
    possible: possible,
  };
}

import { Color, getMarblesForSet } from "./helpers";

export function computePower(gameString: string) {
  let stringArr = gameString.split(":");
  let id = stringArr[0].split(" ")[1];

  let sets = stringArr[1].split(";");
  let dict: Record<Color, number> = {
    red: 0,
    blue: 0,
    green: 0,
  };

  for (var set of sets) {
    let marbles = getMarblesForSet(set);
    Object.keys(marbles).map((colorStr) => {
      let color = colorStr as Color;
      if (marbles[color] > dict[color]) {
        dict[color] = marbles[color];
      }
    });
  }

  return Object.values(dict).reduce((x, y) => x * y); //multiple all value
}

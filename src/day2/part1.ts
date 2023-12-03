export const colors = ["red", "blue", "green"] as const;
type Color = (typeof colors)[number];

const Bag: Record<Color, number> = {
  red: 12,
  blue: 14,
  green: 13,
};

const getMarblesForSet = (set: string): Record<Color, number> => {
  let dict: Record<Color, number> = {
    red: 0,
    blue: 0,
    green: 0,
  };
  let colorNum = set.split(",");
  colorNum.forEach((combo) => {
    combo = combo.trim();
    let number = combo.split(" ")[0];
    let color = combo.split(" ")[1] as Color;
    dict[color] = parseInt(number);
  });

  return dict;
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

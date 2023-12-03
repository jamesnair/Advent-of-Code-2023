export const colors = ["red", "blue", "green"] as const;
type Color = (typeof colors)[number];

export const Bag: Record<Color, number> = {
  red: 12,
  blue: 14,
  green: 13,
};

export const getMarblesForSet = (set: string): Record<Color, number> => {
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

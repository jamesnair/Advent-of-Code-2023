var symbolRegex = new RegExp(/([^\d.])/g); //matches anything that's not a number and "."
var numberRegex = new RegExp(/([0-9]+)/g);

/** Return a list of indices of the seacrhedString inside 'string' */
function getIndicesOf(searchedString: string, string: string) {
  var index = 0;
  var startIndex = 0;
  var indices: number[] = [];
  while ((index = string.indexOf(searchedString, startIndex)) > -1) {
    if (
      isNaN(parseInt(string.charAt(index - 1))) &&
      isNaN(parseInt(string.charAt(index + searchedString.length)))
    ) {
      indices.push(index);
    }
    startIndex = index + searchedString.length;
  }

  return indices;
}

type Point = {
  x: number;
  y: number;
};

const getSurroundingPoints = (point: Point): Point[] => {
  return [
    { x: point.x, y: point.y - 1 }, //top
    { x: point.x + 1, y: point.y - 1 }, //top right
    { x: point.x + 1, y: point.y }, //right
    { x: point.x + 1, y: point.y + 1 }, //bottom right
    { x: point.x, y: point.y + 1 }, //bottom
    { x: point.x - 1, y: point.y + 1 }, //bottom left
    { x: point.x - 1, y: point.y }, //left
    { x: point.x - 1, y: point.y - 1 }, //top left
  ];
};

/** checking if the point is in the grid */
const isValidPoint = (point: Point, maxY: number, maxX: number) =>
  point.x >= 0 && point.x <= maxX && point.y >= 0 && point.y <= maxY;

export const getPartNumbers = (rows: string[]) => {
  var results: number[] = [];

  rows.map((row, y) => {
    // numberRegex.lastIndex = 0; //reset regex
    let numbers = [...new Set(row.match(numberRegex))]; //remove duplicates

    //for each number in the row, go through each digit, if a digit is adjacent, that number is part of the solution
    numbers?.map((number) => {
      let indices = getIndicesOf(number, row);
      indices.map((index) => {
        let isPartNumber = false;

        for (let x = index; x < index + number.length; x++) {
          let currentPoint: Point = { x, y };

          //go through each digit
          let surroundingPoints = getSurroundingPoints(currentPoint);

          for (let point of surroundingPoints) {
            if (isValidPoint(point, rows.length - 1, row.length - 1)) {
              let pointValue = rows[point.y][point.x];
              symbolRegex.lastIndex = 0; //reset regex
              let isASymbol = symbolRegex.test(pointValue);

              if (isASymbol) {
                isPartNumber = true;

                break;
              }
            }
          }

          if (isPartNumber) break;
        }

        if (isPartNumber) results.push(parseInt(number));
      });
    });
  });

  return results;
};

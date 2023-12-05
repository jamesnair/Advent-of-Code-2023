var symbolRegex = /([^\d.])/g; //matches anything that's not a number and "."
var numberRegex = /([0-9]*)/g;

/** Return a list of indices of the seacrhedString inside 'string' */
function getIndicesOf(searchedString: string, string: string) {
  var index = 0;
  var startIndex = 0;
  var indices: number[] = [];
  while (
    (index = string.indexOf(searchedString, startIndex)) > -1 &&
    isNaN(parseInt(string.charAt(index - 1))) &&
    isNaN(parseInt(string.charAt(index + searchedString.length)))
  ) {
    indices.push(index);
    startIndex = index + searchedString.length;
  }

  return indices;
}

type Point = {
  x: number;
  y: number;
};

const getSurroundingPoints = (point: Point) => {
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

const isValidPoint = (point: Point, maxY: number, maxX: number) =>
  point.x >= 0 && point.x <= maxX && point.y >= 0 && point.y <= maxY;

export const getPartNumbers = (rows: string[]) => {
  // var regex = /([^\d.])/g;
  var results: number[] = [];
  rows.map((row, y) => {
    let matches = row.match(numberRegex);
    let numbers = matches?.filter((match) => match !== "");

    //for each number in the row, go through each digit, if a digit is adjacent, that number is part of the solution
    numbers?.map((number) => {
      let indices = getIndicesOf(number, row);
      // console.log(
      //   `Checking number ${number}, with starting location ${indices}, duplicated? ${
      //     indices.length > 1
      //   }`
      // );
      indices.map((index) => {
        let isPartNumber = false;
        let symbol = "";
        numberLoop: for (let x = index; x < index + number.length; x++) {
          let currentPoint: Point = { x, y };
          //go through each digit
          let surroundingPoints = getSurroundingPoints(currentPoint);
          // console.log(
          //   `I'm at point [${currentPoint.x},${currentPoint.y}] with the value ${rows[y][x]}`
          // );
          for (var point of surroundingPoints) {
            // console.log(
            //   "currently at",
            //   point.x,
            //   point.y,
            //   isValidPoint(point, rows.length - 1, row.length - 1)
            // );
            if (isValidPoint(point, rows.length - 1, row.length - 1)) {
              let pointValue = rows[point.y][point.x];
              let isASymbol = symbolRegex.test(pointValue);
              // console.log(`checking ${pointValue} for symbol: ${isASymbol}`);
              if (isASymbol) {
                isPartNumber = true;
                symbol = pointValue;
                break numberLoop;
              }
            }
          }
        }

        console.log(
          `${number} ${isPartNumber ? "is" : "is NOT"} part of the thing ${
            isPartNumber && `with the symbol ${symbol}`
          }`
        );

        if (isPartNumber) results.push(parseInt(number));
      });
    });

    // console.log(
    //   `reading ${row}   numbers that is currently part of the thing is ${results}`
    // );
  });

  return results;
};

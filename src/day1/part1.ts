import * as fs from "fs";

export const getFirstAndLastDigit_1 = (string: string) => {
  var regex = /\d+/g;
  var matches = string.match(regex);
  let numbers = matches?.toString().split(",");
  //   console.log(`reading ${string}, result is: ${numbers}`);
  let results = 0;
  if (numbers) {
    let firstNumber = numbers[0];
    let lastNumber = numbers[numbers.length - 1];

    let firstDigit = firstNumber.toString().charAt(0);
    let lastDigit = lastNumber.toString().charAt(lastNumber.length - 1);

    results = parseInt(`${firstDigit}${lastDigit}`);
  }

  return results;
};

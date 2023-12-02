var Small: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

/** Return a list of indices of the seacrhedString inside 'string' */
function getIndicesOf(searchedString: string, string: string) {
  var index = 0;
  var startIndex = 0;
  var indices: number[] = [];
  while ((index = string.indexOf(searchedString, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchedString.length;
  }

  return indices;
}

/** Returns an array of string that spell out a number, sorted by order of appearance */
function text2num(str: string) {
  let filters = Object.keys(Small).filter((s) => str.includes(s));
  let dict: Record<string, string> = {};
  filters.map((value) => {
    let indices = getIndicesOf(value, str);
    indices.forEach((index) => {
      //create a dictionary with each occurrence value
      dict[index] = value;
    });
  });

  let textNumbers = Object.keys(dict).map((key) => dict[key]);
  //   console.log("my dict is", dict, "my text array is", textNumbers);
  return textNumbers;
}

export function getFirstAndLastDigit_2(string: string, index: number) {
  string = string.trim(); //trim whitespace
  var regex = /\d+/g;
  var matches = string.match(regex);
  let numbers = matches?.toString().split(","); //get all numbers
  let textArr = text2num(string);

  let results = 0;

  let firstNumber = numbers?.[0];
  let lastNumber = numbers?.[numbers.length - 1];

  let firstDigit = firstNumber?.toString().charAt(0);
  let lastDigit = lastNumber?.toString().charAt(lastNumber.length - 1);

  let firstDigitIndex = firstDigit ? string.indexOf(firstDigit) : -1;
  let lastDigitIndex = lastDigit ? string.lastIndexOf(lastDigit) : -1;

  let firstTextIndex = string.indexOf(textArr[0]);
  let lastTextIndex = string.lastIndexOf(textArr[textArr.length - 1]);

  //   console.log(
  //     `reading ${string}, first num ${firstDigit} at index ${string.indexOf(
  //       firstDigit ?? "no-digit"
  //     )}, last num ${lastDigit} at index ${string.indexOf(
  //       lastDigit ?? "no-digit"
  //     )}, first text ${textArr.at(
  //       0
  //     )} at text index ${firstTextIndex}, last text ${textArr.at(
  //       -1
  //     )} at text index ${lastTextIndex}`
  //   );

  let firstItem =
    firstDigitIndex > -1 &&
    (firstDigitIndex < firstTextIndex || firstTextIndex < 0)
      ? firstDigit
      : Small[textArr[0]].toString().charAt(0); //get first digit

  let lastItem =
    lastTextIndex < 0 || lastTextIndex < lastDigitIndex
      ? lastDigit
      : Small[textArr[textArr.length - 1]]
          .toString()
          .charAt(Small[textArr[textArr.length - 1]].toString().length - 1); //convert to string and get last digit
  console.log(
    `${
      index + 1
    }. Reading ${string}, number should be ${firstItem}${lastItem}, text array: ${textArr}`
  );
  results = parseInt(`${firstItem}${lastItem}`); //combine to create the number

  return results;
}

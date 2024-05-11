import React from "react";

function longestEvenOddSubarray(arr) {
  let startIndex = 0;
  let maxLength = 0;
  let currentLength = 0;
  let result = [];

  arr.forEach((num, index) => {
    if (
      (num % 2 === 0 && currentLength % 2 !== 0) ||
      (num % 2 !== 0 && currentLength % 2 === 0)
    ) {
      currentLength++;
    } else {
      startIndex = index;
      currentLength = 1;
    }

    if (currentLength > maxLength) {
      maxLength = currentLength;
      result = arr.slice(startIndex, index + 1);
      if (index + 6 <= arr.length) {
        result.push(...arr.slice(index + 1, index + 6));
      }
    }
  });

  return result;
}
const LongestSubarrayComponent = () => {
  const inputArray = [2, 5, 6, 8, 10, 4, 3, 1, 7];
  const resultArray = longestEvenOddSubarray(inputArray);

  return (
    <div>
      <h1>Longest Even-Odd Subarray</h1>
      <p>Input Array: {inputArray.join(", ")}</p>
      <p>Output Array: {resultArray.join(", ")}</p>
    </div>
  );
};

export default LongestSubarrayComponent;

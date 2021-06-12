// find all pairs of two numbers in given array that add to target
const pairSum = (array, target) => {
  const seenValues = {};
  const results = [];
  for (let num of array) {
    let diff = target - num;
    if (seenValues[diff]) {
      results.push([num, diff]);
    } else {
      seenValues[num] = true;
    }
  }
  return results;
};

// find all trios of numbers in given array that add to target
// key takeaways: sort, and the control while loop so that you get all possibilities for one value: i
const tripletSum = (array, target) => {
  //STEP ONE: SORT THE ARRAY IN ORDER TO USE SEQUENTIAL POINTERS!
  console.log("before: ", array);
  array.sort((a, b) => a - b);
  console.log("after: ", array);
  const results = [];
  for (let i = 0; i < array.length - 2; i++) {
    let left = i + 1;
    let right = array.length - 1;
    while (left < right) {
      let currentSum = array[i] + array[left] + array[right];
      console.log(currentSum, ":", i + 1, "::", target);
      if (currentSum === target) {
        console.log("result push block triggered.");
        results.push([array[i], array[left], array[right]]);
        left++;
        right--;
      } else if (currentSum < target) {
        left++;
      } else {
        // currentSum > target
        right--;
      }
    }
  }
  return results;
};

// find all unique sets of four numbers that add to make target
const quadSum = (array, target) => {
  const pairs = {};
  const results = [];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      let currentSum = array[i] + array[j];
      let diff = target - currentSum;
      // to the right of the current index, we can push to results
      if (pairs[diff]) {
        for (let pair of pairs[diff]) {
          results.push([...pair, array[i], array[j]]);
        }
      }
    }
    for (let k = 0; k < i; k++) {
      let currentSum = array[i] + array[k];
      let diff = target - currentSum;
      if (pairs[diff]) {
        // to the left of i, we write keys, and give values to our object
        pairs[diff].push([array[k], array[i]]);
      } else {
        // no key exists yet, so write it
        pairs[diff] = [[array[k], array[i]]];
      }
    }
  }
  return results;
};
// ** note the for loops for j and k are each running for one increment of i (the control loop)

console.log("pairSum>>> ", pairSum([2, 3, 5, -1, 9, -2], 8)); // -> [ [3, 5], [9, -1] ]
console.log("tripletSum>>> ", tripletSum([1, 4, 6, -3, -2, 5, -1, 8, 2, 7], 7)); // ->[ [4, 6, -3], [5, 9, -2], [1, -1, 7] ]
console.log("quadSum>>> ", quadSum([3, 4, 2, -2, 1, 5, -3, -1], 5)); // -> [ [ 4, 6, -2, 1], [3, 4, -2, 1 ], [5, -3, 1, 2] , ...]

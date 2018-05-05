// 0-1 = 0
// 2-3 = 1
// 4-5 = 2
// 6-7 = 3
// 8-9 = 4
// 10-11 = 5
// 12-13 = 6

const END = 72;
const timeIndices = {};
for (let ii = 0, count = 0; ii < END; ii += 2) {
  timeIndices[ii] = timeIndices[ii + 1] = count;
  count++;
}

export default timeIndices;

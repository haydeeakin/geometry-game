import { translation, rotation, reflection } from "./game";

test("translation", () => {
  // test commit
  let array = [
    [6, 9],
    [9, 12]
  ];
  expect(translation(array, -5, "x")).toEqual([
    [1, 9],
    [4, 12]
  ]);
});

test("rotation", () => {
  let testCoordinate = [
    [4, 6],
    [7, 8]
  ];
  expect(rotation(testCoordinate, 90, [0, 0])).toEqual([
    [-6, 4],
    [-8, 7]
  ]);
  expect(rotation(testCoordinate, 90, [0, 0])).toEqual([
    [-4, -6],
    [-7, -8]
  ]);
});

test("reflection", () => {
  let testCoordinate = [[1, 3]];
  expect(reflection(testCoordinate, [0, 1, 0])).toEqual([[1, -3]]);
  expect(reflection(testCoordinate, [1, 0, 0])).toEqual([[-1, -3]]);
  expect(reflection(testCoordinate, [1, 0, -1])).toEqual([[3, -3]]);
});

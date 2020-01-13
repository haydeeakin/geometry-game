import {translation, rotation, reflection} from './transformations.js'

test('translation', () => {
    console.log("in test");
    let testCoordinate = [6,3];
    expect(translation(testCoordinate, -5, 'x')).toEqual([1,3]);
    expect(translation(testCoordinate, -5, 'y')).toEqual([1,-2]);
    expect(translation(testCoordinate, 2, 'y')).toEqual([1,0]);

})
test('rotation', () => {
    let testCoordinate = [4,6];
    expect(rotation(testCoordinate, 90, [0,0])).toEqual([-6,4]);
    expect(rotation(testCoordinate, 90, [0,0])).toEqual([-4,-6]);
    expect(rotation(testCoordinate, 90, [0,0])).toEqual([6,-4]);
    expect(rotation(testCoordinate, 90, [0,0])).toEqual([4,6]);
})
test('reflection', () => {
    let testCoordinate = [1,3];
    expect(reflection(testCoordinate, [0,1,0])).toEqual([1,-3]);
    expect(reflection(testCoordinate, [1,0,0])).toEqual([-1,-3]);
    expect(reflection(testCoordinate, [1,0,-1])).toEqual([3,-3]);
})
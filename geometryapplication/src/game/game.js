export function translation(coordinate, move, direction) {
  for (let b of coordinate) {
    if (direction === "x") b[0] += move;

    if (direction === "y") b[1] += move;
  }

  return coordinate;
}

export function rotation(coordinate, angle, center = [0, 0]) {
  for (let b of coordinate) {
    if (b === center) continue;
    let newX =
      (b[0] - center[0]) * Math.cos((angle * Math.PI) / 180) -
      (b[1] - center[1]) * Math.sin((angle * Math.PI) / 180) +
      center[0];
    let newY =
      (b[0] - center[0]) * Math.sin((angle * Math.PI) / 180) +
      (b[1] - center[1]) * Math.cos((angle * Math.PI) / 180) +
      center[1];
    b[0] = Math.round(newX);
    b[1] = Math.round(newY);
  }
  return coordinate;
}

export function reflection(coordinate, line) {
  for (let b of coordinate) {
    let newX =
      ((Math.pow(line[1], 2) - Math.pow(line[0], 2)) * b[0] -
        2 * line[0] * line[1] * b[1] -
        2 * line[0] * line[2]) /
      (Math.pow(line[0], 2) + Math.pow(line[1], 2));

    let newY =
      ((Math.pow(line[0], 2) - Math.pow(line[1], 2)) * b[1] -
        2 * line[0] * line[1] * b[0] -
        2 * line[1] * line[2]) /
      (Math.pow(line[0], 2) + Math.pow(line[1], 2));

    b[0] = newX;
    b[1] = newY;
  }

  return coordinate;
}

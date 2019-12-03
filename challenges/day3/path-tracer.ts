export type Point = {
  x: number;
  y: number;
}

export const tracePath = (instructions: string): Set<string> => {
  const instructionsList = instructions.split(',');
  const path: Set<string> = new Set();
  let coordinate = { x: 0, y: 0 };

  instructionsList.forEach(instruction => {
    const newCoordinate = getNewCoordinate(instruction, coordinate);
    const intermediatePoints = getLinePoints(coordinate, newCoordinate);
    path.add(JSON.stringify(coordinate));
    intermediatePoints.forEach(point => path.add(JSON.stringify(point)));
    path.add(JSON.stringify(newCoordinate));

    coordinate = newCoordinate;
  });

  path.delete(JSON.stringify({ x: 0, y: 0 }));
  return path;
};

const getNewCoordinate = (instruction: string, { x, y }: Point) => {
  const direction = instruction[0];
  const distance = parseInt(instruction.substring(1), 10);
  if (direction === 'R') {
    return { x: x + distance, y };
  } else if (direction === 'L') {
    return { x: x - distance, y };
  } else if (direction === 'U') {
    return { x, y: y + distance };
  } else {
    return { x, y: y - distance };
  }
};

const getLinePoints = (coordinate1: Point, coordinate2: Point) => {
  const deltaX = coordinate2.x - coordinate1.x;
  const deltaY = coordinate2.y - coordinate1.y;
  const axis = deltaX ? 'x' : 'y';
  const distance = axis === 'x' ? Math.abs(deltaX) : Math.abs(deltaY);
  const direction = axis === 'x'
    ? deltaX > 0 ? 1 : -1
    : deltaY > 0 ? 1 : -1;

  let currentCoordinate = { ...coordinate1 };
  const intermediateCoordinates = [];

  for (let i = 1; i < distance; i++) {
    let point;
    if (axis === 'x') {
      point = {
        ...currentCoordinate,
        x: currentCoordinate.x + (direction * 1)
      };
    } else {
      point = {
        ...currentCoordinate,
        y: currentCoordinate.y + (direction * 1)
      };
    }
    intermediateCoordinates.push(point);
    currentCoordinate = point;
  }

  return intermediateCoordinates;
};

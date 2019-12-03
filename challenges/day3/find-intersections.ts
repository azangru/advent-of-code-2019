import { intersection } from 'ramda';

import { tracePath, Point } from './path-tracer';

export const findNearestManhattanDistance = (instructions1: string, instructions2: string) => {
  const intersections = findIntersections(instructions1, instructions2);
  return intersections.reduce((minDistance: number, stringifiedPoint: string) => {
    const point: Point = JSON.parse(stringifiedPoint);
    const distance = calculateManhattanDistanceFromCenter(point);
    return distance < minDistance ? distance: minDistance;
  }, Infinity)
}

export const findIntersections = (instructions1: string, instructions2: string) => {
  const path1 = tracePath(instructions1);
  const path2 = tracePath(instructions2);

  return intersection(
    [...path1.values()],
    [...path2.values()]
  );
};

const calculateManhattanDistanceFromCenter = (point: Point) => {
  return Math.abs(point.x) + Math.abs(point.y);
}

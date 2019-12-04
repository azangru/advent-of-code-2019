import { tracePath, Point, Step } from './path-tracer';

export const findNearestManhattanDistance = (instructions1: string, instructions2: string) => {
  const intersections = findIntersections(instructions1, instructions2);
  return intersections.flat().reduce((minDistance: number, step: Step) => {
    const point: Point = step[1];
    const distance = calculateManhattanDistanceFromCenter(point);
    return distance < minDistance ? distance: minDistance;
  }, Infinity)
};

export const findFewestCombinedSteps = (instructions1: string, instructions2: string) => {
  const intersections = findIntersections(instructions1, instructions2);
  return intersections.reduce((minSteps: number, pair: Step[]) => {
    const [step1, step2] = pair;
    const stepsSum = step1[0] + step2[0];
    return stepsSum < minSteps ? stepsSum: minSteps;
  }, Infinity)
};

export const findIntersections = (instructions1: string, instructions2: string) => {
  const steps1 = [...tracePath(instructions1).entries()];
  const steps2 = [...tracePath(instructions2).entries()];

  const pairs = [];

  for (let i = 0; i < steps1.length; i++) {
    for (let j = 0; j < steps2.length; j++) {
      const step1 = steps1[i];
      const step2 = steps2[j];
      if (step1[1].x === step2[1].x && step1[1].y === step2[1].y) {
        pairs.push([step1, step2]);
      }
    }
  }

  return pairs;
};

const calculateManhattanDistanceFromCenter = (point: Point) => {
  return Math.abs(point.x) + Math.abs(point.y);
}

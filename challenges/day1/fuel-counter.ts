export const countFuel = (mass: number) => {
  return Math.floor(mass/3) - 2;
};

export const countTotalFuel = (mass: number): number => {
  const fuel = countFuel(mass);
  if (fuel > 0) {
    return fuel + countTotalFuel(fuel);
  } else {
    return 0;
  }
};

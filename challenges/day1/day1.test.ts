import { countFuel, countTotalFuel } from './fuel-counter';

describe('countFuel', () => {
  test('counting', () => {
    expect(countFuel(12)).toEqual(2);
    expect(countFuel(14)).toEqual(2);
    expect(countFuel(1969)).toEqual(654);
    expect(countFuel(100756)).toEqual(33583);
  });
})

describe('countTotalFuel', () => {
  test('counting', () => {
    expect(countTotalFuel(12)).toEqual(2);
    expect(countTotalFuel(14)).toEqual(2);
    expect(countTotalFuel(1969)).toEqual(966);
    expect(countTotalFuel(100756)).toEqual(50346);
  });
});

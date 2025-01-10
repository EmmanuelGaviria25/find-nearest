import { calculateDistance } from "../../services/distanceCalculator";

describe('calculateDistance', () => {
  test('calculates the correct distance between two points', () => {
    const distance = calculateDistance(28.97859, -96.64609, 29.04054, -96.51358); 
    expect(distance).toBeCloseTo(14.61, 2); 
  });

  test('returns zero distance for the same point', () => {
    const distance = calculateDistance(28.97859, -96.64609,  28.97859, -96.64609); 
    expect(distance).toBe(0);
  });

  test('calculates distance for points on the equator', () => {
    const distance = calculateDistance(0, 0, 0, 10); 
    expect(distance).toBeCloseTo(1111.95, 2); 
  });

  test('calculates distance between points in different hemispheres', () => {
    const distance = calculateDistance(-6.2088, 106.8456, 40.7128, -74.006); 
    expect(distance).toBeCloseTo(16177.48, 2); 
  });
});

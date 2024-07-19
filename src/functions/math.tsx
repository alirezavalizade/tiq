export function getValueIncludingPercentage(number: number, percentage: number): number {
  const percentageValue = (number * percentage) / 100;

  return number - percentageValue;
}

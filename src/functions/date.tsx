export function getDayOfTheWeek(date: string): string {
  const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = new Date(date).getDay();
  return shortDays[dayIndex];
}

export function getDayOfTheMonth(date: string): number | string {
  return new Date(date).getDate();
}

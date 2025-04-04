import { isLeapYear } from "./utils";

export type Employment = {
  startDate: Date;
  untilDate: Date;
  percentage: number;
  vacationDays: number;
};

export function calculateProRataVacationDays(employment: Employment): number {
  const { startDate, untilDate, percentage, vacationDays } = employment;

  // Calculate the number of days between startDate and untilDate, considering leap years
  let totalDays = 0;
  const currentDate = new Date(startDate);

  while (currentDate <= untilDate) {
    totalDays++;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Calculate the pro-rata vacation days
  const daysInYear = isLeapYear(startDate.getFullYear()) ? 366 : 365;
  const proRataVacationDays = (totalDays / daysInYear) * vacationDays * (percentage / 100);

  return Math.round(proRataVacationDays * 100) / 100;
}

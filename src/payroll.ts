export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};

export type Deductions = Map<string, number>;

export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);

export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};

export function calculatePayslip(salary: Salary): Payslip {
  const result: Payslip = {
    salary: salary,
    deductions: new Map(),
    totalDeductions: 0.0,
    net: salary.gross,
  };

  // TODO: implement
  if (salary.born.getFullYear() < 2008) {
    result.deductions.set(
      "AHV, IV und EO",
      ((salary.gross * 12 / 100 * DEDUCTION_RATES.get("AHV")) +
        (salary.gross * 12 / 100 * DEDUCTION_RATES.get("IV")) +
        (salary.gross * 12 / 100 * DEDUCTION_RATES.get("EO")))
    )
  }

  if (salary.gross * 12 >= 2_500) {
    result.deductions.set(
      "ALV und NBU",
      ((salary.gross * 12 / 100 * DEDUCTION_RATES.get("ALV")) +
        (salary.gross * 12 / 100 * DEDUCTION_RATES.get("NBU")))
    )
  }

  if (salary.gross * 12 >= 22_680) {
    result.deductions.set(
      "PK",
      (salary.gross * 12 / 100 * DEDUCTION_RATES.get("PK"))
    )
  }

  let val: number = 0

  val += result.deductions.has("AHV, IV und EO") ? result.deductions.get("AHV, IV und EO") : 0;
  val += result.deductions.has("ALV und NBU") ? result.deductions.get("ALV und NBU") : 0;
  val += result.deductions.has("PK") ? result.deductions.get("PK") : 0;

  result.totalDeductions = val;
  result.net = (salary.gross * 12 - result.totalDeductions) / 12

  return result;
}



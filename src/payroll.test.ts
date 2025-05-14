import { calculatePayslip, Payslip, Salary } from "./payroll"

describe("Payroll Tests", () => {
    // ein 16 jähriger Lernender mit einem Monatsgehalt von 700.-
    it("ein 16 jähriger Lernender mit einem Monatsgehalt von 700.-", () => {
        const gehalt: Salary = {
            born: new Date("10.3.2008"),
            payday: new Date("25.12.2025"),
            gross: 8400,
        }

        const result: Payslip = {
            salary: gehalt,
            deductions: new Map(),
            totalDeductions: 2500,
            net: 5900,
        }

        expect(calculatePayslip(gehalt)).toBe(result)
    })

})
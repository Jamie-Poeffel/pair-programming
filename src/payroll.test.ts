import { calculatePayslip, Payslip, Salary } from "./payroll"

describe("Payroll Tests", () => {
    // ein 16 jähriger Lernender mit einem Monatsgehalt von 700.-
    it("ein 16 jähriger Lernender mit einem Monatsgehalt von 700.-", () => {
        const gehalt: Salary = {
            born: new Date("10.3.2008"),
            payday: new Date("25.12.2025"),
            gross: 700,
        }

        const result: Payslip = {
            salary: gehalt,
            deductions: new Map([["ALV und NBU", 153.72]]),
            totalDeductions: 153.72,
            net: 687.19,
        }

        expect(calculatePayslip(gehalt)).toMatchObject(result)
    })

    // ein 18 jähriger Lernender mit einem Monatsgehalt von 1200.-

    it("ein 18 jähriger Lernender mit einem Monatsgehalt von 1200.-", () => {
        const gehalt: Salary = {
            born: new Date("10.3.2006"),
            payday: new Date("25.12.2025"),
            gross: 1200,
        }

        const result: Payslip = {
            salary: gehalt,
            deductions: new Map([["ALV und NBU", 263.52], ["AHV, IV und EO", 1526.3999999999999]]),
            totalDeductions: 1789.9199999999998,
            net: 1050.84,
        }

        expect(calculatePayslip(gehalt)).toMatchObject(result)
    })

    // ein 21 jähriger Angestellter mit einem Monatsgehalt von 5900.-
    it("ein 21 jähriger Angestellter mit einem Monatsgehalt von 5900.-", () => {
        const gehalt: Salary = {
            born: new Date("10.3.2004"),
            payday: new Date("25.12.2025"),
            gross: 5900,
        }

        const result: Payslip = {
            salary: gehalt,
            deductions: new Map([["ALV und NBU", 1295.64], ["AHV, IV und EO", 7504.799999999999], ["PK", 6301.2]]),
            totalDeductions: 15101.64,
            net: 4641.53,
        }

        expect(calculatePayslip(gehalt)).toMatchObject(result)
    })
})
import { describe, expect, test } from "bun:test"
import { JutgeObjectModel as JOM } from "./jom"

describe("Tables", () => {
    const jom = new JOM()

    test.each([
        ["countries", jom.countries, "ES-Cat", "eng_name", "Spain - Catalunya"],
        ["compilers", jom.compilers, "Python3", "extension", "py"],
        ["languages", jom.languages, "ca", "own_name", "Català"],
        ["drivers", jom.drivers, "std", "driver_id", "std"],
        ["verdicts", jom.verdicts, "AC", "verdict_id", "AC"],
        ["proglangs", jom.proglangs, "C", "proglang_id", "C"],
    ])(
        "%s",
        async (
            _name: string,
            table: any,
            key: string,
            field: string,
            value: string
        ) => {
            expect(table.hasCache()).toBe(false)

            const result = await table.all()
            expect(Object.keys(result).length).toBeGreaterThan(0)
            expect(table.hasCache()).toBe(true)

            const item = await table.get(key)
            expect(item).toBeDefined()
            expect(item).toHaveProperty(field)
            expect(item![field]).toBe(value)
        }
    )
})

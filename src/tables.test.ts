import { describe, expect, test } from "bun:test"
import { JutgeObjectModel as JOM } from "./jom"

describe("Tables", async () => {
    const jom = new JOM()

    test.each([
        ["languages", jom.languages, "ca", "hello", true],
        ["countries", jom.countries, "cat", "yay", 13],
        ["compilers", jom.compilers, "py", "ext", ".py"],
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

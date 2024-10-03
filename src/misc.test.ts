import { describe, expect, test } from "bun:test"
import { JutgeObjectModel as JOM } from "./jom"

describe("Open Endpoints", () => {
    const jom = new JOM()

    test("misc.fortune()", async () => {
        const fortune = await jom.misc.fortune()
        expect(typeof fortune).toBe("string")
        expect(fortune.length).toBeGreaterThan(0)
    })

    test("misc.time()", async () => {
        const time = await jom.misc.time()
        expect(time).toHaveProperty("time")
        expect(time).toHaveProperty("date")
    })

    // FIXME(pauek): Seems like @hey-api/openapi-ts returns "undefined" when it should return an empty string?
    // Do we have to change the API? I hope not...
    // (it is skipped for now)
    test.skip("misc.ping()", async () => {
        const pong = await jom.misc.ping()
        expect(pong).toBe("")
    })
})

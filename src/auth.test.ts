import { describe, expect, test } from "bun:test"
import { JutgeObjectModel as JOM } from "./jom"

describe("Auth", () => {
    const jom = new JOM()

    test("auth.login()", async () => {
        const { TEST_USER, TEST_PASSWORD } = process.env
        expect(TEST_USER).toBeDefined()
        expect(TEST_PASSWORD).toBeDefined()

        const badLogin = await jom.auth.login("a@a.com", "1234")
        expect(badLogin.success).toBe(false)
        expect(badLogin.error).toBeDefined()

        const goodLogin = await jom.auth.login(TEST_USER!, TEST_PASSWORD!)
        expect(goodLogin.success).toBe(true)
        expect(goodLogin.error).toBeUndefined()

        const goodCheck = await jom.auth.check()
        expect(goodCheck.success).toBe(true)
        expect(goodCheck.credentials).toBeDefined()

        const goodLogout = await jom.auth.logout()
        expect(goodLogout.success).toBe(true)

        const badCheck = await jom.auth.check()
        expect(badCheck.success).toBe(false)
        expect(badCheck.error).toBe("Not logged in.")

        const badLogout = await jom.auth.logout()
        expect(badLogout.success).toBe(false)
        expect(badLogout.error).toBe("Not logged in.")
    })
})

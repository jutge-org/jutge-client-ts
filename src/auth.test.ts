import { describe, expect, mock, test } from "bun:test"
import { JutgeObjectModel as JOM } from "./jom"
import dayjs from "dayjs"

describe("Auth", () => {
    const jom = new JOM()

    test("Login with bad user/password", async () => {
        mock.module("./client", () => ({
            AuthService: {
                async login(_user: string, _password: string) {
                    throw new Error("Unauthorized mock")
                },
            },
        }))

        const result = await jom.auth.login("a@a.com", "1234")
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error).toBe("Unauthorized mock")
    })

    test("Login with correct user/password", async () => {
        const token = crypto.randomUUID().replace(/-/g, "")
        const user_uid = crypto.randomUUID().replace(/-/g, "")
        mock.module("./client", () => ({
            AuthService: {
                async login(_user: string, _password: string) {
                    return {
                        token,
                        expiration: "2025-12-31T23:59:59Z",
                        user_uid,
                    }
                },
            },
        }))

        const result = await jom.auth.login("fake@user.com", "123456")
        expect(result.success).toBe(true)
        expect(result.error).toBeUndefined()
        expect(jom.auth.credentials.token).toBe(token)
        expect(jom.auth.credentials.user_uid).toBe(user_uid)
        // TODO(pauek): Also read the config file at ~/.config/@jutge.org/config.json 
        // and check that the values are written there.
    })

    test("Check with credentials", async () => {
        mock.module("./client", () => ({
            AuthService: {
                async check() {
                    return { success: true }
                },
            },
        }))
        mock.module("./config", () => ({
            config: {
                get(x: string) {
                    return {
                        token: "Fake token",
                        user_uid: "Fake user_uid",
                        expiration: dayjs(new Date()).add(5, "hour"),
                    }
                },
            },
        }))

        const result = await jom.auth.check()
        expect(result.success).toBe(true)
        expect(result.credentials.token).toBe("Fake token")
        expect(result.credentials.user_uid).toBe("Fake user_uid")
        expect(result.expiresIn).toBe("5 hours")
    })

    test("Check not logged in", async () => {
        mock.module("./config", () => ({
            config: {
                get() {
                    return null
                },
            },
        }))

        const result = await jom.auth.check()
        expect(result.success).toBe(false)
        expect(result.error).toBe("Not logged in.")
    })

    test("Logout", async () => {
        const deleteMock = mock((key) => key)
        const logoutMock = mock(async () => {})
        mock.module("./config", () => ({
            config: { delete: deleteMock, get: () => "Fake credentials" },
        }))
        mock.module("./client", () => ({
            AuthService: { logout: logoutMock },
        }))

        const result = await jom.auth.logout()
        expect(result.success).toBe(true)
        expect(result.error).toBeUndefined()
        expect(deleteMock).toHaveBeenCalledTimes(1)
        expect(logoutMock).toHaveBeenCalledTimes(1)
        expect(deleteMock.mock.calls[0][0]).toBe("credentials")
    })

    test("Failed logout (API call error)", async () => {
        mock.module("./client", () => ({
            AuthService: {
                logout: () => {
                    throw new Error("API error")
                },
            },
        }))

        const result = await jom.auth.logout()
        expect(result.success).toBe(false)
        expect(result.error).toBe("API error")
    })

    test("Failed logout (Not logged in)", async () => {
        mock.module("./config", () => ({
            config: { get: () => null },
        }))

        const result = await jom.auth.logout()
        expect(result.success).toBe(false)
        expect(result.error).toBe("Not logged in.")
    })
})

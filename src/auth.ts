import { config } from "./config"
import { AuthService, OpenAPI } from "./client"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

type Credentials = Awaited<ReturnType<typeof AuthService.login>>

export class Auth {
    _ensureCredentials() {
        const maybeCredentials = config.get("credentials")
        if (!maybeCredentials) {
            return null
        }
        const credentials = maybeCredentials as Credentials
        OpenAPI.TOKEN = credentials.token
        return credentials
    }

    async login(email: string, password: string) {
        try {
            const credentials = await AuthService.login({
                requestBody: { email, password },
            })
            config.set("credentials", credentials)
            return { success: true }
        } catch (error) {
            return { success: false, error }
        }
    }

    async logout() {
        const credentials = this._ensureCredentials()
        if (!credentials) {
            return { success: false, error: "Not logged in." }
        }
        await AuthService.logout()
        config.delete("credentials")
        return { success: true }
    }

    async check() {
        const credentials = this._ensureCredentials()
        if (!credentials) {
            return { success: false, error: "Not logged in." }
        }
        const result = await AuthService.check()
        if (!result || !result.success) {
            return { success: false, error: "Not logged in." }
        }
        const expiresIn = dayjs(credentials.expiration).from(dayjs(), true)
        return { success: true, credentials, expiresIn }
    }
}

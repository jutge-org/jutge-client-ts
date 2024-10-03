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
            throw new Error("Not logged in.")
        }
        const credentials = maybeCredentials as Credentials
        OpenAPI.TOKEN = credentials.token
        return credentials
    }

    get credentials() {
        return this._ensureCredentials()
    }

    async login(
        email: string,
        password: string
    ): Promise<{ success: boolean; error?: string }> {
        try {
            const credentials = await AuthService.login({
                requestBody: { email, password },
            })
            config.set("credentials", credentials)
            return { success: true }
        } catch (error: any) {
            return { success: false, error: error.message }
        }
    }

    async logout() {
        try {
            this._ensureCredentials()
            await AuthService.logout()
            config.delete("credentials")
            return { success: true }
        } catch (error: any) {
            return { success: false, error: error.message }
        }
    }

    async check() {
        try {
            const credentials = this._ensureCredentials()
            const result = await AuthService.check()
            if (!result || !result.success) {
                return { success: false, error: "Not logged in." }
            }
            const expiresIn = dayjs(credentials.expiration).from(dayjs(), true)
            return { success: true, credentials, expiresIn }
        } catch (error: any) {
            return { success: false, error: error.message }
        }
    }
}

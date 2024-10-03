import { MiscService } from "./client"

export class Misc {
    async hello() {
        return await MiscService.hello()
    }

    async fortune() {
        return (await MiscService.getFortune()).message
    }

    async time() {
        return await MiscService.getTime()
    }

    async ping() {
        return await MiscService.ping()
    }

    async homepageStats() {
        return await MiscService.getHomepageStats()
    }
}

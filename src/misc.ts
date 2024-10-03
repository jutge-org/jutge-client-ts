import { MiscService } from "./client"

export class Misc {
    async fortune() {
        return (await MiscService.getFortune()).message
    }

    async time() {
        return await MiscService.getTime()
    }

    async ping() {
        return await MiscService.ping()
    }
}

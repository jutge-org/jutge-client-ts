import { StudentProfileService, TProfile } from "./client"

class StudentProfile {
    private data: TProfile | undefined

    private async reload() {
        this.data = await StudentProfileService.getProfile()
    }

    async get() {
        if (!this.data) await this.update()
        return this.data!
    }

    async update(ms?: number) {
        await this.reload()
        if (ms) setInterval(() => this.update(), ms)
    }
}

class Avatar {
    private data: Blob | undefined

    private async reload() {
        this.data = await StudentProfileService.getAvatar()
    }

    async get() {
        if (!this.data) await this.update()
        return this.data!
    }

    async update(ms?: number) {
        await this.reload()
        if (ms) setInterval(() => this.update(), ms)
    }
}

export class Profile {
    data: StudentProfile = new StudentProfile()
    avatar: Avatar = new Avatar()
}

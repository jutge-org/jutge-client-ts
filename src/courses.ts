import { StudentCoursesService, TCourse } from "./client"

class AvailableCourses {
    private items: Dict<TCourse> | undefined

    private async reload() {
        this.items = (await StudentCoursesService.getAvailableCourses()) as any
    }

    async all() {
        if (!this.items) await this.update()
        return this.items!
    }

    async get(course_id: string) {
        if (!this.items) await this.update()
        return this.items![course_id]
    }

    async update(ms?: number) {
        await this.reload()
        if (ms) setInterval(() => this.update(), ms)
    }
}

class EnrolledCourses {
    private items: Dict<TCourse> | undefined

    private async reload() {
        this.items = (await StudentCoursesService.getEnrolledCourses()) as any
    }

    async all() {
        if (!this.items) await this.update()
        return this.items!
    }

    async get(course_id: string) {
        if (!this.items) await this.update()
        return this.items![course_id]
    }

    async update(ms?: number) {
        await this.reload()
        if (ms) setInterval(() => this.update(), ms)
    }
}

export class Courses {
    available: AvailableCourses = new AvailableCourses()
    enrolled: EnrolledCourses = new EnrolledCourses()
}

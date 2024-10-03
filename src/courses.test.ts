import { expect, test } from "bun:test"
import { JutgeObjectModel as JOM } from "./jom"
import { describeWithToken } from "./test-utils"

describeWithToken("Courses", () => {
    const jom = new JOM()

    test("courses.available.all()", async () => {
        const courses = await jom.courses.available.all()
    })

    test("courses.available.get()", async () => {
        const courses = await jom.courses.available.all()
        const courseId = Object.keys(courses)[0]
        const course = await jom.courses.available.get(courseId)
    })

    test("courses.enrolled.all()", async () => {
        const courses = await jom.courses.enrolled.all()
        expect(Object.keys(courses).length).toBeGreaterThan(0)
        const firstCourse = Object.values(courses)[0]
    })

    test("courses.enrolled.get()", async () => {
        const courses = await jom.courses.enrolled.all()
        const courseId = Object.keys(courses)[0]
        const course = await jom.courses.enrolled.get(courseId)
    })
})

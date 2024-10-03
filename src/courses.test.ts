import { expect, test } from "bun:test"
import { JutgeObjectModel as JOM } from "./jom"
import { describeWithToken } from "./test-utils"

describeWithToken("Courses", () => {
    const jom = new JOM()

    test("courses.available.all()", async () => {
        const courses = await jom.courses.available.all()
        expect(courses).toBeDefined()
    })

    test("courses.available.get()", async () => {
        // TODO(pauek): To test this correctly, we should know which courses the user has available and test those
        // Or is the API responsible for testing that?
        const courses = await jom.courses.available.all()
        for (const courseId in courses) {
            const course = await jom.courses.available.get(courseId)
            expect(course).toBeDefined()
        }
    })

    test("courses.enrolled.all()", async () => {
        const courses = await jom.courses.enrolled.all()
        expect(courses).toBeDefined()
        expect(Object.keys(courses).length).toBeGreaterThan(0) // FIXME(pauek): The user for the token might not have any courses...
    })

    test("courses.enrolled.get()", async () => {
        const courses = await jom.courses.enrolled.all()
        for (const courseId in courses) {
            const course = await jom.courses.enrolled.get(courseId)
            expect(course).toBeDefined()
        }
    })

    // TODO: Enroll and unenroll tests, checking against known data.
    // Maybe the way to do this is to have a test API, but that is too much cost for now.
})

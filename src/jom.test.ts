import { beforeAll, describe, expect, test } from "bun:test"
import { OpenAPI } from "./client"
import { JutgeObjectModel as JOM } from "./jom"

const jom = new JOM()

describe("Open Endpoints", () => {
    test("misc.fortune()", async () => {
        const fortune = await jom.misc.fortune()
        expect(typeof fortune).toBe("string")
        expect(fortune.length).toBeGreaterThan(0)
    })

    test("misc.time()", async () => {
        const time = await jom.misc.time()
        expect(time).toHaveProperty("time")
        expect(time).toHaveProperty("date")
    })

    // FIXME(pauek): Seems like @hey-api/openapi-ts returns "undefined" when it should return an empty string?
    // Do we have to change the API? I hope not...
    // (it is skipped for now)
    test.skip("misc.ping()", async () => {
        const pong = await jom.misc.ping()
        expect(pong).toBe("")
    })

    test.each([
        ["countries", jom.countries, "ES-Cat", "eng_name", "Spain - Catalunya"],
        ["compilers", jom.compilers, "Python3", "extension", "py"],
        ["languages", jom.languages, "ca", "own_name", "Català"],
        ["drivers", jom.drivers, "std", "driver_id", "std"],
        ["verdicts", jom.verdicts, "AC", "verdict_id", "AC"],
        ["proglangs", jom.proglangs, "C", "proglang_id", "C"],
    ])(
        "%s",
        async (
            _name: string,
            table: any,
            key: string,
            field: string,
            value: string
        ) => {
            expect(table.hasCache()).toBe(false)

            const result = await table.all()
            expect(Object.keys(result).length).toBeGreaterThan(0)
            expect(table.hasCache()).toBe(true)

            const item = await table.get(key)
            expect(item).toBeDefined()
            expect(item).toHaveProperty(field)
            expect(item![field]).toBe(value)
        }
    )
})

describe.skip("Authenticated Endpoints", () => {
    beforeAll(() => {
        // Set up the OpenAPI token
        OpenAPI.TOKEN = process.env.JUTGE_TOKEN
        if (!OpenAPI.TOKEN) {
            throw new Error("TOKEN environment variable is not set")
        }
    })

    test("profile.data.get()", async () => {
        const profile = await jom.profile.data.get()
    })

    test("profile.avatar.get()", async () => {
        const avatar = await jom.profile.avatar.get()
    })

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

    test("lists.all()", async () => {
        const lists = await jom.lists.all()
        expect(Object.keys(lists).length).toBeGreaterThan(0)
        const firstList = Object.values(lists)[0]
    })

    test("lists.get()", async () => {
        const lists = await jom.lists.all()
        const listId = Object.keys(lists)[0]
        const list = await jom.lists.get(listId)
    })

    test("problems.all()", async () => {
        const problems = await jom.problems.all()
        expect(Object.keys(problems).length).toBeGreaterThan(0)
        const firstProblem = Object.values(problems)[0]
    })

    test("problems.get()", async () => {
        const problems = await jom.problems.all()
        const problemId = Object.keys(problems)[0]
        const problem = await jom.problems.get(problemId)
    })

    test("JutgeObjectModel constructor", () => {
        expect(jom).toBeInstanceOf(JOM)
    })
})

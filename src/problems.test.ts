import { expect, test } from "bun:test"
import { JutgeObjectModel as JOM } from "./jom"
import { describeWithToken } from "./test-utils"

describeWithToken("Problems", () => {
    const jom = new JOM()

    test("problems.all()", async () => {
        const problems = await jom.problems.all()
        expect(Object.keys(problems).length).toBeGreaterThan(0)
    })

    test("problems.get()", async () => {
        const problems = await jom.problems.all()
        const problemId = Object.keys(problems)[0]
        const problem = await jom.problems.get(problemId)
        expect(problem).toBeDefined()
    })
})

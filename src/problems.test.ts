import { expect, test } from "bun:test"
import { JutgeObjectModel as JOM } from "./jom"
import { describeWithToken } from "./test-utils"

describeWithToken("Problems", () => {
    const jom = new JOM()

    // FIXME(pauek): The API is giving internal error for now
    test.skip("problems.all()", async () => {
        const problems = await jom.problems.all()
        console.log("Number of problems:", Object.keys(problems).length)
        expect(Object.keys(problems).length).toBeGreaterThan(0)
    })

    // FIXME(pauek): The API is giving internal error for now
    test.skip("problems.get()", async () => {
        const problems = await jom.problems.all()
        const problemId = Object.keys(problems)[0]
        const problem = await jom.problems.get(problemId)
    })
})

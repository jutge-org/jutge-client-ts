import { expect, test } from "bun:test"
import { JutgeObjectModel as JOM } from "./jom"
import { describeWithToken } from "./test-utils"

const MAX_LISTS_TESTED = 5

describeWithToken("Courses", () => {
    const jom = new JOM()

    test("lists.all()", async () => {
        const lists = await jom.lists.all()
        expect(Object.keys(lists).length).toBeGreaterThan(0)
    })

    test("lists.get()", async () => {
        const lists = await jom.lists.all()
        const list_ids = Object.keys(lists)
        const numTests = Math.min(MAX_LISTS_TESTED, list_ids.length)
        for (let i = 0; i < numTests; i++) {
            const list = await jom.lists.get(list_ids[i])
            expect(list).toBeDefined()
        }
    })
})

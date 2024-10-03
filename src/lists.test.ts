import { expect, test } from "bun:test"
import { JutgeObjectModel as JOM } from "./jom"
import { describeWithToken } from "./test-utils"

describeWithToken("Courses", () => {
    const jom = new JOM()

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
})

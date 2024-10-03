import { test } from "bun:test"
import { JutgeObjectModel as JOM } from "./jom"
import { describeWithToken } from "./test-utils"

describeWithToken("Authenticated Endpoints", () => {
    const jom = new JOM()

    test("profile.data.get()", async () => {
        const profile = await jom.profile.data.get()
    })

    test("profile.avatar.get()", async () => {
        const avatar = await jom.profile.avatar.get()
    })
})

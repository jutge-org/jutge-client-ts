import { beforeAll, describe } from "bun:test"
import { OpenAPI } from "./client"

export const describeWithToken = (label: string, testFunction: () => void) => {
    describe(label, () => {
        beforeAll(() => {
            OpenAPI.TOKEN = process.env.JUTGE_TOKEN
            if (!OpenAPI.TOKEN) {
                throw new Error("TOKEN environment variable is not set")
            }
        })
        testFunction()
    })
}

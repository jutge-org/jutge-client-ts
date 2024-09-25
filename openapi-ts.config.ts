import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
    client: "axios",
    input: "https://api.jutge.org/v1/OpenAPI.json",
    base: "https://api.jutge.org",
    output: "src/client",
})

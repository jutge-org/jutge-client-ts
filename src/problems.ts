import { StudentProblemsService, TAbstractProblem } from "./client"

export class Problems {
    private items: Dict<TAbstractProblem> | undefined

    private async reload() {
        this.items = (await StudentProblemsService.getAbstractProblems()) as any
    }

    async all() {
        if (!this.items) await this.update()
        return this.items!
    }

    async get(problem_key: string) {
        if (!this.items) await this.update()
        if (!this.items) return undefined

        if (problem_key.includes("_")) {
            const problem_nm = problem_key.split("_")[0]
            const abstractProblem = this.items[problem_nm]
            if (!abstractProblem) {
                return undefined
            }
            for (const problem_id in abstractProblem.problems) {
                if (problem_id === problem_key) {
                    return abstractProblem.problems[problem_id]
                }
            }
            return undefined
        } else {
            return this.items[problem_key]
        }
    }

    async update(ms?: number) {
        await this.reload()
        if (ms) setInterval(() => this.update(), ms)
    }
}

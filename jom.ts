
// TODO: treure alguns as any perquè venen de problems de tipus l'API
// TODO: adaptar a la darrera versió de l'API

import {
    MiscService,
    MyCoursesService,
    MyListsService,
    MyProblemsService,
    MyProfileService,
    OpenAPI,
    TablesService,
    type TBasicAbstractProblemOut,
    type TCompiler,
    type TCourseOut,
    type TLanguage,
    type TListOut,
    type TProfileOut,
} from './client'


type Dict<T> = { [_: string]: T }


async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


class Compilers {
    private items: Dict<TCompiler> | undefined

    private async reload() {
        const compilers = await TablesService.getAllCompilers() as Dict<TCompiler>
        this.items = {}
        for (const compiler_id in compilers) {
            this.items[compiler_id] = compilers[compiler_id]
        }
    }

    async all() {
        if (!this.items) await this.update()
        return this.items!
    }

    async get(compiler_id: string) {
        if (!this.items) await this.update()
        return this.items![compiler_id]
    }

    async update(ms?: number) {
        await this.reload()
        if (ms) setInterval(() => this.reload(), ms)
    }
}


class Languages {
    private items: Dict<TLanguage> | undefined

    private async reload() {
        const languages = await TablesService.getAllLanguages() as Dict<TLanguage>
        this.items = {}
        for (const language_id in languages) {
            this.items[language_id] = languages[language_id]
        }
    }

    async all() {
        if (!this.items) await this.update()
        return this.items!
    }

    async get(language_id: string) {
        if (!this.items) await this.update()
        return this.items![language_id]
    }

    async update(ms?: number) {
        await this.reload()
        if (ms) setInterval(() => this.reload(), ms)
    }
}


class Misc {
    async fortune() {
        return (await MiscService.getFortune()).message
    }

    async time() {
        return await MiscService.getTime()
    }
}


class ProfileData {
    private data: TProfileOut | undefined

    private async reload() {
        this.data = await MyProfileService.getProfile()
    }

    async get() {
        if (!this.data) await this.update()
        return this.data!
    }

    async update(ms?: number) {
        await this.reload()
        if (ms) setInterval(() => this.update(), ms)
    }
}


class Avatar {
    private data: Blob | undefined

    private async reload() {
        this.data = await MyProfileService.getAvatar()
    }

    async get() {
        if (!this.data) await this.update()
        return this.data!
    }

    async update(ms?: number) {
        await this.reload()
        if (ms) setInterval(() => this.update(), ms)
    }
}


class Profile {

    data: ProfileData = new ProfileData()

    avatar: Avatar = new Avatar()

}


class AvailableCourses {

    private items: Dict<TCourseOut> | undefined

    private async reload() {
        this.items = await MyCoursesService.getAllAvailableCourses() as any
    }

    async all() {
        if (!this.items) await this.update()
        return this.items!
    }

    async get(course_id: string) {
        if (!this.items) await this.update()
        return this.items![course_id]
    }

    async update(ms?: number) {
        await this.reload()
        if (ms) setInterval(() => this.update(), ms)
    }
}


class EnrolledCourses {

    private items: Dict<TCourseOut> | undefined

    private async reload() {
        this.items = await MyCoursesService.getAllEnrolledCourses() as any
    }

    async all() {
        if (!this.items) await this.update()
        return this.items!
    }

    async get(course_id: string) {
        if (!this.items) await this.update()
        return this.items![course_id]
    }

    async update(ms?: number) {
        await this.reload()
        if (ms) setInterval(() => this.update(), ms)
    }
}


class Courses {

    available: AvailableCourses = new AvailableCourses()

    enrolled: EnrolledCourses = new EnrolledCourses()

}


class Lists {

    private items: Dict<TListOut> | undefined

    private async reload() {
        this.items = await MyListsService.getAllLists() as any
    }

    async all() {
        if (!this.items) await this.update()
        return this.items!
    }

    async get(list_id: string) {
        // cal fer-ho millor, perquè quan fas un get tens més detalls
        // ara funciona però els tipus no són correctes
        if (!this.items) await this.update()
        if (!this.items![list_id].items) {
            // aquí en pauek va fricar amb els estatus
            this.items![list_id] = await MyListsService.getList({ listKey: list_id })
        }
        return this.items![list_id]
    }

    async update(ms?: number) {
        await this.reload()
        if (ms) setInterval(() => this.update(), ms)
    }
}


class Problems {

    // TODO: decidir com es for fer això

    private items: Dict<TBasicAbstractProblemOut> | undefined

    private async reload() {
        this.items = await MyProblemsService.getAbstractProblems() as any
    }

    async all() {
        if (!this.items) await this.update()
        return this.items!
    }

    async get(problem_key: string) {
        if (!this.items) await this.update()
        if (!this.items) return undefined

        if (problem_key.includes('_')) {
            const problem_nm = problem_key.split('_')[0]
            for (const problem of this.items[problem_nm].problems) {
                if (problem.problem_id == problem_key) {
                    return problem
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


class JutgeObjectModel {

    compilers: Compilers = new Compilers()
    languages: Languages = new Languages()
    misc: Misc = new Misc()
    profile: Profile = new Profile()
    courses: Courses = new Courses()
    lists: Lists = new Lists()
    problems: Problems = new Problems()

    constructor() {
        OpenAPI.TOKEN = process.env.TOKEN
    }

    async load() {
        // TODO: carregar d'un JSON
    }

    async save() {
        // TODO: guardar a un JSON
    }
}


async function main() {
    const jom = new JutgeObjectModel()

    const compilers = await jom.compilers.all()
    console.log(Object.keys(compilers))

    const python = await jom.compilers.get('Python3')
    console.log(python)

    console.log(await jom.misc.fortune())
    console.log(await jom.misc.time())

    await jom.compilers.update()

    // autoupdate compilers each second:
    // jom.compilers.update(1000)

    console.log(await jom.profile.data.get())

    console.log(await jom.courses.enrolled.all())
    console.log(await jom.courses.enrolled.get("Jutge:Haskell"))

    console.log(await jom.lists.all())
    console.log(await jom.lists.get("Jutge:Haskell"))
    console.log(await jom.lists.get("Jutge:Haskell"))

    console.log(await jom.problems.all())
    console.log(await jom.problems.get("P99912"))
    console.log(await jom.problems.get("P99912_en"))
}


await main()
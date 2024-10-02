import {
    MiscService,
    StudentCoursesService,
    StudentListsService,
    StudentProblemsService,
    StudentProfileService,
    OpenAPI,
    TablesService,
    type TAbstractProblem,
    type TCompiler,
    type TCourse,
    type TLanguage,
    type TList,
    type TProfile,
    CancelablePromise,
    type TDriver,
    type TVerdict,
    type TProglang,
    type TCountry,
} from "./client"

type Dict<T> = Record<string, T>

type TableFetchFunc = () => CancelablePromise<Record<string, unknown>>

const TableClass = <T>(fetchFunc: TableFetchFunc) =>
    class {
        items: Map<string, T> | undefined

        async reload() {
            this.items = new Map(Object.entries((await fetchFunc()) as Dict<T>))
        }

        async ensureItems() {
            if (!this.items) {
                await this.reload()
            }
        }

        hasCache() {
            return this.items !== undefined
        }

        async all() {
            await this.ensureItems()
            return Object.fromEntries(this.items!)
        }

        async get(compiler_id: string) {
            await this.ensureItems()
            return this.items!.get(compiler_id)
        }
    }

class Languages extends TableClass<TLanguage>(TablesService.getLanguages) {}
class Countries extends TableClass<TCountry>(TablesService.getCountries) {}
class Compilers extends TableClass<TCompiler>(TablesService.getCompilers) {}
class Drivers extends TableClass<TDriver>(TablesService.getDrivers) {}
class Verdicts extends TableClass<TVerdict>(TablesService.getVerdicts) {}
class ProgLangs extends TableClass<TProglang>(TablesService.getProglangs) {}

class Misc {
    async fortune() {
        return (await MiscService.getFortune()).message
    }

    async time() {
        return await MiscService.getTime()
    }

    async ping() {
        return await MiscService.ping()
    }
}

class ProfileData {
    private data: TProfile | undefined

    private async reload() {
        this.data = await StudentProfileService.getProfile()
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
        this.data = await StudentProfileService.getAvatar()
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
    private items: Dict<TCourse> | undefined

    private async reload() {
        this.items = (await StudentCoursesService.getAvailableCourses()) as any
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
    private items: Dict<TCourse> | undefined

    private async reload() {
        this.items = (await StudentCoursesService.getEnrolledCourses()) as any
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
    private items: Dict<TList> | undefined

    private async reload() {
        this.items = (await StudentListsService.getLists()) as any
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
            this.items![list_id] = await StudentListsService.getList({
                listKey: list_id,
            })
        }
        return this.items![list_id]
    }

    async update(ms?: number) {
        await this.reload()
        if (ms) setInterval(() => this.update(), ms)
    }
}

class Problems {
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

export class JutgeObjectModel {
    misc: Misc = new Misc()

    countries: Countries = new Countries()
    languages: Languages = new Languages()
    compilers: Compilers = new Compilers()
    drivers: Drivers = new Drivers()
    verdicts: Verdicts = new Verdicts()
    proglangs: ProgLangs = new ProgLangs()

    profile: Profile = new Profile()
    courses: Courses = new Courses()
    lists: Lists = new Lists()
    problems: Problems = new Problems()

    constructor() {
        OpenAPI.TOKEN = process.env.JUTGE_TOKEN
    }

    async load() {
        // TODO: carregar d'un JSON
    }

    async save() {
        // TODO: guardar a un JSON
    }
}

import type {
    CancelablePromise,
    TCompiler,
    TCountry,
    TDriver,
    TLanguage,
    TProglang,
    TVerdict,
} from "./client"

import { TablesService } from "./client"

type TableFetchFunc = () => CancelablePromise<Record<string, unknown>>
type TableType =
    | "languages"
    | "countries"
    | "compilers"
    | "drivers"
    | "verdicts"
    | "proglangs"

const fetchFunc: Record<TableType, TableFetchFunc> = {
    languages: TablesService.getLanguages,
    countries: TablesService.getCountries,
    compilers: TablesService.getCompilers,
    drivers: TablesService.getDrivers,
    verdicts: TablesService.getVerdicts,
    proglangs: TablesService.getProglangs,
}

const TableClass = <T>(funcName: TableType) =>
    class {
        items: Map<string, T> | undefined

        async reload() {
            const func = fetchFunc[funcName]
            this.items = new Map(
                Object.entries((await func()) as Record<string, T>)
            )
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

export class Languages extends TableClass<TLanguage>("languages") {}
export class Countries extends TableClass<TCountry>("countries") {}
export class Compilers extends TableClass<TCompiler>("compilers") {}
export class Drivers extends TableClass<TDriver>("drivers") {}
export class Verdicts extends TableClass<TVerdict>("verdicts") {}
export class ProgLangs extends TableClass<TProglang>("proglangs") {}

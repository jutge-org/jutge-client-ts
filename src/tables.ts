import {
    CancelablePromise,
    TablesService,
    TCompiler,
    TCountry,
    TDriver,
    TLanguage,
    TProglang,
    TVerdict,
} from "./client"

type TableFetchFunc = () => CancelablePromise<Record<string, unknown>>

const TableClass = <T>(fetchFunc: TableFetchFunc) =>
    class {
        items: Map<string, T> | undefined

        async reload() {
            this.items = new Map(
                Object.entries((await fetchFunc()) as Record<string, T>)
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

export class Languages extends TableClass<TLanguage>(
    TablesService.getLanguages
) {}
export class Countries extends TableClass<TCountry>(
    TablesService.getCountries
) {}
export class Compilers extends TableClass<TCompiler>(
    TablesService.getCompilers
) {}
export class Drivers extends TableClass<TDriver>(TablesService.getDrivers) {}
export class Verdicts extends TableClass<TVerdict>(TablesService.getVerdicts) {}
export class ProgLangs extends TableClass<TProglang>(
    TablesService.getProglangs
) {}

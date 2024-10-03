import { StudentListsService, TList } from "./client"

export class Lists {
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
        if (!this.items) {
            await this.update()
        }
        // FIXME(pauek): So many "!"!!!
        if (!(this.items![list_id]!.items)) {
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

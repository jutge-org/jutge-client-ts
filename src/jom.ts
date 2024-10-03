import { OpenAPI } from "./client"

import { Courses } from "./courses"
import { Lists } from "./lists"
import { Misc } from "./misc"
import { Problems } from "./problems"
import { Profile } from "./profile"
import {
    Compilers,
    Countries,
    Drivers,
    Languages,
    ProgLangs,
    Verdicts,
} from "./tables"

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

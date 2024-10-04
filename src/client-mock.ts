import { mock } from "bun:test"

/*

NOTE(pauek):
We fully mock the client module, so we can test the JOM without
having to do any of the API calls, and ensuring we can test way faster.

*/

mock.module("./client", () => ({
    AuthService: {},
    OpenAPI: {},
    StudentCoursesService: {
        getAvailableCourses: async () => ({ courses: [] }),
        getEnrolledCourses: async () => ({ courses: [] }),
    },
    StudentListsService: {
        getLists: async () => ({ lists: [] }),
        getList: async () => ({ list: {} }),
    },
    MiscService: {
        hello: () => ({ message: "Hello World!" }),
        getFortune: async () => ({ message: "You will be successful" }),
        getTime: async () => ({ time: "2021-10-10T10:10:10Z", date: "2021-10-10" }),
        getHomepageStats: async () => ({ users: 100, problems: 1000, submissions: 234234 }),
        ping: async () => "",
    },
    StudentProblemsService: {
        getAbstractProblems: async () => ({ "X12345": [] }),
    },
    StudentProfileService: {
        getProfile: async () => ({ nickname: "pauek" }),
        getAvatar: async () => new Blob(),
    },
    TablesService: {
        getLanguages: async () => ({ ca: { hello: true } }),
        getCountries: async () => ({ cat: { yay: 13 } }),
        getCompilers: async () => ({ py: { ext: ".py" } }),
        getDrivers: async () => ({ std: { driver_id: "std" } }),
        getVerdicts: async () => ({ AC: { verdict_id: "AC" } }),
        getProglangs: async () => ({ C: { proglang_id: "C" } }),
    },
}))

import { expect, test, beforeAll } from "bun:test";
import JutgeObjectModel from './jom';
import { OpenAPI } from './client';

let jom: JutgeObjectModel;

beforeAll(() => {
    // Set up the OpenAPI token
    OpenAPI.TOKEN = process.env.JUTGE_TOKEN;
    if (!OpenAPI.TOKEN) {
        throw new Error("TOKEN environment variable is not set");
    }
    jom = new JutgeObjectModel();
});

test('compilers.all()', async () => {
    const compilers = await jom.compilers.all();
    expect(Object.keys(compilers).length).toBeGreaterThan(0);
});

test('compilers.get()', async () => {
    const compiler = await jom.compilers.get('Python3');
});

test('languages.all()', async () => {
    const languages = await jom.languages.all();
});

test('languages.get()', async () => {
    const language = await jom.languages.get('Python');
});

test('misc.fortune()', async () => {
    const fortune = await jom.misc.fortune();
    expect(typeof fortune).toBe('string');
    expect(fortune.length).toBeGreaterThan(0);
});

test('misc.time()', async () => {
    const time = await jom.misc.time();
});

test('profile.data.get()', async () => {
    const profile = await jom.profile.data.get();
});

test('profile.avatar.get()', async () => {
    const avatar = await jom.profile.avatar.get();
});

test('courses.available.all()', async () => {
    const courses = await jom.courses.available.all();
});

test('courses.available.get()', async () => {
    const courses = await jom.courses.available.all();
    const courseId = Object.keys(courses)[0];
    const course = await jom.courses.available.get(courseId);
});

test('courses.enrolled.all()', async () => {
    const courses = await jom.courses.enrolled.all();
    expect(Object.keys(courses).length).toBeGreaterThan(0);
    const firstCourse = Object.values(courses)[0];
});

test('courses.enrolled.get()', async () => {
    const courses = await jom.courses.enrolled.all();
    const courseId = Object.keys(courses)[0];
    const course = await jom.courses.enrolled.get(courseId);
});

test('lists.all()', async () => {
    const lists = await jom.lists.all();
    expect(Object.keys(lists).length).toBeGreaterThan(0);
    const firstList = Object.values(lists)[0];
});

test('lists.get()', async () => {
    const lists = await jom.lists.all();
    const listId = Object.keys(lists)[0];
    const list = await jom.lists.get(listId);
});

test('problems.all()', async () => {
    const problems = await jom.problems.all();
    expect(Object.keys(problems).length).toBeGreaterThan(0);
    const firstProblem = Object.values(problems)[0];
});

test('problems.get()', async () => {
    const problems = await jom.problems.all();
    const problemId = Object.keys(problems)[0];
    const problem = await jom.problems.get(problemId);
});

test('JutgeObjectModel constructor', () => {
    expect(jom).toBeInstanceOf(JutgeObjectModel);
});

# jutge-client-ts

## Proposal

We potentially would want to perform calls like the following:

```typescript
jom: JutgeObjectModel = JutgeObjectModel();

// Tables
const langs: Language[] = await jom.tables.languages;
const countries: Country[] = await jom.tables.countries;
const compilers: Compiler[] = await jom.tables.compilers;
const drivers: Driver[] = await jom.tables.drivers;
const veredicts: Veredict[] = await jom.tables.veredicts;

// Auth
const token: str = await jom.auth.login('username', 'password');
const is_valid_token: bool = await jom.auth.check_token()
const logout: bool = await jom.auth.logout();

// User profile
const profile: Profile = await jom.user.profile;
const avatar: File = await jom.user.avatar;

// Courses
const courses: Course[] = await jom.user.courses;
const all_available: Course[] = await jom.user.courses.available;
const one_available: Course = await jom.user.courses.available('course_id');
const all_enrolled: Course[] = await jom.user.courses.enrolled;
const one_enrolled: Course = await jom.user.courses.enrolled('course_id');
// Potentially, const one_course: Course = await jom.user.courses('course_id');

// Lists
const all_lists: List[] = await jom.user.lists;
const course_lists: List[] = await jom.user.courses.enrolled('course_id').lists;
const one_list: List = await jom.user.lists('list_id');

// Problems
const all_abstract_problems: AbstractProblem[] = await jom.user.problems;
const one_abstract_problem: AbstractProblem = await jom.user.problems('problem_nm');
const one_problem: Problem = await jom.user.problems('problem_id');
const sample_testcases: Testcase[] = await jom.user.problems('problem_id').testcases.sample;
const public_testcases: Testcase[] = await jom.user.problems('problem_id').testcases.public;
const statement: str | File | Blob = await jom.user.problems('problem_id').statement.html; // or text/md/pdf/zip
// but also
const list_problems: AbstractProblem[] = await jom.user.lists('list_id').problems;
const course_problems: AbstractProblem[] = await jom.user.courses.enrolled('course_id').lists('list_id').problems;


// Submissions
const all_submissions: Submission[] = await jom.user.submissions;
const problem_submissions: Submission[] = await jom.user.problems('problem_id').submissions;
const one_submission: Submission = await jom.user.submissions('submission_id'); // or jom.user.problems('problem_id').submissions('submission_id')
const submit: str = await jom.user.problems('problem_id').submit('source_code', 'compiler_id', 'lang_id', 'driver_id');
```

> [!WARNING]  
> The **big problem** is that async getters are [not supported](https://github.com/microsoft/TypeScript/issues/14982) in Typescript, meaning we cannot have `jom.user.problems` return a promise for a list of problems and be "awaitable", also I think the pattern `(await jom.user.problems).someOtherMethod` is a weird API.

### Solution 1

API looks like `jom.user.problems.all()` and you do `await jom.user.problems.all()`, this is similar to Jordi's proposal.
Then you can also do `jom.user.problems.get('problem_id')`. 
The problem with this is that the calls can get very long (e.g. `jom.user.courses.enrolled.get('course_id').lists.get('list_id').problems.all()`

### Solution 2

API looks like `jom.user.getProblems()`, similar to how the openapi-ts client does it now.
Then you can also do `jom.user.getProblem('problem_id')` (note plural vs singular to get multiple vs single problem).
Then, in comparison to the previous solution, you can do `jom.user.getCourse('course_id').getList('list_id').getProblems()`
The problem with this is that `user` might be superfluous, we can just do `jom.getProblems()` and `jom.getProblem('problem_id')` and `jom.getCourse('course_id').getList('list_id')`.

## Other desirable features

1. Handle caching of API calls
   - Current prevailing option: In a sqlite database
2. Strong typing and validation of function inputs and API responses


## Package installation

To install dependencies and generate the client:
```bash
bun install
bun generate-client
```

To run tests:
```bash
bun test
```

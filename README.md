# jutge-client-ts

## Docs

We want to be able to perform the following calls (following api docs):

```typescript

jom: JutgeObjectModel = JutgeObjectModel();

// Tables
const langs = jom.tables.languages;
const countries = jom.tables.countries;
const compilers = jom.tables.compilers;
const drivers = jom.tables.drivers;
const veredicts = jom.tables.veredicts;

// Auth
const token = jom.auth.login('username', 'password');
const is_valid_token = jom.auth.check_token(token)
const logout = jom.auth.logout(token);

// User profile
const profile = jom.user.profile;
const avatar = jom.user.avatar;

// Courses
const courses = jom.user.courses;
const all_available = jom.user.courses.available;
const one_available = jom.user.courses.available('course_id');
const all_enrolled = jom.user.courses.enrolled;
const one_enrolled = jom.user.courses.enrolled('course_id');

// Lists
const all_lists = jom.user.lists;
const course_lists = jom.user.courses.enrolled('course_id').lists;
const one_list = jom.user.lists('list_id');

// Problems
const all_abstract_problems = jom.user.problems;
const one_abstract_problem = jom.user.problems('problem_nm');
const one_problem = jom.user.problems('problem_id');
const sample_testcases = jom.user.problems('problem_id').testcases.sample;
const public_testcases = jom.user.problems('problem_id').testcases.public;
const statement = jom.user.problems('problem_id').statement.html; // or text/md/pdf/zip

// Submissions
const all_submissions = jom.user.submissions;
const problem_submissions = jom.user.problems('problem_id').submissions;
const one_submission = jom.user.submissions('submission_id'); // or jom.user.problems('problem_id').submissions('submission_id')
const submit = jom.user.problems('problem_id').submit('source_code', 'compiler_id', 'lang_id', 'driver_id');
```

## Installation

To install dependencies and generate the client:
```bash
bun install
bun generate-client
```

To run tests:
```bash
bun test
```

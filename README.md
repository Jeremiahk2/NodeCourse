# NodeCourse
Learning project for Node, Jest, Typescript


# Section Two:
I used the following command to make the initial package.json file:
npm init -y

I used the following command to make the package-lock.json and everything in node_modules:
npm i -D typescript jest ts-jest @types/jest ts-node

Then I used the following command to get the jest.config.js file:
npx ts-jest config:init
I then deleted that file because apparently it's not needed anymore.

Instead, use jest.config.ts

Structure:
AAA principles:
- arrange
- act
- assert

Setup
Teardown

# Section Three

## F.I.R.S.T principles. 
Note: these may conflict, and are "suggested guidelines"

- Fast: Faster feedback, faster to read, etc.
- Isolated: Isolated from other tests as well as external environment. Order shouldn't matter.
- Repeatable: Same result with same input. Mocks are useful here. Make sure to setup and cleanup.
- Self-Validating: After the test is finished, the result should be clear: Pass or fail
- Thorough: Tests should be thorough, cover all cases/paths/scenarios.

## aliases

describe.todo('Need to do this one')
describe.concurrent: experimental? feature. Run tests at the same time.
it() and test() are the same thing.

xit = it.skip
fit = it.only

## Watch mode:
In package.json, add --watch to the scripts; "jest --watch" to run with watch mode.
Then, whenever you save something in the watched files, it will re-run your tests automatically. 
It will also give you some command line options for running your tests again quickly.

## Debugging

Go to https://github.com/microsoft/vscode-recipes

Go to the debugging-jest-tests directory

In the readme, grab the configuration(s) for "Jest Current File" or "Jest All". We used Jest Current File.

Go to the run and debug tab, click "make a new configuration file", and overwrite it with the config you want. It'll put it in launch.json.

Make sure to change anything with .js to .ts

## Coverage

/* istanbul ignore next */
This comment causes the next line to be ignored by the coverage tool. You can use this to ignore functions, methods, lines, or classes.

Small note: to collect coverage, you need the collectCoverage and collectCoverageFrom configurations in jest.config.ts
These take time to run, so if you are done testing, it's a good idea to remove them.

# Section Four

## Password invalid requirements
- Length is less than 8 chars
- has no upper case letter
- has no lower case letter
- Return the reason that the password is invalid
- Admin password should also contain a number

# Section Five

## Test Doubles
Pretend objects used in place of a real object for testing purposes
- Dummy objects: passed around but not used
- Fakes: simplified working implementation, it takes a shortcut
- Stubs: incomplete objects used as arguments
- Spies: tracks information about how a unit is called
- Mocks: preprogrammed with expectations
Note for jest: mocks and spies have a lot in common

Spies vs mocks:
- Spies are not directly injected into SUT
- Original functionality is preserved with spies
- Spies usually track method calls

## Mocking modules
For random ID's, run the following commands:
npm i uuid
npm i -D @types/uuid

# Section Seven

Low mocks advantage:
- Test more with less code
- Easier to write and read
- Easier to maintain
Disadvantages:
- Hard to cover some edge cases
- Hard to setup in some cases
+ an ideal workflow was presented in this course
+ instad of DB mock, we may have a docker container
+ other services may have to be dockerized
+ CI/CD point of view: a lot more configuration is required.

# Section Eight - Integration testing

Multiple components tested together
in the previous part we considered a route to be a unit
There will still be mocked components:
- Data
- Server

Goal: Test the system as close as possible to the real deployment
Testing stage - identical t othe production stage
- run it locally or remotely

# Section Nine
Snapshot testing:
- test large objects
- test UI components, generated logic(JSON)

Jest: run tests, mock, assert

Mocha: test
    SinonJs: mock
    Chai: assert

Jest advantages:
- one library
- easy TS integration
- popular (better support)
- test UI features (React)

Mocha advantages:
- more complex features
- when(certainCall).thenReturn(certainResult)

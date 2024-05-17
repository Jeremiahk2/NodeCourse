import type { Config } from '@jest/types'

const baseDir = '<rootDir>/src/app/pass_checker';
const testDir = '<rootDir>/src/test/pass_checker';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        `${baseDir}/**/*.ts`
    ],
    testMatch: [
        `${testDir}/**/*.ts`
    ]
}

export default config;
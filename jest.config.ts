import type { Config } from '@jest/types'

const baseDir = '<rootDir>/src/app/server_app';
const testDir = '<rootDir>/src/test/';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        `${baseDir}/**/*.ts`
    ],
    testMatch: [
        `${testDir}/server_app/**/*.test.ts`,
        `${testDir}/server_app2/**/*.test.ts`
    ],
    setupFiles: [
        '<rootDir>/src/test/server_app3/utils/config.ts'
    ]
}

export default config;
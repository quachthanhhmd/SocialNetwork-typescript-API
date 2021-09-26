/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */


module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    TYPE: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/environments', 'src/app.ts', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"]
};
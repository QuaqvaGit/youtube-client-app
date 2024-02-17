import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  roots: ['<rootDir>'],
  moduleDirectories: ['src', 'node_modules'],
  modulePaths: ['<rootDir>'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
};

export default config;

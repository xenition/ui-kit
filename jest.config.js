/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  // Theme/compiler tests run in node; component specs opt into jsdom with a
  // `@jest-environment jsdom` docblock at the top of the file.
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.spec.ts', '<rootDir>/src/**/*.spec.tsx'],
};

/** @type {import('jest').Config} */
module.exports = {
  // Two isolated jest projects run under one `npm test`:
  //  - `web`    → theme/compiler tests (node) + web component specs (jsdom via
  //               a `@jest-environment jsdom` docblock), transformed by ts-jest.
  //  - `native` → React Native component specs (`*.native.spec.tsx`) under the
  //               `react-native` preset (babel-jest + RN test environment).
  projects: [
    {
      displayName: 'web',
      preset: 'ts-jest',
      // Theme/compiler tests run in node; component specs opt into jsdom with a
      // `@jest-environment jsdom` docblock at the top of the file.
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/*.spec.ts', '<rootDir>/src/**/*.spec.tsx'],
      // Native specs share the `.spec.tsx` suffix; keep them out of the web run.
      testPathIgnorePatterns: ['/node_modules/', '\\.native\\.spec\\.tsx$'],
    },
    {
      displayName: 'native',
      preset: 'react-native',
      testMatch: ['<rootDir>/src/**/*.native.spec.tsx'],
      setupFilesAfterEnv: ['<rootDir>/src/native/spec-support/setup.ts'],
      moduleNameMapper: {
        // Optional peer dep — mocked so native specs need no Expo native runtime.
        '^expo-linear-gradient$':
          '<rootDir>/src/native/spec-support/expo-linear-gradient.mock.tsx',
        // Optional peer dep for SVG charts — mocked to plain host views in tests.
        '^react-native-svg$':
          '<rootDir>/src/native/spec-support/react-native-svg.mock.tsx',
        // Optional peer dep for safe-area insets — mocked to fixed insets in tests.
        '^react-native-safe-area-context$':
          '<rootDir>/src/native/spec-support/react-native-safe-area-context.mock.tsx',
      },
    },
  ],
};

/**
 * Native jest project setup. `@testing-library/react-native` registers its own
 * auto-cleanup on import; this file exists as the shared hook for native specs
 * (e.g. resetting the mocked reduced-motion preference between tests).
 */
import '@testing-library/react-native';
import { AccessibilityInfo } from 'react-native';

// Default every test to "reduced motion OFF" so animated components take their
// animated path unless a test opts into reduced motion explicitly.
beforeEach(() => {
  jest
    .spyOn(AccessibilityInfo, 'isReduceMotionEnabled')
    .mockResolvedValue(false);
});

afterEach(() => {
  jest.restoreAllMocks();
});

/**
 * Babel is used ONLY by the native jest project (the `react-native` preset
 * transforms `.tsx` via babel-jest). The web project runs on `ts-jest`, which
 * ignores this file entirely, and the library ships from `tsc` (`npm run
 * build`) — babel is never in the production build path.
 */
module.exports = {
  presets: ['module:@react-native/babel-preset'],
};

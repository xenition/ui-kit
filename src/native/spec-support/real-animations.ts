// Opt a native spec OUT of the synchronous-settle of `Animated.timing`/`spring`
// that `setup.ts` installs by default. Import this at the TOP of a spec (before
// any `render`) when the test asserts animation WHILE IT IS IN FLIGHT — a chart
// drawing its arc, a counter ticking up, a sheet sliding — and therefore needs
// the real, time-driven animation (typically with `jest.useFakeTimers()` +
// `advanceTimersByTime`, or `waitFor`).
//
//   import '../spec-support/real-animations';
//
// It flips a global flag that `setup.ts` reads in its `beforeEach`. `setup.ts`
// resets the flag to `false` for every file before the file's body runs, so the
// opt-in is scoped to the importing spec and never leaks to another file.
(globalThis as { __XEN_REAL_ANIMATIONS__?: boolean }).__XEN_REAL_ANIMATIONS__ = true;

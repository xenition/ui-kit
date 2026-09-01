import '@testing-library/react-native';
import { AccessibilityInfo, Animated } from 'react-native';

// Every native test file resets this to `false` before the file's own module
// body runs. A spec that asserts *in-flight* animation opts back into real
// timing/spring by importing `./real-animations`, which flips it to `true`.
// See the `beforeEach` below and the `real-animations` helper for the why.
(globalThis as { __XEN_REAL_ANIMATIONS__?: boolean }).__XEN_REAL_ANIMATIONS__ = false;

/**
 * A thenable that settles **inline** rather than on a microtask.
 *
 * `useReducedMotion` reads the OS setting through
 * `AccessibilityInfo.isReduceMotionEnabled()` and calls `setReduced` in the
 * `.then`. With a real promise — which is what `mockResolvedValue` hands back —
 * that callback runs on a microtask, i.e. *after* `render()` has returned and
 * after RNTL's `act()` has already exited. React then logs
 *
 *   Warning: An update to <Component> inside a test was not wrapped in act(...)
 *
 * and, more seriously, the update is left in flight past the end of the test:
 * on a slow runner it can land after the test environment has been torn down,
 * which is one of the ways a suite whose tests all pass still leaves the worker
 * unable to exit. Settling inline keeps that state update inside the mount's
 * own `act()`, where it belongs.
 *
 * Only the members `useReducedMotion` actually chains are implemented, plus
 * `finally` so an `await` on it behaves.
 */
function settledWith<T>(value: T): Promise<T> {
  const thenable = {
    then(onFulfilled?: ((v: T) => unknown) | null) {
      return settledWith(onFulfilled ? (onFulfilled(value) as T) : value);
    },
    catch() {
      // Nothing to catch — this thenable never rejects.
      return settledWith(value);
    },
    finally(onFinally?: (() => void) | null) {
      onFinally?.();
      return settledWith(value);
    },
  };
  return thenable as unknown as Promise<T>;
}

// --- Animations are settled synchronously in tests -------------------------
//
// In jest there is no native driver, so every `Animated` animation is driven by
// JS timers / `requestAnimationFrame`. Those frames fire on LATER ticks — after
// the mount's `act()` has already returned — so any component that starts an
// animation on mount (`Switch`, the charts, `Drawer`, `Accordion`, and the
// shared `useEnter`/`usePressScale` hooks, …) lands a state update outside
// `act`, which React reports as
//
//   Warning: An update to Animated(View) inside a test was not wrapped in act(...)
//
// and leaves a queued frame behind. `Switch` and `Card` alone sit inside most of
// the ~700 domain components, so rendered across two theme seeds those warnings
// flood `console.error` and the orphaned frames pile up. On a memory-constrained
// CI worker the buffering + GC thrash slows the run to a crawl (~12 min between
// specs) until the 30-minute step timeout kills it, and a frame that fires after
// its file's environment is torn down is recorded as an "access … after it has
// been torn down" error that fails the whole run with exit 1 — all while the same
// suite runs green locally, which is why it only ever bit in CI.
//
// So by default we settle finite `timing`/`spring` **synchronously**: `.start()`
// jumps the target Value straight to its numeric `toValue` (inside the caller's
// own `act`, so no outside-act update and no orphaned frame) and calls the
// completion callback. A finite animation only ever ends at `toValue`, so the
// final rendered state every mount-and-assert spec observes is unchanged — the
// value just gets there in one frame instead of many. `sequence`/`parallel`/
// `stagger` are left real: they drive their children only through the public
// `.start`/`.stop` interface, so with synchronous children they complete
// synchronously too. `loop` is kept fully INERT (no-op `start`): its motion is
// decorative and, crucially, a real `loop` around a now-synchronous child would
// restart forever in a tight synchronous stack.
//
// The handful of specs that assert motion WHILE IT IS IN FLIGHT (charts drawing
// their arc, counters ticking up, sheets/modals sliding) import `./real-
// animations` to flip `__XEN_REAL_ANIMATIONS__`, which skips the timing/spring
// swap for that file and lets them advance timers against the real animation.
const inertLoop = { start() {}, stop() {}, reset() {} } as unknown as Animated.CompositeAnimation;

type AnimValue = { setValue?: (v: number) => void };
type AnimConfig = { toValue?: unknown };

function settleInline(value: AnimValue, config: AnimConfig): Animated.CompositeAnimation {
  return {
    start(callback?: (result: { finished: boolean }) => void) {
      // Only a numeric end-value can be applied directly; a Value-driven toValue
      // (rare, e.g. tracking) is left alone — snapping still leaks no timer.
      if (typeof config?.toValue === 'number' && typeof value?.setValue === 'function') {
        value.setValue(config.toValue);
      }
      callback?.({ finished: true });
    },
    stop() {},
    reset() {},
  } as unknown as Animated.CompositeAnimation;
}

beforeEach(() => {
  jest
    .spyOn(AccessibilityInfo, 'isReduceMotionEnabled')
    .mockImplementation(() => settledWith(false));
  jest.spyOn(Animated, 'loop').mockReturnValue(inertLoop);

  if (!(globalThis as { __XEN_REAL_ANIMATIONS__?: boolean }).__XEN_REAL_ANIMATIONS__) {
    jest
      .spyOn(Animated, 'timing')
      .mockImplementation((value, config) => settleInline(value as AnimValue, config as AnimConfig));
    jest
      .spyOn(Animated, 'spring')
      .mockImplementation((value, config) => settleInline(value as AnimValue, config as AnimConfig));
  }
});

afterEach(() => {
  jest.restoreAllMocks();
});

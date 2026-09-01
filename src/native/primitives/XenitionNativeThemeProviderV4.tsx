import * as React from 'react';
import { AccessibilityInfo } from 'react-native';
import {
  DesignLineProvider,
  XenitionNativeThemeProvider,
  type DesignLine,
  type XenitionNativeThemeProviderProps,
} from '../theme';

/**
 * The OS "Reduce Motion" preference, resolved once for a whole tree.
 *
 * `resolved` is not decoration: it is the difference between "the OS says
 * motion is fine" and "the OS has not answered yet". A component that starts
 * an entry animation on the strength of an unanswered question is the defect
 * this provider exists to fix, so the two states are kept distinguishable
 * rather than collapsed into one boolean.
 */
export interface XenitionNativeMotionPreference {
  /**
   * `true` when animation should be suppressed. Before the OS has answered
   * this reads `true`, not `false` — see {@link XenitionNativeThemeProviderV4}.
   */
  reducedMotion: boolean;
  /** `false` only during the first tick, before `AccessibilityInfo` answers. */
  resolved: boolean;
}

/**
 * Internal wiring, exported because `internal/useReducedMotion.ts` reads it to
 * decide whether a V4 root is holding the subscription. `null` means no V4
 * provider is mounted, and every hook falls back to its own listener.
 *
 * Prefer {@link useXenitionMotionPreference} in app code.
 */
export const XenitionNativeMotionContext =
  React.createContext<XenitionNativeMotionPreference | null>(null);

export interface XenitionNativeThemeProviderV4Props extends XenitionNativeThemeProviderProps {
  /**
   * Force the motion preference instead of reading the OS. Skips the
   * `AccessibilityInfo` read AND the listener entirely — for screenshot tests,
   * a gallery, or an app that ships its own "reduce animation" setting and
   * wants the kit to follow it rather than the system toggle.
   */
  reducedMotion?: boolean;
  /**
   * Hold `children` unmounted until the motion preference is known. Default
   * `true`, and that default IS the fix: the OS read is asynchronous, so a
   * tree mounted before it lands has already played its entry animations by
   * the time the answer arrives.
   *
   * The wait is one microtask on a real device, not a frame budget, and the
   * theme provider above stays mounted throughout so nothing remounts when the
   * gate lifts. Set `false` if the app already gates its own first paint (a
   * splash screen, a font load) and wants the tree mounted immediately;
   * `reducedMotion` then reads `true` until the answer lands, so a
   * reduce-motion user still never sees a frame of movement.
   */
  gateFirstPaint?: boolean;
  /**
   * The design line for `designed()` families below this provider. Defaults to
   * `'v4'` — a V4 root means a V4 app — and `resolveDesign` walks down for any
   * family that has not caught up. Pass a line explicitly to opt out.
   */
  design?: DesignLine;
}

/** Not-yet-answered: suppress motion, and say so. */
const UNRESOLVED: XenitionNativeMotionPreference = { reducedMotion: true, resolved: false };

/**
 * **V4 root provider** — a superset of {@link XenitionNativeThemeProvider},
 * with no visual output of its own. It takes the same `theme` / `scheme` props
 * and composes the base provider verbatim, so `useXenitionTheme()` works
 * underneath exactly as it does today: same seed compilation, same
 * `scheme ?? (seed.mode === 'dark' ? 'dark' : 'light')` default, same context.
 *
 * What it adds is the thing 34 V4 components were each doing for themselves.
 * `useReducedMotion()` reads `AccessibilityInfo` per call site, which means a
 * screen with twenty V4 components holds twenty duplicate OS listeners and
 * makes twenty duplicate async reads — but the waste is the small half of the
 * problem. The hook starts at `false` (motion ON) and only flips once its
 * promise resolves, so on a device with Reduce Motion enabled **the entry
 * animations play once, on first mount, before the real value arrives.** That
 * is an accessibility defect: design.md §36.10 and every V4 component's
 * reduced-motion branch are load-bearing precisely for the users who then see
 * the animation anyway.
 *
 * So this provider resolves the preference once, for the whole tree, and holds
 * the first paint until it has an answer. Two invariants follow, and both are
 * deliberate:
 *
 * 1. **It never reports motion-on before it knows.** The pre-answer value is
 *    `reducedMotion: true`. Guessing wrong in that direction costs a
 *    non-reduce-motion user at most one skipped entry animation; guessing
 *    wrong in the other direction is the defect above.
 * 2. **One listener, one read.** Every `useReducedMotion()` below this
 *    provider reads the context instead of subscribing, so mounting fifty
 *    animated components costs one `reduceMotionChanged` subscription. With no
 *    V4 provider mounted the hook is byte-for-byte what it always was.
 *
 * Nothing else is hoisted here. The OS motion toggle is the only per-component
 * recomputation in the native layer worth centralising — appearance, elevation
 * and the state layers are pure functions of tokens the base already provides,
 * and moving them would buy nothing but surface.
 *
 * ```tsx
 * <XenitionNativeThemeProviderV4 theme={seed} scheme={useColorScheme() ?? undefined}>
 *   <App />
 * </XenitionNativeThemeProviderV4>
 * ```
 */
export function XenitionNativeThemeProviderV4({
  theme,
  scheme,
  reducedMotion,
  gateFirstPaint = true,
  design = 'v4',
  children,
}: XenitionNativeThemeProviderV4Props): React.ReactElement {
  // `null` until AccessibilityInfo answers. Kept separate from the forced prop
  // so toggling the prop back to `undefined` re-reads the OS rather than
  // stranding the tree on a stale forced value.
  const [observed, setObserved] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // An explicit `reducedMotion` means the app owns the answer: no OS read,
    // no listener, nothing to clean up.
    if (reducedMotion !== undefined) return;

    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((value) => {
        if (mounted) setObserved(value);
      })
      .catch(() => {
        // Older platforms may reject. Treat as motion-on — matching the
        // standalone hook — and resolve, so the gate can never hang on a
        // platform that simply has no answer to give.
        if (mounted) setObserved(false);
      });

    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', (value: boolean) =>
      setObserved(value)
    );

    return () => {
      mounted = false;
      // RN >= 0.65 returns a subscription with `.remove()`.
      sub?.remove?.();
    };
  }, [reducedMotion]);

  const motion = React.useMemo<XenitionNativeMotionPreference>(() => {
    if (reducedMotion !== undefined) return { reducedMotion, resolved: true };
    if (observed === null) return UNRESOLVED;
    return { reducedMotion: observed, resolved: true };
  }, [reducedMotion, observed]);

  const gated = gateFirstPaint && !motion.resolved;

  return (
    <XenitionNativeThemeProvider theme={theme} scheme={scheme}>
      <DesignLineProvider design={design}>
        <XenitionNativeMotionContext.Provider value={motion}>
          {gated ? null : children}
        </XenitionNativeMotionContext.Provider>
      </DesignLineProvider>
    </XenitionNativeThemeProvider>
  );
}

/**
 * The tree's resolved motion preference.
 *
 * Throws outside a {@link XenitionNativeThemeProviderV4}, matching
 * `useXenitionTheme()`: a screen that branches on `resolved` is asking a
 * question only this provider can answer, and a silent default would hand it a
 * confident-looking lie. Components that only need the boolean should keep
 * calling `useReducedMotion()`, which works with or without a V4 root.
 */
export function useXenitionMotionPreference(): XenitionNativeMotionPreference {
  const value = React.useContext(XenitionNativeMotionContext);
  if (value === null) {
    throw new Error(
      'useXenitionMotionPreference must be used inside <XenitionNativeThemeProviderV4 theme={...}>.'
    );
  }
  return value;
}

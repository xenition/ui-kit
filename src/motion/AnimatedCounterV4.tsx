import * as React from 'react';
import { usePrefersReducedMotion } from './internal/reduced-motion';
import { useInView } from './internal/use-in-view';
import { V4_MOTION } from '../primitives/internal/v4-motion';

export interface AnimatedCounterV4Props
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Final value. */
  to: number;
  /** Starting value. */
  from?: number;
  /** Count duration in ms. See {@link COUNT_MS} for why this one is not on the scale. */
  duration?: number;
  /** Formats the current value for display. Defaults to rounded `toLocaleString()`. */
  format?: (value: number) => string;
  /** IntersectionObserver threshold. */
  threshold?: number;
}

/**
 * The default count duration, in ms — **deliberately not from the scale**.
 *
 * Brief §2 draws the line this constant sits on. The M3 scale governs a
 * *transition*: a thing moving from one state to another, where the duration is
 * a property of the interface. A counter is *playback*: the duration is a
 * property of the content. A count from 0 to 12 and a count from 0 to 4,000,000
 * are not the same event, and forcing both onto `enter` (400ms) would make the
 * first feel frantic and the second illegible. So the number stays a caller
 * decision and this is only a starting point — the base's 1500, kept because it
 * is defensible and because the native twin has to agree with it (rule 4).
 *
 * The **easing** is a different question and does come from the scale: see the
 * component note.
 */
export const COUNT_MS = 1500;

const defaultFormat = (value: number): string => Math.round(value).toLocaleString('en-US');

/**
 * Evaluate a CSS-style cubic Bézier as a JS easing function.
 *
 * The base used `easeOutCubic` — a fourth curve, invented here, in a line that
 * already had three too many (`v4-motion.ts`'s opening paragraph). The scale
 * publishes its curves as control-point quadruples precisely so both platforms
 * can spell the same arc: CSS gets `cubic-bezier(...)` and React Native gets
 * `Easing.bezier(...)`. A `requestAnimationFrame` loop gets neither, so it
 * solves the same polynomial by hand.
 *
 * Newton–Raphson on x, falling back to bisection when the derivative is flat
 * (the standard approach, and what browsers do internally). Eight iterations is
 * well past visual convergence at 60fps.
 */
function bezierEasing(
  points: readonly [number, number, number, number]
): (t: number) => number {
  const [x1, y1, x2, y2] = points;
  const curve = (a: number, b: number, t: number): number => {
    // Expanded cubic Bézier with P0 = 0 and P3 = 1.
    const c = 3 * a;
    const bb = 3 * (b - a) - c;
    const aa = 1 - c - bb;
    return ((aa * t + bb) * t + c) * t;
  };
  const slope = (a: number, b: number, t: number): number => {
    const c = 3 * a;
    const bb = 3 * (b - a) - c;
    const aa = 1 - c - bb;
    return (3 * aa * t + 2 * bb) * t + c;
  };

  return (x: number): number => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i += 1) {
      const error = curve(x1, x2, t) - x;
      const d = slope(x1, x2, t);
      if (Math.abs(error) < 1e-5) break;
      if (Math.abs(d) < 1e-6) {
        // Flat derivative: bisect the remaining interval instead.
        let lo = 0;
        let hi = 1;
        for (let j = 0; j < 20; j += 1) {
          t = (lo + hi) / 2;
          if (curve(x1, x2, t) < x) lo = t;
          else hi = t;
        }
        break;
      }
      t -= error / d;
    }
    return curve(y1, y2, t);
  };
}

/** M3 emphasized-decelerate — the same curve `EASE_ENTER` spells for CSS. */
const easeEnter = bezierEasing(V4_MOTION.easingEnter);

/**
 * **V4 animated counter** — same props as {@link AnimatedCounter}, with the
 * kit's arrival curve and a screen reader that is not read four thousand
 * numbers.
 *
 * 1. **The easing comes from the scale; the duration does not.** Brief §2 rules
 *    that the scale governs transitions, not playback, and a counter is
 *    playback with an easing on it. The duration therefore stays the caller's
 *    (see {@link COUNT_MS}) while the curve becomes M3's emphasized-decelerate
 *    — a number arriving at its value is an arrival — replacing the
 *    hand-written `easeOutCubic` the base carried. The native twin gets the
 *    identical arc from `EASING_ENTER`, which is the same four control points
 *    handed to `Easing.bezier`.
 * 2. **The value is announced once, at the end.** The base said nothing to
 *    assistive tech at all — and the naive fix is worse than the silence: a
 *    counter re-rendering sixty times a second inside a polite live region is
 *    a screen reader reading hundreds of intermediate numbers, and it is
 *    exactly the case `aria-live="off"` exists for. So the ticking text is
 *    `aria-hidden` — it is decoration, and the number it shows is wrong for all
 *    but the last frame of its life — and a visually hidden polite region,
 *    empty until the count completes, carries the one value that was ever true:
 *    "4,182", once. Under reduced motion it is populated on the first render,
 *    because that is when the value becomes true.
 *
 * Reduced motion keeps the base's behaviour and does **not** take brief §3
 * rule 3's fade: that rule replaces a *spatial move* with a fade so nothing
 * appears without a transition. Nothing appears here — the element is on screen
 * throughout and only its text changes — so the honest reduction is to skip the
 * playback and show the final value, which is also what the number is for.
 *
 * SSR-safe: with no `IntersectionObserver` the counter is treated as in view,
 * so the value counts (or, on the server, renders at `from` and counts on
 * hydration) rather than sitting at its start forever.
 */
export const AnimatedCounterV4 = React.forwardRef<HTMLSpanElement, AnimatedCounterV4Props>(
  function AnimatedCounterV4(
    { to, from = 0, duration = COUNT_MS, format = defaultFormat, threshold = 0.5, ...rest },
    forwardedRef
  ) {
    const localRef = React.useRef<HTMLSpanElement>(null);
    React.useImperativeHandle(forwardedRef, () => localRef.current as HTMLSpanElement);

    const reduced = usePrefersReducedMotion();
    const inView = useInView(localRef, { threshold, once: true, disabled: reduced });
    const [value, setValue] = React.useState(from);
    const [settled, setSettled] = React.useState(false);

    React.useEffect(() => {
      if (!inView && !reduced) return undefined;
      if (reduced || duration <= 0) {
        setValue(to);
        setSettled(true);
        return undefined;
      }

      setSettled(false);
      let frame = 0;
      let start: number | null = null;

      const tick = (now: number): void => {
        if (start === null) start = now;
        const progress = Math.min((now - start) / duration, 1);
        setValue(from + (to - from) * easeEnter(progress));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
        else setSettled(true);
      };

      frame = window.requestAnimationFrame(tick);
      return () => window.cancelAnimationFrame(frame);
    }, [inView, reduced, from, to, duration]);

    return (
      <span ref={localRef} data-xen-v4-counter="" aria-live="off" {...rest}>
        <span data-xen-v4-counter-value="" aria-hidden="true">
          {format(value)}
        </span>
        <span data-xen-v4-counter-announce="" className="sr-only" aria-live="polite">
          {settled ? format(to) : ''}
        </span>
      </span>
    );
  }
);

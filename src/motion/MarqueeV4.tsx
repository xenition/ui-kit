import * as React from 'react';
import { cn } from '../primitives/cn';
import { injectStyleOnce } from './internal/inject';

export interface MarqueeV4Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Scroll speed in px/s. The loop duration is derived from the content width. */
  speed?: number;
  /**
   * Gap between the two copies and between the items inside each copy.
   * Defaults to the theme's `lg` spacing — the same default the native twin
   * takes from `tokens.spacing.lg`.
   */
  gap?: number;
  /** Pause the loop while hovered. The native twin's counterpart is `pauseOnPress`. */
  pauseOnHover?: boolean;
}

/**
 * The keyframes and the two rules that cannot be expressed inline: `:hover`,
 * and the reduced-motion stop. No colors — transforms only.
 *
 * `animation-timing-function: linear` is **not** an oversight and must not be
 * "corrected" onto `EASE_STANDARD`. See the playback note in the doc comment
 * below: an eased loop visibly restarts at the seam.
 */
const MARQUEE_V4_CSS = `
@keyframes xen-marquee-v4 {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
[data-xen-marquee-v4] { overflow: hidden; }
[data-xen-marquee-v4-track] {
  display: flex;
  width: max-content;
  align-items: center;
  gap: var(--xen-marquee-v4-gap, var(--xen-space-lg));
  animation-name: xen-marquee-v4;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
[data-xen-marquee-v4-row] {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: var(--xen-marquee-v4-gap, var(--xen-space-lg));
}
[data-xen-marquee-v4][data-pause-on-hover="true"]:hover [data-xen-marquee-v4-track] {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-marquee-v4-track] { animation: none !important; }
}
`;

/**
 * The duration used until the track has been measured. It is only ever on
 * screen for the frame between mount and the first layout effect, and it is
 * a *duration*, not a design decision — the real number is content ÷ speed.
 */
const FALLBACK_DURATION_S = 24;

/**
 * `Marquee`, V4 — the same loop, with the two twin gaps closed and the reason
 * its numbers are off the motion scale written down.
 *
 * ## Why this component does not take `V4_MOTION`
 *
 * The brief (§2) draws the line the rest of this pass depends on: **the M3
 * scale governs a *transition* — a thing moving from one state to another. It
 * does not govern *playback* — content that runs for as long as the content
 * takes.** `RevealV4` and `TiltCardV4` are transitions and take the scale,
 * duration and easing, no exceptions. A marquee is playback:
 *
 *   - **The duration stays derived** (`contentWidth / speed`). A row of four
 *     logos and a row of forty are not the same event, and a 400ms marquee is
 *     not a marquee. The caller sets a *speed*, in px/s, which is the property
 *     a reader actually perceives; the duration falls out of it.
 *   - **The easing stays `linear`.** This is the one that gets "fixed" by
 *     mistake, so: an infinite loop that eases decelerates into its seam and
 *     accelerates out of it, which makes the seam visible — the loop reads as
 *     stopping and restarting several times a minute instead of running. Every
 *     easing on the scale starts or ends at zero velocity; none of them can be
 *     used here. `linear` is the correct curve for playback, not a placeholder.
 *
 * Both literals carry that reasoning at their definition, per §3.1.
 *
 * ## Reduced motion stops it rather than fading it
 *
 * The house rule (§3.3, `design.md` §36.10) is that reduced motion replaces a
 * large spatial move with a fade instead of removing it, because an element
 * that appears with no transition reads as a glitch. **A marquee is the
 * documented exception**, for two reasons:
 *
 *   1. A fade is a substitute for a transition, and a transition has a still
 *      frame at each end to fade between. A loop has neither end. There is
 *      nothing to fade *to*.
 *   2. Continuous, unstoppable, auto-advancing motion is not incidental to
 *      this component — it is the entire component, and it is precisely what
 *      `prefers-reduced-motion` and WCAG 2.2.2 (Pause, Stop, Hide) are asking
 *      about. Stopping is the correct answer, not a degraded one.
 *
 * So the reduced-motion block sets `animation: none` and the row sits still.
 * That is a deliberate divergence from the house rule; `RevealV4` fades.
 *
 * ## The gap this closes against the native twin
 *
 * The content is rendered twice so the track can translate by exactly one copy
 * and land back where it started. That means every string in a marquee is in
 * the accessibility tree twice — so the second copy is `aria-hidden`, and a
 * screen reader hears the content once. **The native `Marquee` renders the
 * same two copies and hides neither**, which is the same defect without the
 * fix; `native/motion/MarqueeV4.tsx` corrects it with
 * `accessibilityElementsHidden` / `importantForAccessibility`.
 *
 * `pauseOnHover` has no touch analogue at all — there is no hover on a phone —
 * so the native twin takes `pauseOnPress` instead. That is the one place the
 * two twins deliberately disagree on a prop *name*; both default to `true`,
 * and every other prop and default matches (§3.4).
 */
export const MarqueeV4 = React.forwardRef<HTMLDivElement, MarqueeV4Props>(function MarqueeV4(
  { speed = 40, gap, pauseOnHover = true, className, style, children, ...rest },
  ref
) {
  injectStyleOnce('xen-marquee-v4-styles', MARQUEE_V4_CSS);

  const trackRef = React.useRef<HTMLDivElement>(null);
  const [durationS, setDurationS] = React.useState(FALLBACK_DURATION_S);

  React.useEffect(() => {
    const track = trackRef.current;
    if (track === null) return;
    // The track holds both copies, so one copy is half its scroll width.
    const contentWidth = track.scrollWidth / 2;
    if (contentWidth > 0 && speed > 0) {
      setDurationS(contentWidth / speed);
    }
  }, [speed, gap, children]);

  // Unset means "the theme's `lg`", which the sheet's `var()` fallback supplies
  // — the same default the native twin reads off `tokens.spacing.lg`.
  const rootStyle: React.CSSProperties = {
    ...(gap === undefined ? null : ({ '--xen-marquee-v4-gap': `${gap}px` } as React.CSSProperties)),
    ...style,
  };

  return (
    <div
      ref={ref}
      data-xen-marquee-v4=""
      data-pause-on-hover={pauseOnHover ? 'true' : 'false'}
      className={cn('overflow-hidden', className)}
      style={rootStyle}
      {...rest}
    >
      <div
        ref={trackRef}
        data-xen-marquee-v4-track=""
        // Playback, not a transition: derived from content ÷ speed (§2).
        style={{ animationDuration: `${durationS}s` }}
      >
        <div data-xen-marquee-v4-row="">{children}</div>
        {/*
          The seam copy. It exists only so the translate can wrap invisibly, so
          it is hidden from assistive tech — otherwise every label in the row is
          announced twice.
        */}
        <div data-xen-marquee-v4-row="" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
});

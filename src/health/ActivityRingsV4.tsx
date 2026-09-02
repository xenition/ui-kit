import * as React from 'react';
import { cn } from '../primitives/cn';
import { TONE_BG, TONE_VAR } from '../primitives/internal/tone-v4';
import { goalParts, type GoalParts } from './goal-v4';
import type { ActivityRing, ActivityRingColor, ActivityRingsProps } from './ActivityRings';
import { frameClass, spokenLine, TRACK_VAR, type Appearance } from './internal/tone-v4';

export interface ActivityRingsV4Props extends ActivityRingsProps {
  /** Copy when `rings` is empty. Default `'No data'`. */
  emptyLabel?: string;
  /** Copy for a ring whose goal is missing or nought. Default `'No goal set'`. */
  noGoalLabel?: string;
  /** Render one ring's spoken line. Default `'Move, 540 of 600 kcal, 90%'`. */
  formatRing?: (ring: ActivityRing, parts: GoalParts) => string;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

const DEFAULT_COLORS: ActivityRingColor[] = ['danger', 'success', 'primary', 'accent'];

/**
 * **V4 activity rings** — same props as {@link ActivityRings} plus
 * `emptyLabel`, `noGoalLabel`, `formatRing` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **A ring that does not fit is no longer announced as if it were there.**
 *    The base dropped any ring whose radius came out `<= 0` — pass five rings
 *    at the default size and the fifth silently vanishes — while still counting
 *    it in the summary and listing it in the legend. The component now works
 *    out how many rings the geometry can actually carry, draws that many, and
 *    reports the same number: what is claimed and what is drawn are one list.
 * 2. **540 kcal against a goal of nought announced "Move 0%".** `goal <= 0` was
 *    read as *nought per cent* rather than as *no goal*, which is a different
 *    fact and now says so.
 * 3. **Each ring is a meter.** The whole figure was one `role="img"` with a
 *    summary sentence, so a reader could hear the rings but never query one.
 *    The drawing is now `aria-hidden` and every ring is a `progressbar` in a
 *    list beside it — the legend when there is one, a screen-reader-only list
 *    when `showLegend` is false, so the meters exist either way.
 * 4. **The legend prints the measurement, not the clamp.** `Math.min(value,
 *    goal)` was applied to the number on screen, so an exceeded ring read
 *    "600 / 600" for 720 burned calories.
 * 5. **The track is not a hairline.** `--xen-border` is a 1px rule's colour; at
 *    a 14px stroke it reads as an outline around a hole.
 */
export const ActivityRingsV4 = React.forwardRef<HTMLDivElement, ActivityRingsV4Props>(
  function ActivityRingsV4(
    {
      rings,
      size = 140,
      strokeWidth = 14,
      gap = 4,
      showLegend = false,
      emptyLabel = 'No data',
      noGoalLabel = 'No goal set',
      formatRing,
      appearance = 'classic',
      'aria-label': ariaLabel,
      className,
      ...rest
    },
    ref
  ) {
    if (rings.length === 0) {
      return (
        <div
          ref={ref}
          className={cn('text-sm text-muted-text', frameClass(appearance), className)}
          {...rest}
        >
          {emptyLabel}
        </div>
      );
    }

    // How many concentric rings the geometry can carry before the innermost
    // radius goes non-positive. Claiming more than this is what the base did.
    const radiusOf = (index: number): number =>
      size / 2 - strokeWidth / 2 - index * (strokeWidth + gap);
    const drawn = rings.filter((_, index) => radiusOf(index) > 0);

    const measured = drawn.map((ring, index) => {
      const parts = goalParts(ring.value, ring.goal);
      const tone = ring.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length] ?? 'primary';
      const line =
        formatRing?.(ring, parts) ??
        spokenLine([
          ring.label,
          parts.hasGoal
            ? `${parts.value} of ${parts.target}${ring.unit ? ` ${ring.unit}` : ''}`
            : `${parts.value}${ring.unit ? ` ${ring.unit}` : ''}`,
          parts.hasGoal ? `${parts.percent}%` : noGoalLabel,
        ]);
      return { ring, parts, tone, line };
    });

    const figure = (
      // The drawing says nothing the list below does not, and an SVG that
      // repeats it makes every ring two stops instead of one.
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden
        focusable="false"
      >
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {measured.map(({ parts, tone }, index) => {
            const r = radiusOf(index);
            const circumference = 2 * Math.PI * r;
            return (
              <g key={index}>
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke={TRACK_VAR}
                  strokeWidth={strokeWidth}
                />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke={TONE_VAR[tone]}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${circumference * (parts.ratio ?? 0)} ${circumference}`}
                />
              </g>
            );
          })}
        </g>
      </svg>
    );

    return (
      <div
        ref={ref}
        className={cn(
          showLegend ? 'flex items-center gap-lg' : 'inline-flex',
          frameClass(appearance),
          className
        )}
        {...rest}
      >
        {figure}
        <ul
          aria-label={ariaLabel}
          className={cn(showLegend ? 'flex flex-col gap-sm' : 'sr-only')}
        >
          {measured.map(({ ring, parts, tone, line }, index) => (
            <li key={index}>
              <div
                role="progressbar"
                aria-label={ring.label}
                aria-valuenow={parts.hasGoal ? parts.percent : undefined}
                aria-valuemin={parts.hasGoal ? 0 : undefined}
                aria-valuemax={parts.hasGoal ? 100 : undefined}
                aria-valuetext={line}
                className="flex items-center gap-sm"
              >
                <span aria-hidden className={cn('h-2.5 w-2.5 shrink-0 rounded-full', TONE_BG[tone])} />
                <span className="text-sm text-on-card">{ring.label}</span>
                <span className="text-xs text-muted-text">
                  {parts.hasGoal
                    ? `${parts.value} / ${parts.target}${ring.unit ? ` ${ring.unit}` : ''}`
                    : noGoalLabel}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

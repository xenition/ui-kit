import * as React from 'react';
import { cn } from '../primitives/cn';
import { TONE_VAR } from '../primitives/internal/tone-v4';
import { goalParts } from './goal-v4';
import type { MetricRingProps } from './MetricRing';
import { frameClass, spokenLine, TRACK_VAR, type Appearance } from './internal/tone-v4';

export interface MetricRingV4Props extends MetricRingProps {
  /** Copy when no usable goal was given. Default `'No goal set'`. */
  noGoalLabel?: string;
  /** Render the measurement and the goal. Default `'540 kcal'`. */
  formatValue?: (value: number, unit?: string) => string;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

/** Ring thickness as a fraction of the diameter, so a small ring stays a ring. */
const THICKNESS_RATIO = 0.1;

/**
 * **V4 metric ring** — same props as {@link MetricRing} plus `noGoalLabel`,
 * `formatValue` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **The ring is a meter, and says so.** It delegated to `ProgressRing`,
 *    which hard-codes `accessibilityRole="image"` — so the one number the
 *    component exists to show was a picture with a caption, and a reader had no
 *    way to ask for the value. It is now a `role="progressbar"` with a real
 *    `aria-valuenow`, drawn here rather than inherited.
 * 2. **540 kcal against a goal of 0 no longer reads as 0%.** The base's guard
 *    caught `goal <= 0` for the ring but the same expression elsewhere in the
 *    module returned a percentage of nought; `goalParts` makes "no goal" a
 *    distinct answer from "nought per cent" everywhere at once.
 * 3. **An exceeded goal keeps its measurement.** `Math.min(value, goal)` was
 *    applied to the *number on screen*, so 12,400 steps against 10,000 printed
 *    "10000 / 10000". The arc still stops at full; the caption does not.
 * 4. **The track is not a hairline.** `--xen-border` is the colour of a 1px
 *    rule; at a tenth of a 120px ring it reads as an outline around a hole
 *    rather than as the unfilled part of the measure.
 * 5. **The no-goal branch keeps `className` and `appearance`.** It used to
 *    return an unstyled node, dropping whatever the caller had laid out — the
 *    same bug the native twin has in `ActivityRings` and `WaterTracker`.
 */
export const MetricRingV4 = React.forwardRef<HTMLDivElement, MetricRingV4Props>(
  function MetricRingV4(
    {
      label,
      value,
      goal,
      unit,
      color = 'primary',
      size = 120,
      centerLabel,
      noGoalLabel = 'No goal set',
      formatValue,
      appearance = 'classic',
      className,
      ...rest
    },
    ref
  ) {
    const parts = goalParts(value, goal);
    const show =
      formatValue ??
      ((amount: number, suffix?: string) => `${amount}${suffix ? ` ${suffix}` : ''}`);

    const shell = cn('flex flex-col items-center gap-xs', frameClass(appearance), className);

    if (!parts.hasGoal) {
      return (
        <div ref={ref} className={shell} {...rest}>
          <span className="text-sm font-semibold text-on-card">{label}</span>
          <span className="text-sm text-muted-text">{noGoalLabel}</span>
        </div>
      );
    }

    const stroke = Math.max(size * THICKNESS_RATIO, 1);
    const radius = size / 2 - stroke / 2;
    const circumference = 2 * Math.PI * radius;
    const dash = circumference * (parts.ratio ?? 0);
    const caption = spokenLine([
      `${show(parts.value, unit)} of ${show(parts.target ?? 0, unit)}`,
      `${parts.percent}%`,
      parts.over > 0 ? `+${show(parts.over, unit)}` : undefined,
    ]);

    return (
      <div ref={ref} className={shell} {...rest}>
        <div
          role="progressbar"
          aria-valuenow={parts.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={caption}
          aria-label={label}
          className="relative flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden focusable="false">
            <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={TRACK_VAR}
                strokeWidth={stroke}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={TONE_VAR[color]}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
              />
            </g>
          </svg>
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-on-card"
          >
            {centerLabel ?? `${parts.percent}%`}
          </span>
        </div>
        <span className="text-sm font-semibold text-on-card">{label}</span>
        {/* The measurement as given — not `Math.min(value, goal)`. */}
        <span className="text-xs text-muted-text">
          {`${show(parts.value, undefined)} / ${show(parts.target ?? 0, unit)}`}
        </span>
      </div>
    );
  }
);

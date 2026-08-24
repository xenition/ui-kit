import * as React from 'react';
import { cn } from '../primitives/cn';
import { colorVar } from '../charts';
import { BG_CLASS, type HealthColor } from './internal';

export type ActivityRingColor = HealthColor;

export interface ActivityRing {
  /** Ring name, e.g. "Move". */
  label: string;
  /** Current value; clamped to `[0, goal]`. */
  value: number;
  /** Goal / full-ring value. */
  goal: number;
  /** Arc color (semantic token). */
  color?: ActivityRingColor;
  /** Unit for the a11y summary, e.g. "kcal". */
  unit?: string;
}

export interface ActivityRingsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Concentric rings, drawn outermost-first. Typically 2–4. */
  rings: ActivityRing[];
  /** Outer diameter in px. */
  size?: number;
  /** Ring stroke width in px. */
  strokeWidth?: number;
  /** Gap between concentric rings in px. */
  gap?: number;
  /** Whether to show the labelled legend beside the rings. */
  showLegend?: boolean;
  /** Accessible summary override; a per-ring summary is generated otherwise. */
  'aria-label'?: string;
}

const DEFAULT_COLORS: ActivityRingColor[] = ['danger', 'success', 'primary', 'accent'];

/**
 * Apple-style concentric activity rings drawn as inline SVG. Each ring is a
 * `--xen-border` track plus a `var(--xen-<color>)` arc (dash-array technique,
 * starting at 12 o'clock). Guards divide-by-zero per ring and renders a muted
 * "No data" note when `rings` is empty. The whole figure carries one
 * `aria-label` summarizing every ring. Web parity of the native `ActivityRings`;
 * token-only colors.
 */
export const ActivityRings = React.forwardRef<HTMLDivElement, ActivityRingsProps>(function ActivityRings(
  { rings, size = 140, strokeWidth = 14, gap = 4, showLegend = false, 'aria-label': ariaLabel, className, ...rest },
  ref
) {
  if (rings.length === 0) {
    return (
      <div ref={ref} className={cn('text-sm text-muted', className)} {...rest}>
        No data
      </div>
    );
  }

  const cx = size / 2;
  const cy = size / 2;

  const summary =
    ariaLabel ??
    `Activity rings: ${rings
      .map((ring) => {
        const g = Math.max(ring.goal, 0);
        const pct = g > 0 ? Math.round((Math.min(Math.max(ring.value, 0), g) / g) * 100) : 0;
        return `${ring.label} ${pct}%`;
      })
      .join(', ')}`;

  const figure = (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={summary}
    >
      <g transform={`rotate(-90 ${cx} ${cy})`}>
        {rings.map((ring, i) => {
          const r = size / 2 - strokeWidth / 2 - i * (strokeWidth + gap);
          if (r <= 0) return null;
          const circumference = 2 * Math.PI * r;
          const g = Math.max(ring.goal, 0);
          const frac = g > 0 ? Math.min(Math.max(ring.value, 0), g) / g : 0;
          const dash = circumference * frac;
          const arcColor = colorVar(ring.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? 'primary');
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--xen-border)" strokeWidth={strokeWidth} />
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={arcColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );

  if (!showLegend) {
    return (
      <div ref={ref} className={cn('inline-flex', className)} {...rest}>
        {figure}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-[var(--xen-space-lg)]', className)}
      {...rest}
    >
      {figure}
      <div className="flex flex-col gap-[var(--xen-space-sm)]">
        {rings.map((ring, i) => {
          const g = Math.max(ring.goal, 0);
          const arcColor = ring.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? 'primary';
          return (
            <div key={i} className="flex items-center gap-[var(--xen-space-sm)]">
              <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', BG_CLASS[arcColor])} />
              <span className="text-sm text-on-surface">{ring.label}</span>
              <span className="text-xs text-muted">
                {Math.min(Math.max(ring.value, 0), g)} / {g}
                {ring.unit ? ` ${ring.unit}` : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

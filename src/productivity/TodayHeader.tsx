import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

export interface TodayHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Greeting line above the date (default `'Good morning'`). */
  greeting?: string;
  /** The person's name, appended to the greeting (e.g. `'Sam'` → "Good morning, Sam"). */
  userName?: string;
  /** Localized date label (e.g. "Monday, Aug 31"). */
  dateLabel?: string;
  /** Number of tasks due today — the big near-white headline numeral. */
  dueToday: number;
  /** Number of tasks completed today — a frosted stat tile + progress source. */
  completedToday: number;
  /**
   * Explicit completion percentage `0–100` for the progress ring. When omitted it
   * is derived from `completedToday / (completedToday + dueToday)`.
   */
  progressPct?: number;
  /** Optional "next up" focus task label, rendered as a frosted focus tile. */
  focusLabel?: string;
}

/** SVG geometry for the near-white progress ring. */
const RING = { size: 88, stroke: 8 };
const RADIUS = (RING.size - RING.stroke) / 2;
const CIRC = 2 * Math.PI * RADIUS;

/**
 * TodayHeader — the "today" dashboard hero and the **peak** of the productivity
 * V4 "flow" line. A brand-gradient panel that greets the person, shows the date,
 * and states the day in one glance: a big near-white **"N tasks due today"**
 * numeral beside a near-white progress ring, frosted done/remaining tiles, and an
 * optional "next up" focus tile. Presentational — shaped data only, nothing
 * fetches. Every color derives from the brand ramp via `--xen-*` token classes
 * and gradient utilities — no literals, light + dark. The one vivid, motivating
 * surface at the top of the day.
 */
export const TodayHeader = React.forwardRef<HTMLDivElement, TodayHeaderProps>(function TodayHeader(
  {
    greeting = 'Good morning',
    userName,
    dateLabel,
    dueToday,
    completedToday,
    progressPct,
    focusLabel,
    className,
    ...rest
  },
  ref
) {
  const due = Math.max(0, Math.trunc(dueToday || 0));
  const done = Math.max(0, Math.trunc(completedToday || 0));
  const total = done + due;
  const pct = Math.max(
    0,
    Math.min(100, Math.round(progressPct ?? (total > 0 ? (done / total) * 100 : 0)))
  );
  const dashOffset = CIRC * (1 - pct / 100);
  const heading = userName ? `${greeting}, ${userName}` : greeting;

  const Tile = ({ label, value }: { label: string; value: string }) => (
    <div className="min-w-0 flex-1 rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]">
      <p className="text-2xl font-extrabold text-primary-50">{value}</p>
      <p className="text-xs font-semibold text-primary-100">{label}</p>
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]',
        className
      )}
      {...rest}
    >
      <div>
        <p className="text-base font-semibold text-primary-100">{heading}</p>
        {dateLabel ? <p className="text-sm text-primary-100">{dateLabel}</p> : null}
      </div>

      <div className="flex items-center justify-between gap-[var(--xen-space-lg)]">
        <div className="min-w-0">
          <p
            aria-label={`${due} tasks due today`}
            className="text-4xl font-extrabold tracking-tight text-primary-50"
          >
            {due}
          </p>
          <p className="text-base font-semibold text-primary-100">
            {due === 1 ? 'task due today' : 'tasks due today'}
          </p>
        </div>

        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label={`${pct}% complete today`}
          className="relative shrink-0"
          style={{ width: RING.size, height: RING.size }}
        >
          <svg
            width={RING.size}
            height={RING.size}
            viewBox={`0 0 ${RING.size} ${RING.size}`}
            aria-hidden
          >
            <circle
              cx={RING.size / 2}
              cy={RING.size / 2}
              r={RADIUS}
              fill="none"
              strokeWidth={RING.stroke}
              className="stroke-primary-50/20"
            />
            <circle
              cx={RING.size / 2}
              cy={RING.size / 2}
              r={RADIUS}
              fill="none"
              strokeWidth={RING.stroke}
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${RING.size / 2} ${RING.size / 2})`}
              className="stroke-primary-50 transition-[stroke-dashoffset]"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-lg font-extrabold text-primary-50">
            {pct}%
          </span>
        </div>
      </div>

      <div className="flex gap-[var(--xen-space-sm)]">
        <Tile label="Done" value={String(done)} />
        <Tile label="Remaining" value={String(due)} />
      </div>

      {focusLabel ? (
        <div className="flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]">
          <Icon glyph="▶" size="sm" aria-hidden />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-primary-100">Next up</p>
            <p className="truncate text-sm font-bold text-primary-50">{focusLabel}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
});

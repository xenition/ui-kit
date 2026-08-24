import * as React from 'react';
import { cn } from '../primitives/cn';

export type MetricTileTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';

export interface MetricTileProps {
  label: string;
  value: React.ReactNode;
  /** Optional leading icon/glyph slot. */
  icon?: React.ReactNode;
  /** Accent tone for the value; defaults to neutral (`on-surface`). */
  tone?: MetricTileTone;
  /** When set, the tile renders as a button. */
  onClick?: () => void;
  className?: string;
}

const TONE_CLASS: Record<MetricTileTone, string> = {
  neutral: 'text-on-surface',
  primary: 'text-primary',
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
};

/**
 * A compact metric tile — a smaller, denser cousin of {@link StatCard} for grids
 * of secondary numbers. Optional accent `tone` colors the value. Renders as a
 * `<button>` when `onClick` is set. Token-only.
 */
export const MetricTile = React.forwardRef<HTMLElement, MetricTileProps>(function MetricTile(
  { label, value, icon, tone = 'neutral', onClick, className },
  ref
) {
  const inner = (
    <>
      <span className="flex items-center gap-xs">
        {icon ? <span className="shrink-0">{icon}</span> : null}
        <span className="truncate text-xs text-muted">{label}</span>
      </span>
      <span className={cn('text-xl font-bold', TONE_CLASS[tone])}>{value}</span>
    </>
  );

  const classes = cn(
    'flex w-full flex-col gap-xs rounded-[var(--xen-radius-md)] border border-border bg-surface p-md text-left',
    className
  );
  const label2 = `${label}: ${String(value)}`;

  if (!onClick) {
    return (
      <div ref={ref as React.Ref<HTMLDivElement>} aria-label={label2} className={classes}>
        {inner}
      </div>
    );
  }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      aria-label={label2}
      onClick={onClick}
      className={cn(classes, 'transition-opacity hover:opacity-80')}
    >
      {inner}
    </button>
  );
});

import * as React from 'react';
import { cn } from '../primitives/cn';
import { SCAN_META, TONE_TEXT, pressableProps, type ScanKind } from './internal';

export interface ScanRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The scanned code / barcode value (headline, monospace-ish). */
  code: string;
  /** Scan kind — glyph + word, never color alone. */
  kind: ScanKind;
  /** Location / station where the scan happened. */
  location?: string;
  /** Human timestamp (e.g. `10:42:07`). */
  time?: string;
  /** Operator / device that produced the scan. */
  operator?: string;
  /** Makes the row clickable (drill into the scan). */
  onClick?: () => void;
}

/**
 * A single scan event row. The kit ships no barcode renderer, so the code is
 * shown as text beside a **token-bar placeholder** that evokes a barcode
 * (alternating neutral-ramp bars, purely decorative and hidden from a11y). The
 * scan kind is carried by a glyph + word chip. Clickable when `onClick` is set.
 * All colors are theme tokens — no literal colors, no scan/barcode dependency.
 * Web parity of the native `ScanRow`.
 */
export const ScanRow = React.forwardRef<HTMLDivElement, ScanRowProps>(function ScanRow(
  { code, kind, location, time, operator, onClick, className, ...rest },
  ref
) {
  const meta = SCAN_META[kind] ?? SCAN_META.inbound;
  const interactive = pressableProps(onClick);

  // Deterministic pseudo-barcode widths from the code (decorative placeholder).
  const bars = React.useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < 14; i += 1) {
      const ch = code.charCodeAt(i % Math.max(code.length, 1)) || 1;
      out.push((ch % 3) + 1);
    }
    return out;
  }, [code]);

  return (
    <div
      ref={ref}
      aria-label={interactive ? `${meta.label} scan ${code}${location ? ` at ${location}` : ''}` : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      {/* Decorative token-bar "barcode" placeholder (no dependency). */}
      <div
        aria-hidden="true"
        className="flex h-8 w-10 shrink-0 items-center gap-px overflow-hidden rounded-[var(--xen-radius-sm)] bg-neutral-100 px-[3px]"
      >
        {bars.map((w, i) => (
          <span key={i} className="h-[70%] bg-on-surface" style={{ width: `${w}px` }} />
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-bold text-on-surface">{code}</span>
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span aria-hidden="true" className={cn('text-xs', TONE_TEXT[meta.tone])}>
            {meta.glyph}
          </span>
          <span className={cn('text-xs font-semibold', TONE_TEXT[meta.tone])}>{meta.label}</span>
          {location ? <span className="truncate text-xs text-muted">{`· ${location}`}</span> : null}
        </div>
      </div>

      <div className="flex flex-col items-end">
        {time ? <span className="text-xs font-semibold text-on-surface">{time}</span> : null}
        {operator ? <span className="truncate text-xs text-muted">{operator}</span> : null}
      </div>
    </div>
  );
});

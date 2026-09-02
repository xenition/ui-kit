import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { SCAN_META, pressableProps } from './internal';
import type { ScanRowProps } from './ScanRow';

/** V4 layout choices for the "dispatch" design. */
export type ScanRowLayout = 'full' | 'compact';

/** Drop-in for {@link ScanRowProps} — same props, the V4 "dispatch" design. */
export interface ScanRowV4Props extends ScanRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: ScanRowLayout;
}

/**
 * ScanRow — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a scan event: an elevated rounded row with
 * a soft shadow, a decorative token-bar "barcode" placeholder (no scan
 * dependency, hidden from a11y), the code headline, a labelled glyph + word scan
 * kind (never color alone), a location line, and the time / operator at the
 * trailing edge. Clickable when `onClick` is set. Honors the V4 `variant` —
 * `full` (default) and `compact` (a denser single line that drops the location /
 * operator meta) — identical props/behavior to {@link ScanRowProps}. All colors
 * from `--xen-*` token classes (no literals).
 */
export const ScanRowV4 = React.forwardRef<HTMLDivElement, ScanRowV4Props>(function ScanRowV4(
  { code, kind, location, time, operator, variant = 'full', onClick, className, ...rest },
  ref
) {
  const meta = SCAN_META[kind] ?? SCAN_META.inbound;
  const interactive = pressableProps(onClick);
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
  const a11y = `${meta.label} scan ${code}${location ? ` at ${location}` : ''}`;

  // Deterministic pseudo-barcode widths from the code (decorative placeholder).
  const bars = React.useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < 14; i += 1) {
      const ch = code.charCodeAt(i % Math.max(code.length, 1)) || 1;
      out.push((ch % 3) + 1);
    }
    return out;
  }, [code]);

  const barcode = (h: string, w: string) => (
    <div
      aria-hidden="true"
      className={cn('flex shrink-0 items-center gap-px overflow-hidden rounded-[var(--xen-radius-sm)] bg-primary/10 px-[3px]', h, w)}
    >
      {bars.map((bw, i) => (
        <span key={i} className="h-[70%] bg-on-surface" style={{ width: `${bw}px` }} />
      ))}
    </div>
  );

  const statusBadge = (
    <Badge tone={meta.tone} variant="soft" size="sm">
      <span aria-hidden="true">{meta.glyph}</span> {meta.label}
    </Badge>
  );

  // ── compact: denser single line ──
  if (variant === 'compact') {
    return (
      <div
        ref={ref}
        data-xen-scan-row=""
        aria-label={interactive ? a11y : undefined}
        className={cn(
          shell,
          'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        {barcode('h-6', 'w-8')}
        <span className="truncate text-sm font-bold tabular-nums text-on-surface">{code}</span>
        <span className="ml-auto flex items-center gap-[var(--xen-space-sm)]">
          {statusBadge}
          {time ? <span className="whitespace-nowrap text-xs tabular-nums text-muted">{time}</span> : null}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-scan-row=""
      aria-label={interactive ? a11y : undefined}
      className={cn(
        shell,
        'flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      {barcode('h-9', 'w-12')}

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-base font-bold tabular-nums text-on-surface">{code}</span>
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          {statusBadge}
          {location ? <span className="truncate text-xs text-muted">{location}</span> : null}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-0.5">
        {time ? <span className="text-xs font-semibold tabular-nums text-on-surface">{time}</span> : null}
        {operator ? <span className="truncate text-xs text-muted">{operator}</span> : null}
      </div>
    </div>
  );
});

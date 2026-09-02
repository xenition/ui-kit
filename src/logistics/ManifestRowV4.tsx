import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ManifestRowProps, ManifestState } from './ManifestRow';

/** V4 layout choices for the "dispatch" design. */
export type ManifestRowLayout = 'full' | 'compact';

/** Drop-in for {@link ManifestRowProps} — same props, the V4 "dispatch" design. */
export interface ManifestRowV4Props extends ManifestRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: ManifestRowLayout;
}

const STATE_META: Record<
  ManifestState,
  { glyph: string; label: string; text: string; bg: string; on: string }
> = {
  pending: { glyph: '○', label: 'Pending', text: 'text-muted', bg: 'bg-muted', on: 'text-on-surface' },
  checked: { glyph: '✓', label: 'Checked', text: 'text-success', bg: 'bg-success', on: 'text-on-success' },
  missing: { glyph: '✕', label: 'Missing', text: 'text-danger', bg: 'bg-danger', on: 'text-on-danger' },
};

/**
 * ManifestRow — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a load-verification line: an elevated
 * rounded row with a soft shadow, a large check control (`role="checkbox"`,
 * keyboard-operable, ≥44px tap target) whose meaning is carried by a
 * glyph + `aria-checked`, the item + SKU, a labelled state word (never color
 * alone), and a `scanned / quantity` counter that greens on completion and warns
 * when short. Pressing the control cycles pending → checked and fires
 * `onToggle`. Honors the V4 `variant` — `full` (default) and `compact` (a denser
 * single line that hides the SKU) — identical props/behavior to
 * {@link ManifestRowProps}. All colors from `--xen-*` token classes (no literals).
 */
export const ManifestRowV4 = React.forwardRef<HTMLDivElement, ManifestRowV4Props>(function ManifestRowV4(
  { item, sku, quantity, scanned, state = 'pending', variant = 'full', onToggle, className, ...rest },
  ref
) {
  const meta = STATE_META[state];
  const checked = state === 'checked';
  const complete = quantity != null && scanned != null ? scanned >= quantity : undefined;
  const countTone = complete === false ? 'text-warn' : complete ? 'text-success' : 'text-on-surface';
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
  const compact = variant === 'compact';

  const control = (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={`${meta.label}: ${item}`}
      disabled={!onToggle}
      onClick={() => onToggle?.(checked ? 'pending' : 'checked')}
      className={cn(
        'flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        compact ? 'h-8 w-8' : 'h-11 w-11',
        checked ? cn(meta.bg, meta.on) : cn('border-[1.5px] border-border bg-transparent', meta.text),
        onToggle ? 'cursor-pointer' : 'cursor-default'
      )}
    >
      <span aria-hidden="true">{meta.glyph}</span>
    </button>
  );

  const counter =
    quantity != null ? (
      <span className={cn('text-sm font-bold tabular-nums', countTone)}>
        {scanned != null ? `${scanned}/${quantity}` : `×${quantity}`}
      </span>
    ) : null;

  if (compact) {
    return (
      <div
        ref={ref}
        data-xen-manifest-row=""
        className={cn(
          shell,
          'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          className
        )}
        {...rest}
      >
        {control}
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">{item}</span>
        {counter}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-manifest-row=""
      className={cn(
        shell,
        'flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        className
      )}
      {...rest}
    >
      {control}

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-semibold text-on-surface">{item}</span>
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span aria-hidden="true" className={cn('text-xs', meta.text)}>
            {meta.glyph}
          </span>
          <span className={cn('text-xs font-semibold', meta.text)}>{meta.label}</span>
          {sku ? <span className="truncate text-xs text-muted">{`· ${sku}`}</span> : null}
        </div>
      </div>

      {counter}
    </div>
  );
});

import * as React from 'react';
import { cn } from '../primitives/cn';

export type ManifestState = 'pending' | 'checked' | 'missing';

const STATE_META: Record<
  ManifestState,
  { glyph: string; label: string; text: string; bg: string; on: string }
> = {
  pending: { glyph: '○', label: 'Pending', text: 'text-muted', bg: 'bg-muted', on: 'text-on-surface' },
  checked: { glyph: '✓', label: 'Checked', text: 'text-success', bg: 'bg-success', on: 'text-on-success' },
  missing: { glyph: '✕', label: 'Missing', text: 'text-danger', bg: 'bg-danger', on: 'text-on-danger' },
};

export interface ManifestRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Line-item name / description (headline). */
  item: string;
  /** SKU / part number sub-line. */
  sku?: string;
  /** Ordered / expected quantity. */
  quantity?: number;
  /** Scanned / verified quantity so far. */
  scanned?: number;
  /** Verification state — glyph + word, never color alone. */
  state?: ManifestState;
  /** Fires with the next state when the check control is pressed. */
  onToggle?: (next: ManifestState) => void;
}

/**
 * A single manifest / checklist line for goods-in or load verification: item +
 * SKU, a `scanned / quantity` counter, and a clickable check control. State is
 * carried by a glyph + word (checkmark/cross/circle) and `aria-checked`, never
 * color alone. Pressing the control cycles pending → checked and fires
 * `onToggle`. All colors are theme tokens. Web parity of the native
 * `ManifestRow`.
 */
export const ManifestRow = React.forwardRef<HTMLDivElement, ManifestRowProps>(function ManifestRow(
  { item, sku, quantity, scanned, state = 'pending', onToggle, className, ...rest },
  ref
) {
  const meta = STATE_META[state];
  const checked = state === 'checked';
  const complete = quantity != null && scanned != null ? scanned >= quantity : undefined;
  const countTone = complete === false ? 'text-warn' : complete ? 'text-success' : 'text-on-surface';

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-sm)]',
        className
      )}
      {...rest}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={`${meta.label}: ${item}`}
        disabled={!onToggle}
        onClick={() => onToggle?.(checked ? 'pending' : 'checked')}
        className={cn(
          'flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          checked ? cn(meta.bg, meta.on) : cn('border-[1.5px] border-border bg-transparent', meta.text),
          onToggle ? 'cursor-pointer' : 'cursor-default'
        )}
      >
        <span aria-hidden="true">{meta.glyph}</span>
      </button>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-on-surface">{item}</span>
        {sku ? <span className="truncate text-xs text-muted">{sku}</span> : null}
      </div>

      {quantity != null ? (
        <span className={cn('text-sm font-bold', countTone)}>
          {scanned != null ? `${scanned}/${quantity}` : `×${quantity}`}
        </span>
      ) : null}
    </div>
  );
});

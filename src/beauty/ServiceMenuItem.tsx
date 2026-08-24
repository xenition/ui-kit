import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, type MoneyFormatter } from '../commerce';

export type ServiceCategory =
  | 'hair'
  | 'nails'
  | 'skin'
  | 'massage'
  | 'makeup'
  | 'brows'
  | 'waxing'
  | 'spa';

interface CategoryMeta {
  glyph: string;
  label: string;
  /** Token `text-*` class carrying the category accent. */
  text: string;
}

const CATEGORY_META: Record<ServiceCategory, CategoryMeta> = {
  hair: { glyph: '💇', label: 'Hair', text: 'text-primary' },
  nails: { glyph: '💅', label: 'Nails', text: 'text-accent' },
  skin: { glyph: '✨', label: 'Skin', text: 'text-success' },
  massage: { glyph: '💆', label: 'Massage', text: 'text-primary' },
  makeup: { glyph: '💄', label: 'Makeup', text: 'text-danger' },
  brows: { glyph: '👁️', label: 'Brows', text: 'text-accent' },
  waxing: { glyph: '🕯️', label: 'Waxing', text: 'text-warn' },
  spa: { glyph: '🧖', label: 'Spa', text: 'text-success' },
};

export interface ServiceMenuItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Service name, e.g. "Balayage & tone". */
  name: string;
  /** Price in integer cents. */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Category; drives the icon, tag, and accent tone. Falls back to `spa`. */
  category?: ServiceCategory;
  /** Duration in minutes. */
  durationMin?: number;
  /** Optional one/two-line description. */
  description?: string;
  /** Flags the row with a "Popular" marker. */
  popular?: boolean;
  /** When set, the row is dimmed and non-interactive. */
  unavailable?: boolean;
  /** Prefix shown before the price (e.g. "from"). */
  pricePrefix?: string;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
  /** Fires when the row is activated (unless `unavailable`). */
  onClick?: () => void;
}

/**
 * A single salon/spa service-menu row: category icon + tag, name, optional
 * description, a duration chip, and a right-aligned price (integer cents via
 * {@link formatMoney}). `popular` adds a soft marker; `unavailable` dims the row
 * and blocks the press. When interactive the whole row is a `role="button"` with
 * keyboard support and a spoken label carrying the price/duration. Token-only
 * colors — no literals.
 */
export const ServiceMenuItem = React.forwardRef<HTMLDivElement, ServiceMenuItemProps>(
  function ServiceMenuItem(
    {
      name,
      priceCents,
      currency = 'USD',
      category = 'spa',
      durationMin,
      description,
      popular = false,
      unavailable = false,
      pricePrefix,
      formatMoney: format = formatMoney,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const meta = CATEGORY_META[category] ?? CATEGORY_META.spa;
    const priceText = `${pricePrefix ? `${pricePrefix} ` : ''}${format(priceCents, currency)}`;
    const interactive = !unavailable && !!onClick;

    const a11yLabel = `${name}, ${meta.label}${
      durationMin != null ? `, ${durationMin} minutes` : ''
    }, ${priceText}${unavailable ? ', unavailable' : ''}`;

    return (
      <div
        ref={ref}
        data-xen-service-menu-item=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={a11yLabel}
        aria-disabled={unavailable || undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }
            : undefined
        }
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          interactive && 'cursor-pointer transition-opacity hover:opacity-95',
          unavailable && 'opacity-50',
          className
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-lg"
        >
          <span className={meta.text}>{meta.glyph}</span>
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-[var(--xen-space-sm)]">
            <span className="truncate text-base font-bold text-on-surface">{name}</span>
            {popular ? (
              <span className="shrink-0 rounded-[var(--xen-radius-sm)] bg-accent-50 px-[var(--xen-space-xs)] py-px text-xs font-bold text-accent">
                Popular
              </span>
            ) : null}
          </div>
          {description ? (
            <span className="line-clamp-2 text-sm text-muted">{description}</span>
          ) : null}
          {durationMin != null ? (
            <span className="text-xs text-muted">{durationMin} min</span>
          ) : null}
        </div>

        <span className="shrink-0 text-base font-bold text-on-surface">{priceText}</span>
      </div>
    );
  }
);

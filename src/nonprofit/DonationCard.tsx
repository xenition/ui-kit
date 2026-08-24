import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { formatMoney } from './internal';

/** Visual density of a {@link DonationCard}. */
export type DonationCardVariant = 'default' | 'compact' | 'featured';

export interface DonationCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Headline, e.g. `Support Clean Water`. */
  title: string;
  /** Optional supporting blurb. */
  description?: string;
  /**
   * Preset gift amounts in integer **cents**. Rendered as a selectable chip
   * grid; the chosen preset becomes the amount passed to `onDonate`.
   */
  presets?: number[];
  /** Controlled selected preset (cents). Falls back to the first preset. */
  selected?: number;
  /** ISO 4217 currency for money formatting (default `USD`). */
  currency?: string;
  /** Label for the primary CTA (default `Donate`). */
  ctaLabel?: string;
  /** Density / emphasis. `featured` enlarges the title. */
  variant?: DonationCardVariant;
  /** Fires when a preset chip is chosen (cents). */
  onSelectAmount?: (cents: number) => void;
  /** Fires when the CTA is clicked, with the active amount in cents. */
  onDonate?: (cents: number) => void;
  /** Block the CTA (web `Button` has no `loading`, so a busy CTA is disabled). */
  loading?: boolean;
  disabled?: boolean;
}

/**
 * Web parity of the native `DonationCard`: the donate call-to-action surface —
 * a title/blurb, a grid of preset gift amounts (integer cents → localized
 * currency via `formatMoney`), and a primary CTA that reports the chosen amount.
 * Selection is conveyed by a filled chip, a bold border, AND `aria-checked` on a
 * `role="radio"` button — not color alone. When no `presets` are supplied the
 * grid is omitted and the CTA reports `0`. All colors come from the `--xen-*`
 * token classes — no literal colors.
 */
export const DonationCard = React.forwardRef<HTMLDivElement, DonationCardProps>(
  function DonationCard(
    {
      title,
      description,
      presets = [],
      selected,
      currency = 'USD',
      ctaLabel = 'Donate',
      variant = 'default',
      onSelectAmount,
      onDonate,
      loading = false,
      disabled = false,
      className,
      ...rest
    },
    ref
  ) {
    const isFeatured = variant === 'featured';
    const isCompact = variant === 'compact';

    const fallback = presets.length > 0 ? (presets[0] ?? 0) : 0;
    const active = selected != null ? selected : fallback;
    const busy = loading || disabled;

    return (
      <div
        ref={ref}
        role="group"
        aria-label={title}
        className={cn(
          'flex flex-col gap-md rounded-lg border border-border bg-surface',
          isCompact ? 'p-md' : 'p-lg',
          className
        )}
        {...rest}
      >
        <div className="flex flex-col gap-xs">
          <span
            className={cn('font-bold text-on-surface', isFeatured ? 'text-xl' : 'text-lg')}
          >
            {title}
          </span>
          {description ? <span className="text-sm text-muted">{description}</span> : null}
        </div>

        {presets.length > 0 ? (
          <div role="radiogroup" aria-label="Gift amount" className="flex flex-wrap gap-sm">
            {presets.map((cents, i) => {
              const isOn = cents === active;
              return (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={isOn}
                  aria-label={formatMoney(cents, currency)}
                  disabled={disabled}
                  onClick={() => onSelectAmount?.(cents)}
                  className={cn(
                    'rounded-md px-md py-sm text-base font-bold transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                    'disabled:pointer-events-none disabled:opacity-50',
                    isOn
                      ? 'border-2 border-primary bg-primary-50 text-primary'
                      : 'border border-border bg-surface text-on-surface hover:bg-neutral-100'
                  )}
                >
                  {formatMoney(cents, currency)}
                </button>
              );
            })}
          </div>
        ) : null}

        <Button
          variant="primary"
          disabled={busy}
          onClick={() => onDonate?.(active)}
          className="gap-xs"
        >
          <Icon glyph="❤️" size="base" />
          {presets.length > 0 ? `${ctaLabel} ${formatMoney(active, currency)}` : ctaLabel}
        </Button>
      </div>
    );
  }
);

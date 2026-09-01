import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { Icon } from '../primitives/Icon';
import {
  V4_CARD_GROUND_ATTR,
  V4_CARD_GROUND_CSS,
  V4_CARD_GROUND_STYLE_ID,
} from '../primitives/internal/card-ground-v4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { formatMoney } from '../commerce/money';
import { spokenLine } from './internal/ledger-v4';
import { maskAccountNumber } from './internal/mask';
import { MoneyAmountV4 } from './MoneyAmountV4';
import type { AccountCardProps, AccountVariant } from './AccountCard';

export interface AccountCardV4Props extends AccountCardProps {
  /**
   * The word for each account kind. Defaults to `'Checking'`, `'Savings'` and
   * `'Credit'` — the three English strings the base had baked in.
   */
  typeLabels?: Partial<Record<AccountVariant, string>>;
}

/**
 * The glyph and the default word per kind.
 *
 * The accent **border** is gone. `savings` took `border-success` and `credit`
 * took `border-accent`, so a status colour was spent on an identity — and the
 * green edge sat directly beside a `MoneyAmount` whose green means income, in
 * a component where a savings account is not "healthy" and a credit account is
 * not "flagged". The kind is carried by the glyph and by a word.
 */
const VARIANT_META: Record<AccountVariant, { glyph: string; label: string }> = {
  checking: { glyph: '🏦', label: 'Checking' },
  savings: { glyph: '🐖', label: 'Savings' },
  credit: { glyph: '💳', label: 'Credit' },
};

/** The caption above the figure. Visible, and part of the card's name. */
const BALANCE_LABEL = 'Balance';

/**
 * **V4 account card** — the web twin of the native `AccountCardV4`, same props
 * as {@link AccountCard} plus `typeLabels`.
 *
 * ## Six changes
 *
 * 1. **The card's name contains the balance.** `aria-label={`${name},
 *    ${label} account`}` on a `role="button"` root prunes everything under it,
 *    and what it pruned was the balance — the only number the tile exists to
 *    show. The name is now the account, its kind, the masked number and the
 *    figure.
 * 2. **An account kind is an identity, not a status** — see
 *    {@link VARIANT_META}.
 * 3. **The account number no longer replaces the account kind.** The base
 *    printed the mask *instead of* the type word, so a tile with a number on
 *    it stopped saying whether it was a credit card or a current account. Both
 *    lines are there.
 * 4. **Press is a state layer.** `hover:opacity-90` fades the card's own
 *    content, which is the signal M3 spends 0.38 on to mean *disabled* — so a
 *    hovered card and a dead one were the same gesture at two strengths.
 * 5. **Focus is `ring-ring`**, not `ring-primary-300`: a ramp step keeps its
 *    light-mode orientation under `[data-theme="dark"]`, while `--xen-ring` is
 *    `primary` already corrected to 3:1 against the page.
 * 6. **The card is on `card`, its captions on `muted-text`.** The tile painted
 *    `surface` — the page colour — so it read flat in dark mode, and its two
 *    captions used `muted`, a ramp step with no contrast promise, as an ink.
 */
export const AccountCardV4 = React.forwardRef<HTMLDivElement, AccountCardV4Props>(
  function AccountCardV4(
    {
      name,
      variant,
      balanceCents,
      currency = 'USD',
      accountNumber,
      icon,
      typeLabels,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(V4_CARD_GROUND_STYLE_ID, V4_CARD_GROUND_CSS);
    }, []);

    const meta = VARIANT_META[variant];
    const typeLabel = typeLabels?.[variant] ?? meta.label;
    const masked = accountNumber != null ? maskAccountNumber(accountNumber) : undefined;

    const label = spokenLine([
      name,
      typeLabel,
      masked,
      BALANCE_LABEL,
      formatMoney(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency),
    ]);

    const body = (
      <>
        <span className="flex items-center gap-sm">
          <span
            aria-hidden="true"
            className="flex h-xl w-xl shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border border-border bg-surface"
          >
            <Icon glyph={icon ?? meta.glyph} color="onSurface" size="lg" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-base font-semibold text-on-card">{name}</span>
            <span className="truncate text-xs text-muted-text">
              {metaLine([typeLabel, masked])}
            </span>
          </span>
        </span>
        <span className="flex flex-col gap-xs">
          <span className="text-xs text-muted-text">{BALANCE_LABEL}</span>
          <MoneyAmountV4 cents={balanceCents} currency={currency} tone="neutral" size="lg" />
        </span>
      </>
    );

    return (
      <CardV4
        ref={ref}
        {...V4_CARD_GROUND_ATTR}
        variant="outlined"
        radius="lg"
        // The padding moves inside so the state layer covers the whole tile
        // rather than a rectangle floating in the middle of it.
        padding="none"
        className={cn('overflow-hidden', className)}
        {...rest}
      >
        {onClick ? (
          <button
            type="button"
            aria-label={label}
            onClick={onClick}
            data-xen-v4-state=""
            style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
            className={cn(
              'flex w-full flex-col gap-md p-lg text-left',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              MIN_TAP_CLASS
            )}
          >
            {body}
          </button>
        ) : (
          <span className="flex flex-col gap-md p-lg">{body}</span>
        )}
      </CardV4>
    );
  }
);

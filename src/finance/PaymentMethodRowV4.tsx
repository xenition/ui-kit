import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { Icon } from '../primitives/Icon';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { BADGE_V4, IDENTITY_TONE, spokenLine } from './internal/ledger-v4';
import { maskAccountNumber } from './internal/mask';
import { CARD_BRAND_LABEL } from './CreditCardViewV4';
import type { CardBrand } from './CreditCardView';
import type { PaymentMethodKind, PaymentMethodRowProps } from './PaymentMethodRow';

export interface PaymentMethodRowV4Props extends PaymentMethodRowProps {
  /** The badge on the preferred method. Default `'Default'`. */
  defaultLabel?: string;
  /** The word for each network. Defaults to the card face's own table. */
  brandLabels?: Partial<Record<CardBrand, string>>;
}

const KIND_GLYPH: Record<PaymentMethodKind, string> = {
  card: '💳',
  bank: '🏦',
  wallet: '👛',
};

/** The word for the selected state — it was carried by a ✓ and a ring alone. */
const SELECTED_LABEL = 'Selected';

/**
 * **V4 payment-method row** — the web twin of the native
 * `PaymentMethodRowV4`, same props as {@link PaymentMethodRow} plus
 * `defaultLabel` and `brandLabels`.
 *
 * ## Five changes
 *
 * 1. **`brand` is rendered.** It is accepted, documented as affecting the
 *    glyph, and destructured into a dead binding — so a Visa row and an Amex
 *    row were the same 💳 and the only way to tell a wallet's two cards apart
 *    was the last four. The network is printed, from the same table the card
 *    face uses.
 * 2. **The last four are masked by the module's own masker.** It built
 *    `` `•• ${last4}` `` by concatenation, two files away from
 *    `maskAccountNumber`, so a caller who passed the full number got the full
 *    number on screen.
 * 3. **"Default" stops being `success`.** A preferred payment method is an
 *    identity, not a healthy state, and the green badge sat in a module where
 *    green means income. It is the neutral identity chip.
 * 4. **It is a real `<button>` with a radio role and a name that carries the
 *    row.** The base put `role="radio"` and a hand-written Enter/Space handler
 *    on a `div` and named it `label` alone — so the masked number, the expiry
 *    and the "Default" badge were all pruned, and the selected ✓ reached
 *    nobody.
 * 5. **Press is a state layer, focus is `ring-ring`, and the row clears 44.**
 */
export const PaymentMethodRowV4 = React.forwardRef<HTMLDivElement, PaymentMethodRowV4Props>(
  function PaymentMethodRowV4(
    {
      label,
      kind = 'card',
      brand,
      last4,
      expiry,
      icon,
      isDefault = false,
      selected = false,
      defaultLabel = 'Default',
      brandLabels,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const brandLabel =
      kind === 'card' && brand != null
        ? (brandLabels?.[brand] ?? CARD_BRAND_LABEL[brand])
        : undefined;
    const masked = last4 != null ? maskAccountNumber(last4) : undefined;
    const expiryText = expiry != null ? `exp ${expiry}` : undefined;
    const sub = metaLine([masked, expiryText]);

    const name = spokenLine([
      label,
      brandLabel,
      masked,
      expiryText,
      isDefault ? defaultLabel : undefined,
      selected ? SELECTED_LABEL : undefined,
    ]);

    const body = (
      <>
        <Icon
          aria-hidden="true"
          glyph={icon ?? KIND_GLYPH[kind]}
          color={selected ? 'primary' : 'onSurface'}
          size="xl"
        />
        <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
          <span className="flex items-center gap-xs">
            <span className="truncate text-base font-semibold text-on-surface">{label}</span>
            {brandLabel != null ? (
              // A network is an identity: a word, in the neutral chip, never a
              // status colour.
              <BadgeV4 {...BADGE_V4} tone={IDENTITY_TONE} aria-hidden="true">
                {brandLabel}
              </BadgeV4>
            ) : null}
            {isDefault ? (
              <BadgeV4 {...BADGE_V4} tone={IDENTITY_TONE} aria-hidden="true">
                {defaultLabel}
              </BadgeV4>
            ) : null}
          </span>
          {sub !== '' ? <span className="truncate text-xs text-muted-text">{sub}</span> : null}
        </span>
        {selected ? (
          <Icon aria-hidden="true" glyph="✓" color="primary" size="lg" />
        ) : null}
      </>
    );

    const shell = cn(
      'flex w-full items-center gap-md rounded-[var(--xen-radius-md)] border p-md',
      selected ? 'border-primary bg-selected text-on-selected' : 'border-border bg-surface',
      MIN_TAP_CLASS
    );

    return (
      <div ref={ref} className={cn('flex w-full', className)} {...rest}>
        {onClick ? (
          <button
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={name}
            onClick={onClick}
            data-xen-v4-state=""
            style={
              stateGroundVars(
                selected ? 'var(--xen-selected)' : 'var(--xen-surface)',
                selected ? 'var(--xen-on-selected)' : 'var(--xen-on-surface)'
              ) as React.CSSProperties
            }
            className={cn(
              shell,
              'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {body}
          </button>
        ) : (
          <div className={shell}>{body}</div>
        )}
      </div>
    );
  }
);

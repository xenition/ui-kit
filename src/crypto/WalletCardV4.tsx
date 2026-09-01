import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { BadgeV4 } from '../primitives/BadgeV4';
import type { BadgeTone } from '../primitives/Badge';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { toneGround } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { MoneyAmount } from '../finance/MoneyAmount';
import { formatMoney } from '../commerce/money';
import { BADGE_V4, PLACEHOLDER_CLASS, spokenLine, TABULAR_CLASS } from './internal/market-v4';
import { formatToken, truncateHash } from './internal/format';
import type { WalletCardProps, WalletKind } from './WalletCard';

export interface WalletCardV4Props extends WalletCardProps {
  /** Name for the copy control. Default `'Copy address'`. */
  copyLabel?: string;
  /** Announced once the address has been handed to `onCopy`. Default `'Address copied'`. */
  copiedLabel?: string;
  /**
   * Leading hex characters kept in the truncated address. Default `8`.
   *
   * `truncateHash(hash, 6, 4)` counts the `0x` prefix in its lead, so the base
   * left **four** significant leading digits — not enough to verify an address
   * against a hardware screen, which is the only reason the chip exists.
   */
  addressLead?: number;
}

const KIND_META: Record<WalletKind, { label: string; tone: BadgeTone; glyph: string }> = {
  hot: { label: 'Hot', tone: 'warn', glyph: '🔥' },
  hardware: { label: 'Hardware', tone: 'success', glyph: '🔒' },
  watch: { label: 'Watch-only', tone: 'neutral', glyph: '👁' },
};

/** How long the copy confirmation stays in the live region, in ms. */
const COPIED_DWELL_MS = 2000;

/**
 * **V4 wallet card** — the web twin of the native `WalletCardV4`, same props as
 * {@link WalletCard} plus `copyLabel`, `copiedLabel` and `addressLead`.
 *
 * ## Five changes
 *
 * 1. **Copy does one thing.** The copy chip was a real `<button>` sitting
 *    *inside* a root that `pressableProps()` had turned into a
 *    `role="button"` with its own handler, so on the web one tap both copied
 *    the address and opened the wallet. Native's inner `Pressable` consumed
 *    the touch and did not, so the same props produced two behaviours. Fixed
 *    the way `ContactCardV4` fixed it: the card's activation is a real
 *    `<button>` around the identity region only, and the chip is its sibling.
 *    No `stopPropagation`, because there is no ancestor handler left.
 * 2. **`variant` reaches `Card` on the web too.** `elevated` is this
 *    component's own default and the web twin dropped it on the floor, so the
 *    default wallet card was raised on the phone and flat in the browser.
 * 3. **Eight leading hex digits, not four.** See `addressLead`.
 * 4. **The card announces its balance.** `aria-label={label}` replaced the
 *    subtree, so "Main Wallet" was all a reader got — never the fiat total,
 *    the native amount or the custody kind.
 * 5. **A press is a state layer, the skeleton is opaque, and the chip clears
 *    44.** The chip was a ~28px pill, the skeleton a `bg-neutral-100` ramp
 *    step, and a copy with no confirmation left the user guessing — the
 *    address is now confirmed in a polite live region.
 */
export const WalletCardV4 = React.forwardRef<HTMLDivElement, WalletCardV4Props>(
  function WalletCardV4(
    {
      address,
      label = 'Wallet',
      balanceCents,
      currency = 'USD',
      nativeAmount,
      nativeSymbol,
      nativeDecimals = 4,
      kind,
      variant = 'elevated',
      loading = false,
      onCopy,
      onClick,
      copyLabel = 'Copy address',
      copiedLabel = 'Address copied',
      addressLead = 8,
      className,
      style,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
      if (!copied) return undefined;
      const timer = window.setTimeout(() => setCopied(false), COPIED_DWELL_MS);
      return () => window.clearTimeout(timer);
    }, [copied]);

    const short = truncateHash(address, addressLead, 4);
    const kindMeta = kind ? KIND_META[kind] : undefined;
    const interactive = onClick != null && !loading;
    const nativeText =
      nativeAmount != null
        ? formatToken(nativeAmount, { decimals: nativeDecimals, symbol: nativeSymbol })
        : undefined;

    // The same variant the native twin resolves: `accent` is `elevated` plus a
    // tint, not a third card treatment.
    const cardVariant = variant === 'accent' ? 'elevated' : variant;

    const identity = (
      <>
        <span className="flex items-center gap-sm">
          <span className="min-w-0 flex-1 truncate text-base font-bold text-on-card">{label}</span>
          {kindMeta ? (
            <BadgeV4 tone={kindMeta.tone} {...BADGE_V4}>
              <span aria-hidden="true">{kindMeta.glyph}</span> {kindMeta.label}
            </BadgeV4>
          ) : null}
        </span>
        <span className="flex flex-col gap-xs">
          {balanceCents != null ? (
            <MoneyAmount cents={balanceCents} currency={currency} tone="neutral" size="xl" />
          ) : null}
          {nativeText != null ? (
            <span className={cn('text-sm text-muted-text', TABULAR_CLASS)}>{nativeText}</span>
          ) : null}
        </span>
      </>
    );

    return (
      <Card
        ref={ref}
        variant={cardVariant}
        className={cn('flex flex-col gap-md', className)}
        style={
          variant === 'accent'
            ? { backgroundColor: toneGround('primary'), ...style }
            : style
        }
        {...rest}
      >
        {loading ? (
          <div
            role="status"
            aria-live="polite"
            aria-label="Loading balance"
            className="flex flex-col gap-xs"
          >
            <div className={cn('h-md w-2/5', PLACEHOLDER_CLASS)} />
            <div className={cn('h-xl w-3/5', PLACEHOLDER_CLASS)} />
          </div>
        ) : interactive ? (
          <button
            type="button"
            aria-label={spokenLine([
              label,
              balanceCents != null ? formatMoney(balanceCents, currency) : undefined,
              nativeText,
              kindMeta?.label,
            ])}
            onClick={onClick}
            data-xen-v4-state=""
            style={
              stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties
            }
            className={cn(
              'flex w-full flex-col gap-sm rounded-[var(--xen-radius-md)] text-left',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              MIN_TAP_CLASS
            )}
          >
            {identity}
          </button>
        ) : (
          <div className="flex flex-col gap-sm">{identity}</div>
        )}

        {/*
          A sibling of the card's own control, never a descendant of it. That
          is the whole fix for the double-fire, and it is structural rather
          than another `stopPropagation`.
        */}
        <button
          type="button"
          aria-label={spokenLine([copyLabel, short])}
          onClick={
            onCopy
              ? () => {
                  onCopy(address);
                  setCopied(true);
                }
              : undefined
          }
          disabled={!onCopy}
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
          className={cn(
            'inline-flex items-center gap-xs self-start rounded-[var(--xen-radius-full)]',
            'border border-border px-md',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            MIN_TAP_CLASS,
            V4_DISABLED_CLASS
          )}
        >
          <span className={cn('text-sm text-on-card', TABULAR_CLASS)}>{short}</span>
          {onCopy ? (
            <span aria-hidden="true" className="text-xs text-muted-text">
              ⧉
            </span>
          ) : null}
        </button>

        {/* A copy with no confirmation is a copy the user repeats. */}
        <span role="status" aria-live="polite" className="sr-only">
          {copied ? copiedLabel : ''}
        </span>
      </Card>
    );
  }
);

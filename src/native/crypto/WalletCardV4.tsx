import * as React from 'react';
import { AccessibilityInfo, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { MoneyAmount } from '../finance/MoneyAmount';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { formatMoney } from '../../commerce/money';
import { BADGE_V4, skeletonFill, spokenLine, type ToneV4 } from './internal/market-v4';
import { formatToken, truncateHash } from './internal/format';
import type { WalletCardProps, WalletKind } from './WalletCard';

export interface WalletCardV4Props extends WalletCardProps {
  /** Name of the copy control. Default `'Copy address'`. */
  copyLabel?: string;
  /** Announced once the address has been handed to `onCopy`. Default `'Address copied'`. */
  copiedLabel?: string;
  /**
   * Leading characters kept when the address is truncated. Default `8`.
   *
   * `truncateHash(h, 6, 4)` counts the `0x` prefix in its lead, so the base
   * showed **four** significant leading hex digits — and address verification
   * is exactly the task those digits exist for. Eight restores six.
   */
  addressLead?: number;
}

const KIND_META: Record<WalletKind, { label: string; tone: ToneV4; glyph: string }> = {
  hot: { label: 'Hot', tone: 'warn', glyph: '🔥' },
  hardware: { label: 'Hardware', tone: 'success', glyph: '🔒' },
  watch: { label: 'Watch-only', tone: 'neutral', glyph: '👁' },
};

/** How much brand the `accent` variant's ground carries — `BadgeV4`'s 14%. */
const ACCENT_MIX = 0.14;

/**
 * **V4 wallet header** — same props as {@link WalletCard} plus `copyLabel`,
 * `copiedLabel` and `addressLead`.
 *
 * ## Four changes
 *
 * 1. **Copy does one thing.** The copy chip was a *descendant* of the card's
 *    own activation, so on the web twin one tap fired both `onCopy` and
 *    `onClick` — and native, where a nested `Pressable` swallows the touch,
 *    did not. Same tap, two behaviours, depending on the platform. The card's
 *    control now wraps the identity region only and the chip is its sibling,
 *    the restructure `ContactCardV4` already made.
 * 2. **The address shows enough of itself to verify.** See
 *    {@link WalletCardV4Props.addressLead}.
 * 3. **The card announces its balance.** `label` — `"Main Wallet"` — was the
 *    whole name and it replaced the subtree, so the fiat balance and the
 *    native amount were never spoken. They are one line now, with the custody
 *    kind; the 🔥/🔒/👁 mark stays out of it, as it already does on web.
 * 4. **A copy that lands says so.** `onCopy` is a handler the component cannot
 *    see the result of, so the acknowledgement is the one thing it can
 *    honestly give: `copiedLabel`, announced. The chip also clears 44, has a
 *    real disabled state, and presses as a state layer rather than
 *    `opacity: 0.7`.
 */
export function WalletCardV4({
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
  copyLabel = 'Copy address',
  copiedLabel = 'Address copied',
  addressLead = 8,
  onCopy,
  onPress,
  style,
}: WalletCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!address) return null;

  const short = truncateHash(address, addressLead, 4);
  const kindMeta = kind ? KIND_META[kind] : undefined;
  const tap = minTap(tokens.spacing);

  // `variant` reaches `Card` here and — in V4 — on the web twin too, where the
  // component's own `elevated` default was dropped entirely.
  const cardVariant = variant === 'accent' ? 'elevated' : variant;
  const accentStyle: StyleProp<ViewStyle> =
    variant === 'accent'
      ? { backgroundColor: mixToken(colors.surface, colors.primary, ACCENT_MIX) }
      : null;

  const nativeText =
    nativeAmount != null
      ? formatToken(nativeAmount, {
          decimals: nativeDecimals,
          ...(nativeSymbol != null ? { symbol: nativeSymbol } : {}),
        })
      : null;

  const identityName = spokenLine([
    label,
    kindMeta?.label,
    balanceCents != null ? formatMoney(balanceCents, currency) : null,
    nativeText,
  ]);

  const identity = (
    <View style={{ gap: tokens.spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <TextV4
          size="base"
          weight="bold"
          tone="onSurface"
          numberOfLines={1}
          style={{ flex: 1, minWidth: 0 }}
        >
          {label}
        </TextV4>
        {kindMeta ? (
          <BadgeV4 tone={kindMeta.tone} {...BADGE_V4}>
            {`${kindMeta.glyph} ${kindMeta.label}`}
          </BadgeV4>
        ) : null}
      </View>

      {loading ? (
        <View
          style={{
            height: tokens.spacing.xl,
            width: '60%',
            borderRadius: tokens.radius.sm,
            backgroundColor: skeletonFill(theme),
          }}
        />
      ) : (
        <View style={{ gap: tokens.spacing.xs }}>
          {balanceCents != null ? (
            <MoneyAmount cents={balanceCents} currency={currency} tone="neutral" size="xl" />
          ) : null}
          {nativeText != null ? (
            <TextV4 size="sm" tone="mutedText" numeric="tabular">
              {nativeText}
            </TextV4>
          ) : null}
        </View>
      )}
    </View>
  );

  return (
    <CardV4 variant={cardVariant} style={[accentStyle, style]}>
      <View style={{ gap: tokens.spacing.md }}>
        {onPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={loading ? spokenLine([label, 'Loading balance']) : identityName}
            onPress={onPress}
            style={({ pressed }) => ({
              borderRadius: tokens.radius.md,
              backgroundColor: pressed
                ? pressOver(theme, colors.surface, colors.onSurface)
                : 'transparent',
            })}
          >
            {identity}
          </Pressable>
        ) : (
          <View
            accessible
            accessibilityLabel={loading ? spokenLine([label, 'Loading balance']) : identityName}
          >
            {identity}
          </View>
        )}

        {/* A sibling of the card's control, never a child of it. */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={spokenLine([copyLabel, address])}
          accessibilityState={{ disabled: !onCopy }}
          disabled={!onCopy}
          onPress={
            onCopy
              ? () => {
                  onCopy(address);
                  // The only acknowledgement the component can honestly make:
                  // it does not own the clipboard and cannot read it back.
                  AccessibilityInfo.announceForAccessibility(copiedLabel);
                }
              : undefined
          }
          style={({ pressed }) => ({
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            minHeight: tap,
            backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.full,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            opacity: disabledOpacity(theme.state, !onCopy),
          })}
        >
          <TextV4 size="sm" tone="onCard" numeric="tabular">
            {short}
          </TextV4>
          {onCopy ? (
            <TextV4
              size="xs"
              tone="mutedText"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            >
              ⧉
            </TextV4>
          ) : null}
        </Pressable>
      </View>
    </CardV4>
  );
}

import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { appearanceStyle } from '../primitives/internal/appearance';
import { pressFill } from '../primitives/internal/state-v4';
import { formatMoney } from '../commerce/money';
import { MoneyAmountV4 } from './MoneyAmountV4';
import { maskAccountNumber } from './internal/mask';
import { BADGE_V4, IDENTITY_TONE, spokenLine } from './internal/ledger-v4';
import type { AccountCardProps, AccountVariant } from './AccountCard';

export interface AccountCardV4Props extends AccountCardProps {
  /** Override the account-type wording. Defaults to `Checking` / `Savings` / `Credit`. */
  typeLabels?: Partial<Record<AccountVariant, string>>;
}

/** The default glyph per account kind. The type is identity, so it gets a shape. */
const VARIANT_GLYPH: Record<AccountVariant, string> = {
  checking: '🏦',
  savings: '🐖',
  credit: '💳',
};

const VARIANT_LABEL: Record<AccountVariant, string> = {
  checking: 'Checking',
  savings: 'Savings',
  credit: 'Credit',
};

/**
 * **V4 account card** — same props as {@link AccountCard} plus `typeLabels`.
 *
 * ## Four changes
 *
 * 1. **The card announces its balance.** `"Everyday Checking, Checking
 *    account"` on an `accessible` `Pressable` replaced the subtree, so a
 *    reader never heard the one number on the card. The name now carries the
 *    account, its type, the masked number and the balance.
 * 2. **An account type is identity, not status.** A savings account was drawn
 *    `success` and a credit account `accent` — a savings account is not
 *    "healthy", and the green sat directly beside a `MoneyAmount` whose green
 *    means income. The type is a glyph and a neutral chip; the accent ring is
 *    gone.
 * 3. **Press is a state layer**, not `opacity: 0.85`, which is inside M3's
 *    disabled band and made a held card read as an unavailable one.
 * 4. **The captions are `mutedText`** rather than `colors.muted`, a ramp step
 *    with no contrast promise at all.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function AccountCardV4({
  name,
  variant,
  balanceCents,
  currency = 'USD',
  accountNumber,
  icon,
  typeLabels,
  onPress,
  appearance = 'classic',
  style,
}: AccountCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const typeLabel = typeLabels?.[variant] ?? VARIANT_LABEL[variant];
  const masked = accountNumber != null ? maskAccountNumber(accountNumber) : null;

  // Appearance overrides the Card's default surface; classic → the Card's own
  // outlined look, unchanged.
  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  const spoken = spokenLine([
    name,
    typeLabel,
    masked,
    formatMoney(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency),
  ]);

  const body = (pressed: boolean): React.ReactElement => (
    <CardV4 style={[surface, pressed ? { backgroundColor: pressFill(theme) } : null, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {/*
          A neutral badge, not a tinted ring in the variant's accent: the kind
          of account is identity, and identity gets a glyph and a shape rather
          than one of the three colours that mean status in this module.
        */}
        <IconV4 glyph={icon ?? VARIANT_GLYPH[variant]} color="onSurface" size="lg" badge="soft" />
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
          >
            <TextV4
              size="base"
              weight="semibold"
              tone="onSurface"
              numberOfLines={1}
              style={{ flexShrink: 1 }}
            >
              {name}
            </TextV4>
            <BadgeV4 tone={IDENTITY_TONE} {...BADGE_V4}>
              {typeLabel}
            </BadgeV4>
          </View>
          {masked != null ? (
            <TextV4 size="xs" tone="mutedText" numeric="tabular">
              {masked}
            </TextV4>
          ) : null}
        </View>
      </View>
      <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
        <TextV4 size="xs" tone="mutedText">
          Balance
        </TextV4>
        <MoneyAmountV4 cents={balanceCents} currency={currency} tone="neutral" size="lg" />
      </View>
    </CardV4>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={spoken}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.lg }}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}

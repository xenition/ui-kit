import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon } from '../primitives';
import { formatMoney, type MoneyFormatter } from './internal/format';
import { GradientSurface } from './internal/GradientSurface';
import { brandGradient, brandInk, brandInkSoft, brandTile, brandBorder } from './internal/brand';

export interface AccountHeaderProps {
  /** Account holder or provider name. */
  accountName: string;
  /** Service address / account number line. */
  address?: string;
  /** Current balance owed, in integer **cents** (`<= 0` → all paid up). */
  balanceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Localized next-due date string. */
  dueDate?: string;
  /** Show an "AutoPay on" chip. */
  autoPay?: boolean;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  /** Pay button label (default "Pay bill"). Hidden when no `onPay` or nothing due. */
  payLabel?: string;
  /** Fires on the pay action. */
  onPay?: () => void;
  /** Fires when the profile avatar is tapped. */
  onProfile?: () => void;
  /** Avatar glyph for the profile button. Default `'👤'`. */
  avatarGlyph?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The account home header: a calm brand-gradient panel with the account name, the
 * current balance (integer cents via `formatMoney`), the next due date + an
 * optional AutoPay chip, and a pay CTA. When the balance is `<= 0` it flips to an
 * "all paid up" state. Near-white ink and the gradient derive from the brand
 * ramp — no literals, restyles from the seed, light + dark. The one vivid surface
 * on an otherwise clean, trust-first screen.
 */
export function AccountHeader({
  accountName,
  address,
  balanceCents,
  currency = 'USD',
  dueDate,
  autoPay = false,
  formatMoney: format = formatMoney,
  payLabel = 'Pay bill',
  onPay,
  onProfile,
  avatarGlyph = '👤',
  style,
}: AccountHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = brandInk(r);
  const inkSoft = brandInkSoft(r);
  const owed = Math.max(0, Math.trunc(balanceCents || 0));
  const settled = owed <= 0;

  const Chip = ({ glyph, text }: { glyph: string; text: string }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.xs,
        borderRadius: tokens.radius.full,
        backgroundColor: brandTile(r),
        borderWidth: 1,
        borderColor: brandBorder(r),
      }}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
        {glyph}
      </Text>
      <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{text}</Text>
    </View>
  );

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface colors={brandGradient(r)} style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
              {accountName}
            </Text>
            {address ? (
              <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, marginTop: 2 }}>
                {address}
              </Text>
            ) : null}
          </View>
          {onProfile ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open profile"
              onPress={onProfile}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: brandTile(r, 0.22),
                borderWidth: 1,
                borderColor: brandBorder(r),
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
                {avatarGlyph}
              </Text>
            </Pressable>
          ) : null}
        </View>

        <View style={{ marginTop: tokens.spacing.lg }}>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {settled ? 'Balance' : 'Current balance'}
          </Text>
          <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale['3xl'] * 1.3, fontWeight: '800', letterSpacing: -1, marginTop: 2 }}>
            {settled ? format(0, currency) : format(owed, currency)}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
          {settled ? (
            <Chip glyph="✓" text="All paid up" />
          ) : dueDate ? (
            <Chip glyph="🗓️" text={`Due ${dueDate}`} />
          ) : null}
          {autoPay ? <Chip glyph="🔁" text="AutoPay on" /> : null}
        </View>

        {onPay && !settled ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${payLabel}, ${format(owed, currency)}`}
            onPress={onPay}
            style={({ pressed }) => ({
              marginTop: tokens.spacing.lg,
              paddingVertical: tokens.spacing.md,
              borderRadius: tokens.radius.md,
              alignItems: 'center',
              backgroundColor: ink,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
              {`${payLabel} · ${format(owed, currency)}`}
            </Text>
          </Pressable>
        ) : null}
      </GradientSurface>
    </View>
  );
}

import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney } from './internal';
import { GradientSurface } from './internal/GradientSurface';
import {
  registerCelebrate,
  registerInk,
  registerInkSoft,
  registerTile,
  registerBorder,
} from './internal/register';

export interface PaymentSuccessProps {
  /** Amount charged, in integer **cents** — the big near-white numeral. */
  amountCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Tender label, e.g. `"Visa ···4242"` — shown as a frosted tile when set. */
  method?: string;
  /** Change owed back to the customer (cash sales), in integer **cents**. Shown as a frosted tile when `> 0`. */
  changeDueCents?: number;
  /** Headline over the celebration (default `"Payment complete"`). */
  title?: string;
  /** Fires on the primary "Print receipt" action. Shown only when set. */
  onReceipt?: () => void;
  /** Fires on the "Email receipt" action. Shown only when set. */
  onEmailReceipt?: () => void;
  /** Fires on the "New sale" action — the path back to the register. Shown only when set. */
  onNewSale?: () => void;
  /** Optional container style override. */
  style?: StyleProp<ViewStyle>;
}

/**
 * PaymentSuccess — the POS V4 "register" **peak-end**: the payment-complete
 * celebration. A two-hue celebratory gradient (`registerCelebrate`, accent →
 * primary) carries a big frosted ✓ glyph, the headline, and the **big near-white
 * amount** (integer cents via `formatMoney`). The tender `method` and any cash
 * `changeDueCents` read as frosted glass tiles; "Print receipt" / "Email receipt"
 * and "New sale" appear only when their handler is set. Every color derives from
 * the brand ramp via `useXenitionTheme()` — no literals, light + dark safe.
 */
export function PaymentSuccess({
  amountCents,
  currency = 'USD',
  method,
  changeDueCents,
  title = 'Payment complete',
  onReceipt,
  onEmailReceipt,
  onNewSale,
  style,
}: PaymentSuccessProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = registerInk(r);
  const inkSoft = registerInkSoft(r);
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const change = Math.max(0, Math.trunc(changeDueCents || 0));

  const Tile = ({ label, value }: { label: string; value: string }) => (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        gap: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: registerTile(r),
        borderWidth: 1,
        borderColor: registerBorder(r),
      }}
    >
      <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{label}</Text>
      <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
        {value}
      </Text>
    </View>
  );

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={registerCelebrate(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.xl, overflow: 'hidden', alignItems: 'center' }}
      >
        <View
          accessible
          accessibilityRole="image"
          accessibilityLabel={title}
          style={{
            width: 64,
            height: 64,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: registerTile(r, 0.22),
            borderWidth: 1,
            borderColor: registerBorder(r),
          }}
        >
          <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>
            ✓
          </Text>
        </View>

        <Text style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800', marginTop: tokens.spacing.md }}>
          {title}
        </Text>

        <Text
          accessibilityLabel={`Charged ${formatMoney(amount, currency)}`}
          allowFontScaling={false}
          style={{
            color: ink,
            fontSize: tokens.typography.scale['3xl'] * 1.35,
            fontWeight: '800',
            letterSpacing: -1,
            marginTop: tokens.spacing.xs,
          }}
        >
          {formatMoney(amount, currency)}
        </Text>

        {method || change > 0 ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg, width: '100%' }}>
            {method ? <Tile label="Method" value={method} /> : null}
            {change > 0 ? <Tile label="Change due" value={formatMoney(change, currency)} /> : null}
          </View>
        ) : null}

        {onReceipt || onEmailReceipt || onNewSale ? (
          <View style={{ width: '100%', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }}>
            {onReceipt ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Print receipt"
                onPress={onReceipt}
                style={({ pressed }) => ({
                  minHeight: 44,
                  paddingVertical: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: ink,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
                  Print receipt
                </Text>
              </Pressable>
            ) : null}
            {onEmailReceipt ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Email receipt"
                onPress={onEmailReceipt}
                style={({ pressed }) => ({
                  minHeight: 44,
                  paddingVertical: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: registerBorder(r),
                  backgroundColor: registerTile(r),
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Text style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>Email receipt</Text>
              </Pressable>
            ) : null}
            {onNewSale ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="New sale"
                onPress={onNewSale}
                style={({ pressed }) => ({
                  minHeight: 44,
                  paddingVertical: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>New sale</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}

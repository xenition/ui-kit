import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney } from './internal';
import { GradientSurface } from './internal/GradientSurface';
import {
  registerGradient,
  registerInk,
  registerInkSoft,
  registerTile,
  registerBorder,
} from './internal/register';

export interface RegisterHeaderProps {
  /** Store / location name — the primary line. */
  storeName: string;
  /** Register / terminal label, e.g. `"Register 2"`. Shown next to the store name when set. */
  registerLabel?: string;
  /** Cashier on the terminal. Shown as a subline when set. */
  cashierName?: string;
  /** Whether the shift/drawer is open — drives the frosted status pill (`Shift open` vs `Shift closed`). */
  shiftOpen?: boolean;
  /** Current open-order total, in integer **cents** — the near-white running total. Shown when set. */
  runningTotalCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Fires on the menu / overflow action. Shown only when set. */
  onMenu?: () => void;
  /** Fires on the shift action (open/close/manage). The status pill becomes a button when set. */
  onShift?: () => void;
  /** Optional container style override. */
  style?: StyleProp<ViewStyle>;
}

/**
 * RegisterHeader — the POS V4 "register" **terminal header**. A confident brand
 * gradient (`registerGradient`) carries the store name + `registerLabel`, the
 * `cashierName` subline, a frosted shift-status pill (open/closed by word, not
 * color alone), and the **near-white running total** of the open order (integer
 * cents via `formatMoney`). An optional menu button sits top-right; the shift pill
 * becomes a button when `onShift` is set. Every color derives from the brand ramp
 * via `useXenitionTheme()` — no literals, light + dark safe.
 */
export function RegisterHeader({
  storeName,
  registerLabel,
  cashierName,
  shiftOpen,
  runningTotalCents,
  currency = 'USD',
  onMenu,
  onShift,
  style,
}: RegisterHeaderProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = registerInk(r);
  const inkSoft = registerInkSoft(r);
  const hasShift = typeof shiftOpen === 'boolean';
  const shiftText = shiftOpen ? 'Shift open' : 'Shift closed';
  const shiftGlyph = shiftOpen ? '●' : '○';
  const total = typeof runningTotalCents === 'number' ? Math.max(0, Math.trunc(runningTotalCents)) : undefined;

  const pillStyle: ViewStyle = {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    minHeight: 44,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.xs,
    borderRadius: tokens.radius.full,
    backgroundColor: registerTile(r),
    borderWidth: 1,
    borderColor: registerBorder(r),
  };

  const shiftPillContent = (
    <>
      <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
        {shiftGlyph}
      </Text>
      <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{shiftText}</Text>
    </>
  );

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={registerGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
              <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
                {storeName}
              </Text>
              {registerLabel ? (
                <Text
                  numberOfLines={1}
                  style={{
                    color: ink,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                    borderRadius: tokens.radius.full,
                    backgroundColor: registerTile(r),
                    borderWidth: 1,
                    borderColor: registerBorder(r),
                    overflow: 'hidden',
                  }}
                >
                  {registerLabel}
                </Text>
              ) : null}
            </View>
            {cashierName ? (
              <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, marginTop: 2 }}>
                {cashierName}
              </Text>
            ) : null}
          </View>

          {onMenu ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open menu"
              onPress={onMenu}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: registerTile(r, 0.22),
                borderWidth: 1,
                borderColor: registerBorder(r),
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
                ⋯
              </Text>
            </Pressable>
          ) : null}
        </View>

        {hasShift ? (
          <View style={{ marginTop: tokens.spacing.md }}>
            {onShift ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${shiftText}. Manage shift`}
                onPress={onShift}
                style={({ pressed }) => ({ ...pillStyle, opacity: pressed ? 0.85 : 1 })}
              >
                {shiftPillContent}
              </Pressable>
            ) : (
              <View accessible accessibilityLabel={shiftText} style={pillStyle}>
                {shiftPillContent}
              </View>
            )}
          </View>
        ) : null}

        {typeof total === 'number' ? (
          <View style={{ marginTop: tokens.spacing.lg }}>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>Open order</Text>
            <Text
              accessibilityLabel={`Running total ${formatMoney(total, currency)}`}
              allowFontScaling={false}
              style={{ color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -1, marginTop: 2 }}
            >
              {formatMoney(total, currency)}
            </Text>
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}

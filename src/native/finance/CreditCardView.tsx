import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { Gradient } from './internal/Gradient';
import { maskCardNumber } from './internal/mask';

/** Card network — drives only the corner label, never a literal brand color. */
export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'generic';

/** Which token ramp paints the gradient face. */
export type CreditCardVariant = 'primary' | 'accent' | 'dark';

export interface CreditCardViewProps {
  /** Cardholder name (rendered upper-cased). */
  holder: string;
  /** Full or partial card number; displayed masked to the last four. */
  number: string;
  /** Expiry string, already formatted (e.g. `"08/28"`). */
  expiry?: string;
  /** Card network label (default `generic`). */
  brand?: CardBrand;
  /** Gradient ramp for the face (default `primary`). */
  variant?: CreditCardVariant;
  /**
   * Surface treatment applied to the card's OUTER container — the gradient face
   * is always kept; this only adds an optional elevation / border frame around
   * it. Defaults to `classic`, which adds nothing (the face is unchanged).
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

const BRAND_LABEL: Record<CardBrand, string> = {
  visa: 'VISA',
  mastercard: 'Mastercard',
  amex: 'AMEX',
  generic: 'CARD',
};

/**
 * A realistic card face: a two-stop gradient painted from **theme ramp tokens**
 * (never literal brand colors), the masked number in a monospace-tabular row,
 * and holder / expiry / network footer. The gradient uses
 * `expo-linear-gradient` when present and degrades to a solid token fill
 * otherwise. `variant` picks the ramp (`primary` / `accent` / `dark`-neutral);
 * the number is masked to the last four via {@link maskCardNumber}. Foreground
 * text uses the ramp's on-color token so it stays legible on the fill.
 */
export function CreditCardView({
  holder,
  number,
  expiry,
  brand = 'generic',
  variant = 'primary',
  appearance = 'classic',
  style,
}: CreditCardViewProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  // Optional frame around the gradient face (elevation / border). The face
  // itself is untouched; classic adds nothing. Radius/padding stay AFTER.
  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  const ramp =
    variant === 'accent' ? tokens.ramps.accent : variant === 'dark' ? tokens.ramps.neutral : tokens.ramps.primary;
  // Two-stop diagonal from a mid ramp step to a darker one — all token hexes.
  const stops = [ramp[500], ramp[variant === 'dark' ? 900 : 700]] as const;
  // On a saturated fill the light on-primary/on-accent token reads best.
  const ink = variant === 'accent' ? colors.onAccent : variant === 'dark' ? colors.onSurface : colors.onPrimary;
  const inkMuted = ink;

  return (
    <Gradient
      colors={stops}
      style={[
        surface,
        {
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          minHeight: 190,
          justifyContent: 'space-between',
        },
        style,
      ]}
    >
      <View
        accessibilityRole="image"
        accessibilityLabel={`${BRAND_LABEL[brand]} card ending ${number.replace(/\D+/g, '').slice(-4) || 'unknown'}`}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: 28,
              borderRadius: tokens.radius.sm,
              backgroundColor: colors.warn,
              opacity: 0.9,
            }}
          />
          <Text style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700', letterSpacing: 1 }}>
            {BRAND_LABEL[brand]}
          </Text>
        </View>
      </View>

      <Text
        style={{
          color: ink,
          fontSize: tokens.typography.scale.xl,
          fontWeight: '600',
          letterSpacing: 2,
          fontVariant: ['tabular-nums'],
        }}
      >
        {maskCardNumber(number)}
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <View>
          <Text style={{ color: inkMuted, fontSize: tokens.typography.scale.xs, opacity: 0.8 }}>CARD HOLDER</Text>
          <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {holder.toUpperCase()}
          </Text>
        </View>
        {expiry != null ? (
          <View>
            <Text style={{ color: inkMuted, fontSize: tokens.typography.scale.xs, opacity: 0.8 }}>EXPIRES</Text>
            <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{expiry}</Text>
          </View>
        ) : null}
      </View>
    </Gradient>
  );
}

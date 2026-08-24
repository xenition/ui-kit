import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon } from '../primitives';
import { Sparkline } from '../charts';
import { usePressScale } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { MoneyAmount } from '../finance/MoneyAmount';
import { changeGlyph, changeToneKey, formatPct, formatToken } from './internal/format';
import type { TokenRowProps } from './TokenRow';

/** Same public contract as {@link TokenRow} — a drop-in alternate design. */
export type TokenRowV2Props = TokenRowProps;

/** Change → contrast-safe TEXT slot (gains `successText`, losses `dangerText`). */
function changeToneTextKey(delta: number): keyof SemanticColors {
  const safe = Number.isFinite(delta) ? delta : 0;
  if (safe > 0) return 'successText';
  if (safe < 0) return 'dangerText';
  return 'muted';
}

/**
 * TokenRow, redesigned (v2): an **elevated card** with a tinted token disc, a
 * derived {@link Sparkline}, and a toned change pill. The sparkline shape is
 * synthesized from `changePct` (it slopes up for gains, down for losses — no new
 * data needed), tinted with the semantic fill slot; the 24h change reads in the
 * contrast-safe `successText`/`dangerText` slots with a ▲/▼ glyph so it is never
 * color-only. Fiat runs through {@link MoneyAmount} (integer cents — no drift).
 * Distinct at a glance from v1's flat list line. Same props.
 */
export function TokenRowV2({
  symbol,
  name,
  amount,
  decimals = 4,
  valueCents,
  currency = 'USD',
  changePct,
  icon,
  iconColor = 'primary',
  onPress,
  style,
}: TokenRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const hasChange = changePct != null;
  const fillTone = changeToneKey(changePct ?? 0);
  const textTone = changeToneTextKey(changePct ?? 0);

  // Synthesize a small trend shape from the 24h change — a presentational cue
  // derived from the only signal we have, so no extra prop is introduced.
  const spark = React.useMemo(() => {
    const c = Number.isFinite(changePct ?? 0) ? changePct ?? 0 : 0;
    const slope = Math.max(-1, Math.min(1, c / 12));
    return Array.from({ length: 14 }, (_, i) => {
      const t = i / 13 - 0.5;
      const base = 0.55 + slope * t;
      const wobble = Math.sin(i * 1.35) * 0.055;
      return Math.max(0.06, base + wobble);
    });
  }, [changePct]);

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          backgroundColor: colors.surface,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors[iconColor], 0.12),
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {icon != null ? (
          <Icon glyph={icon} color={iconColor} size="lg" />
        ) : (
          <Text style={{ color: colors[iconColor], fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {symbol.slice(0, 3).toUpperCase()}
          </Text>
        )}
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {symbol}
        </Text>
        {name != null ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {name}
          </Text>
        ) : null}
      </View>

      <Sparkline
        data={spark}
        color={fillTone}
        height={28}
        style={{ width: 56 }}
        accessibilityLabel={`${symbol} trend`}
      />

      <View style={{ alignItems: 'flex-end', gap: 4, minWidth: 76 }}>
        {valueCents != null ? (
          <MoneyAmount cents={valueCents} currency={currency} tone="neutral" size="sm" />
        ) : (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', fontVariant: ['tabular-nums'] }}>
            {formatToken(amount, { decimals, symbol })}
          </Text>
        )}
        {hasChange ? (
          <View
            style={{
              backgroundColor: withAlpha(colors[fillTone], 0.14),
              borderRadius: tokens.radius.full,
              paddingVertical: 2,
              paddingHorizontal: tokens.spacing.xs,
            }}
          >
            <Text
              accessibilityLabel={`${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct ?? 0))}`}
              style={{ color: colors[textTone], fontSize: tokens.typography.scale.xs, fontWeight: '700', fontVariant: ['tabular-nums'] }}
            >
              {changeGlyph(changePct ?? 0)} {formatPct(changePct ?? 0)}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${symbol} holding`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}

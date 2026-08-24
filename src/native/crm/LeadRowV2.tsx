import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import { formatMoney } from '../commerce/money';
import { TEMPERATURE_META, toneColor, clampPct } from './internal';
import type { LeadRowProps } from './LeadRow';

/** V2 accepts the exact same props as {@link LeadRow} — a drop-in replacement. */
export type LeadRowV2Props = LeadRowProps;

/**
 * LeadRow **design V2** — a *card* (not a dense line) with a prominent
 * hot/warm/cold *flame chip*: a tinted pill carrying the temperature glyph +
 * word, so heat reads instantly without relying on color. Avatar, name and
 * company lead; value and score sit in a right column. Elevated on a token
 * shadow, with a colored accent bar when `selected`. Same props as
 * {@link LeadRow}. Token-pure.
 */
export function LeadRowV2({
  name,
  company,
  temperature,
  valueCents,
  currency = 'USD',
  score,
  avatarUrl,
  selected = false,
  onPress,
  testID,
  style,
}: LeadRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const meta = TEMPERATURE_META[temperature];
  const tempColor = toneColor(colors, meta.tone);

  const card: React.ReactElement = (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
          borderLeftWidth: selected ? 4 : 0,
          borderLeftColor: selected ? colors.primary : colors.surface,
          transform: [{ scale: press.scale }],
        },
        shadow('sm', tokens),
        style,
      ]}
    >
      <Avatar size="md" name={name} src={avatarUrl} />

      <View style={{ flex: 1, gap: tokens.spacing.xs / 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        {company ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {company}
          </Text>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            gap: tokens.spacing.xs / 2,
            marginTop: tokens.spacing.xs / 2,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(tempColor, 0.12),
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: tempColor }}>{meta.glyph}</Text>
          <Text style={{ fontSize: tokens.typography.scale.xs, color: tempColor, fontWeight: '700' }}>{meta.label}</Text>
        </View>
      </View>

      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }}>
        {valueCents != null ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
            {formatMoney(valueCents, currency)}
          </Text>
        ) : null}
        {score != null ? (
          <Badge tone={meta.tone} variant="soft" size="sm">
            {`${clampPct(score)}`}
          </Badge>
        ) : null}
      </View>
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${meta.label} lead ${name}${company ? `, ${company}` : ''}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        testID={testID}
      >
        {card}
      </Pressable>
    );
  }
  return <View testID={testID}>{card}</View>;
}

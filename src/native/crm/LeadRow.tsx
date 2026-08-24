import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge } from '../primitives';
import { formatMoney } from '../commerce/money';
import { TEMPERATURE_META, toneColor, clampPct, type LeadTemperature } from './internal';

export interface LeadRowProps {
  /** Lead / person name. */
  name: string;
  /** Company or source line. */
  company?: string;
  /** Lead temperature — drives the glyph + word (never color alone). */
  temperature: LeadTemperature;
  /** Estimated value in integer **cents**. */
  valueCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Lead score 0–100, rendered as a badge. */
  score?: number;
  /** Avatar image URL; initials fallback from `name`. */
  avatarUrl?: string;
  /** Whether this row is selected/active (adds a leading accent bar). */
  selected?: boolean;
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Dense list row for a lead, keyed by **temperature** (`hot` 🔥 / `warm` ☀ /
 * `cold` ❄). Temperature is shown as a glyph *and* a label so it never relies
 * on color; the matching tone (danger/warn/primary) is only reinforcement.
 * Shows optional value (cents → `formatMoney`) and a score badge. All colors
 * are theme tokens.
 */
export function LeadRow({
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
}: LeadRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = TEMPERATURE_META[temperature];
  const tempColor = toneColor(colors, meta.tone);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${meta.label} lead ${name}${company ? `, ${company}` : ''}`}
      disabled={!onPress}
      onPress={onPress}
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ alignItems: 'center', width: 28 }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg, color: tempColor }}>
          {meta.glyph}
        </Text>
        <Text style={{ fontSize: tokens.typography.scale.xs, color: tempColor, fontWeight: '700' }}>{meta.label}</Text>
      </View>

      <Avatar size="sm" name={name} src={avatarUrl} />

      <View style={{ flex: 1, gap: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {name}
        </Text>
        {company ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {company}
          </Text>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }}>
        {valueCents != null ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {formatMoney(valueCents, currency)}
          </Text>
        ) : null}
        {score != null ? (
          <Badge tone={meta.tone} variant="soft" size="sm">
            {`${clampPct(score)}`}
          </Badge>
        ) : null}
      </View>
    </Pressable>
  );
}

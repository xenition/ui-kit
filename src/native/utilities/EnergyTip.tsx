import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge } from '../primitives';
import { formatMoney, type MoneyFormatter, withAlpha } from './internal/format';

/** Tip category — drives the leading glyph + label. */
export type EnergyTipCategory = 'heating' | 'cooling' | 'lighting' | 'water' | 'appliance' | 'general';

interface CategoryDescriptor {
  label: string;
  glyph: string;
}

const CATEGORY: Record<EnergyTipCategory, CategoryDescriptor> = {
  heating: { label: 'Heating', glyph: '🔥' },
  cooling: { label: 'Cooling', glyph: '❄️' },
  lighting: { label: 'Lighting', glyph: '💡' },
  water: { label: 'Water', glyph: '💧' },
  appliance: { label: 'Appliances', glyph: '🔌' },
  general: { label: 'Tip', glyph: '🌱' },
};

export interface EnergyTipProps {
  /** Tip headline (e.g. "Lower your thermostat 2°"). */
  title: string;
  /** Supporting explanation. */
  body?: string;
  /** Tip category — drives the glyph + label (default `general`). */
  category?: EnergyTipCategory;
  /** Estimated monthly saving in integer **cents** (shown as a badge). */
  savingsCents?: number;
  /** Effort/impact hint. */
  effort?: 'easy' | 'moderate' | 'project';
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires on card press (e.g. open the full tip); becomes a button when supplied. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const EFFORT_LABEL: Record<NonNullable<EnergyTipProps['effort']>, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  project: 'Project',
};

/**
 * An energy-saving tip card: a tinted category glyph disc, a headline + body, an
 * optional effort tag, and an optional estimated monthly saving badge. The
 * saving is integer cents via `formatMoney`, so the printed figure never drifts.
 * Becomes a button only when `onPress` is supplied. Every color traces to a
 * `SemanticColors` slot or a `ramps`-derived tint — no literals.
 */
export function EnergyTip({
  title,
  body,
  category = 'general',
  savingsCents,
  effort,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onPress,
  style,
}: EnergyTipProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cd = CATEGORY[category] ?? CATEGORY.general;
  const savings = savingsCents != null ? Math.max(0, Math.trunc(savingsCents)) : null;

  const card = (
    <Card variant={onPress ? 'interactive' : 'outlined'} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.success, 0.14),
          }}
        >
          <Icon glyph={cd.glyph} size="lg" accessibilityLabel={cd.label} />
        </View>
        <View style={{ flex: 1, gap: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {cd.label.toUpperCase()}
            </Text>
            {effort != null ? (
              <Badge tone="neutral" variant="soft" size="sm">
                {EFFORT_LABEL[effort]}
              </Badge>
            ) : null}
          </View>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {title}
          </Text>
          {body != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{body}</Text>
          ) : null}
          {savings != null ? (
            <View style={{ marginTop: 2 }}>
              <Badge tone="success" variant="soft" size="sm">
                {`Save ~${format(savings, currency)}/mo`}
              </Badge>
            </View>
          ) : null}
        </View>
      </View>
    </Card>
  );

  if (!onPress) return card;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${cd.label} tip: ${title}${savings != null ? `, save about ${format(savings, currency)} per month` : ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {card}
    </Pressable>
  );
}

import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge } from '../primitives';
import { formatMoney } from './internal/format';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';
import type { EnergyTipProps, EnergyTipCategory } from './EnergyTip';

/** Drop-in for {@link EnergyTipProps} — same props, a different design. */
export type EnergyTipV4Props = EnergyTipProps;

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

const EFFORT_LABEL: Record<NonNullable<EnergyTipProps['effort']>, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  project: 'Project',
};

/**
 * EnergyTip — **V4** design. A clean, elevated tip card: the category glyph in
 * the signature brand-gradient disc, a category eyebrow + optional effort tag, a
 * headline + body, and an optional estimated monthly saving badge (integer cents
 * via `formatMoney`, so the figure never drifts). Becomes a button only when
 * `onPress` is supplied. Same props/categories as {@link EnergyTipProps};
 * token-only colors.
 */
export function EnergyTipV4({
  title,
  body,
  category = 'general',
  savingsCents,
  effort,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onPress,
  style,
}: EnergyTipV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const cd = CATEGORY[category] ?? CATEGORY.general;
  const savings = savingsCents != null ? Math.max(0, Math.trunc(savingsCents)) : null;

  const cardStyle = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  const card = (
    <View style={[cardStyle, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}>
        <GradientSurface
          colors={brandDisc(r)}
          style={{ width: 44, height: 44, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
          <Icon glyph={cd.glyph} size="lg" accessibilityLabel={cd.label} style={{ color: brandInk(r) }} />
        </GradientSurface>
        <View style={{ flex: 1, gap: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
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
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>{body}</Text>
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
    </View>
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

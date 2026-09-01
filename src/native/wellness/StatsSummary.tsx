import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface WellnessStat {
  label: string;
  value: React.ReactNode;
  unit?: string;
  glyph?: string;
}

export interface StatsSummaryProps {
  stats: WellnessStat[];
  style?: StyleProp<ViewStyle>;
}

/**
 * StatsSummary — an overview row of headline numbers on a clean card, split by
 * thin border dividers. Each stat shows an optional glyph, a big value with a
 * muted unit, and a muted label. Restraint is the point: the card stays surface
 * + border, and only the first stat's value picks up the primary accent — one
 * colored number, not a rainbow. Token-only colors.
 */
export function StatsSummary({ stats, style }: StatsSummaryProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      accessibilityRole="summary"
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          flexDirection: 'row',
          alignItems: 'stretch',
        },
        style,
      ]}
    >
      {stats.map((stat, i) => (
        <React.Fragment key={`${stat.label}-${i}`}>
          {i > 0 ? (
            <View style={{ width: 1, alignSelf: 'stretch', backgroundColor: colors.border, marginHorizontal: tokens.spacing.md }} />
          ) : null}
          <View
            accessibilityLabel={`${stat.label}: ${typeof stat.value === 'string' || typeof stat.value === 'number' ? stat.value : ''}${stat.unit ? ' ' + stat.unit : ''}`}
            style={{ flex: 1, alignItems: 'center', gap: tokens.spacing.xs }}
          >
            {stat.glyph ? (
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
                {stat.glyph}
              </Text>
            ) : null}
            <Text style={{ textAlign: 'center' }}>
              <Text
                style={{
                  color: i === 0 ? colors.primary : colors.onSurface,
                  fontSize: tokens.typography.scale['2xl'],
                  fontWeight: '800',
                }}
              >
                {stat.value}
              </Text>
              {stat.unit ? (
                <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                  {' '}
                  {stat.unit}
                </Text>
              ) : null}
            </Text>
            <Text
              numberOfLines={1}
              style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}
            >
              {stat.label}
            </Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
}

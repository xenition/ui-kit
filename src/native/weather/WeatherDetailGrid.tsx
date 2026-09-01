import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { GradientSurface } from './internal/GradientSurface';
import { skyGradient, skyInk } from './internal/v4-sky';

export interface WeatherDetailItem {
  /** Metric name, e.g. `'Humidity'`. */
  label: string;
  /** The value (already formatted). */
  value: React.ReactNode;
  /** Unit/suffix rendered muted after the value (e.g. `'%'`, `'km/h'`). */
  unit?: string;
  /** Leading glyph (e.g. `'💧'`). Decorative; the label carries the meaning. */
  glyph?: string;
  /** Secondary caption under the label. */
  caption?: string;
}

export interface WeatherDetailGridProps {
  /** The metric rows to render. */
  items: WeatherDetailItem[];
  /** Rows grouped per card. Default `3` (so 6 items → 2 cards). */
  perCard?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * WeatherDetailGrid — weather detail metrics grouped into elevated cards. Instead
 * of many loose tiles, the items are chunked `perCard` at a time (default 3) into
 * clean list cards: each row is a glyph badge + label/caption on the left and a
 * big value + unit on the right, separated by hairline dividers. Every color is a
 * semantic token (`card`/`onSurface`/`mutedText`/`border`), so it adapts to light
 * AND dark; the glyph badge is a brand-ramp gradient. No literal colors.
 */
export function WeatherDetailGrid({ items, perCard = 3, style }: WeatherDetailGridProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const size = Math.max(1, perCard);
  const groups: WeatherDetailItem[][] = [];
  for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size));
  const badge = tokens.typography.scale.lg + tokens.spacing.sm;

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      {groups.map((group, gi) => (
        <View
          key={gi}
          style={{
            backgroundColor: colors.card,
            borderRadius: tokens.radius.lg,
            paddingHorizontal: tokens.spacing.lg,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.1,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
          }}
        >
          {group.map((item, ri) => {
            const hasValue = item.value != null;
            const a11y = `${item.label}, ${hasValue ? `${item.value}${item.unit ? ' ' + item.unit : ''}` : 'no data'}`;
            return (
              <View
                key={`${item.label}-${ri}`}
                accessibilityRole="summary"
                accessibilityLabel={a11y}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: tokens.spacing.md,
                  paddingVertical: tokens.spacing.md,
                  borderTopWidth: ri === 0 ? 0 : 1,
                  borderTopColor: colors.border,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1, minWidth: 0 }}>
                  {item.glyph ? (
                    <GradientSurface
                      colors={skyGradient(r)}
                      style={{ width: badge, height: badge, borderRadius: tokens.radius.full, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
                    >
                      <Icon glyph={item.glyph} size="base" style={{ color: skyInk(r) }} />
                    </GradientSurface>
                  ) : null}
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
                      {item.label}
                    </Text>
                    {item.caption ? (
                      <Text numberOfLines={1} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs, marginTop: 1 }}>
                        {item.caption}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
                  {typeof item.value === 'string' || typeof item.value === 'number' || !hasValue ? (
                    <Text allowFontScaling={false} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
                      {hasValue ? item.value : '—'}
                    </Text>
                  ) : (
                    item.value
                  )}
                  {item.unit && hasValue ? (
                    <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>{item.unit}</Text>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';

/** `card` = bordered tile; `plain` = bare inline stat. */
export type WeatherStatVariant = 'card' | 'plain';

export interface WeatherStatProps {
  /** Metric name (e.g. `'Humidity'`). */
  label: string;
  /** The value (already formatted). */
  value?: React.ReactNode;
  /** Unit/suffix rendered muted after the value (e.g. `'%'`, `'hPa'`). */
  unit?: string;
  /** Leading glyph (e.g. `'💧'`). Decorative; the label carries the meaning. */
  glyph?: string;
  /** Secondary caption under the value (e.g. `'Dew point 12°'`). */
  caption?: string;
  /** Layout. Default `'card'`. */
  variant?: WeatherStatVariant;
  /** Placeholder shown when `value` is absent. Default `'—'`. */
  emptyValue?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Compact weather metric tile — humidity, pressure, visibility, dew point, etc.
 * A leading glyph, a muted label, a large token-scaled value with an optional
 * unit suffix, and a caption line. `variant='plain'` drops the card chrome for
 * use inside grids/rows. Renders a muted placeholder when `value` is absent.
 * All colors/sizes come from the compiled theme tokens via `useXenitionTheme()`
 * — no literal colors.
 */
export function WeatherStat({
  label,
  value,
  unit,
  glyph,
  caption,
  variant = 'card',
  emptyValue = '—',
  style,
}: WeatherStatProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasValue = value != null;

  const body = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        {glyph ? <Icon glyph={glyph} size="sm" /> : null}
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: tokens.spacing.xs,
          marginTop: tokens.spacing.xs,
        }}
      >
        {typeof value === 'string' || typeof value === 'number' || !hasValue ? (
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale['2xl'],
              fontWeight: '700',
            }}
          >
            {hasValue ? value : emptyValue}
          </Text>
        ) : (
          value
        )}
        {unit && hasValue ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.base,
              marginBottom: 2,
            }}
          >
            {unit}
          </Text>
        ) : null}
      </View>
      {caption ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            marginTop: tokens.spacing.xs,
          }}
        >
          {caption}
        </Text>
      ) : null}
    </>
  );

  const a11y = `${label}, ${hasValue ? `${value}${unit ? ' ' + unit : ''}` : 'no data'}`;

  if (variant === 'plain') {
    return (
      <View accessibilityRole="summary" accessibilityLabel={a11y} style={style}>
        {body}
      </View>
    );
  }

  return (
    <Card variant="outlined" style={style} accessibilityRole="summary" accessibilityLabel={a11y}>
      {body}
    </Card>
  );
}

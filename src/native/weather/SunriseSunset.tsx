import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { clamp, withAlpha } from './weather-utils';

export interface SunriseSunsetProps {
  /** Sunrise time label (e.g. `'6:42 AM'`). */
  sunrise?: string;
  /** Sunset time label (e.g. `'7:58 PM'`). */
  sunset?: string;
  /**
   * Daylight progress 0–1 (fraction of the day elapsed between sunrise and
   * sunset). Positions the sun marker on the arc. Default `0.5`.
   */
  progress?: number;
  /** Height of the arc area in px. Default `72`. */
  arcHeight?: number;
  /** Message shown when both times are absent. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Sunrise / sunset card with a static daylight arc. The arc is a
 * dependency-free row of token-tinted dots forming a dome; the sun marker sits
 * at `progress` along it. Sunrise and sunset are labelled with glyphs + times,
 * so the info never relies on the arc alone. Renders a muted empty state when
 * both times are absent. All colors/sizes come from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors, no SVG/native deps.
 */
export function SunriseSunset({
  sunrise,
  sunset,
  progress = 0.5,
  arcHeight = 72,
  emptyLabel = 'Sun times unavailable',
  style,
}: SunriseSunsetProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (sunrise == null && sunset == null) {
    return (
      <Card variant="outlined" style={style} accessibilityRole="summary">
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {emptyLabel}
        </Text>
      </Card>
    );
  }

  const p = clamp(progress, 0, 1);
  const DOTS = 11;
  const height = clamp(arcHeight, 40, 200);

  return (
    <Card
      variant="outlined"
      style={style}
      accessibilityRole="summary"
      accessibilityLabel={`Sunrise ${sunrise ?? 'unknown'}, sunset ${sunset ?? 'unknown'}`}
    >
      <View style={{ height, justifyContent: 'flex-end' }}>
        {/* Static dome of dots — each dot's vertical offset traces a parabola. */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height,
          }}
        >
          {Array.from({ length: DOTS }).map((_, i) => {
            const t = i / (DOTS - 1);
            const dome = Math.sin(t * Math.PI); // 0→1→0
            const active = t <= p;
            const dotSize = 6;
            return (
              <View
                key={i}
                style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: dotSize / 2,
                  marginBottom: dome * (height - dotSize * 2),
                  backgroundColor: active
                    ? colors.accent
                    : withAlpha(colors.accent, 0.25),
                }}
              />
            );
          })}
        </View>
        {/* Sun marker positioned along the dome. */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: `${p * 100}%`,
            bottom: Math.sin(p * Math.PI) * (height - 12),
            marginLeft: -9,
          }}
        >
          <Icon glyph="☀️" size="lg" accessibilityLabel="Sun position" />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: tokens.spacing.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph="🌅" size="sm" accessibilityLabel="Sunrise" />
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
            {sunrise ?? '—'}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph="🌇" size="sm" accessibilityLabel="Sunset" />
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
            {sunset ?? '—'}
          </Text>
        </View>
      </View>
    </Card>
  );
}

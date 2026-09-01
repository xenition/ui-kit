import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { clamp, withAlpha } from './weather-utils';
import type { SunriseSunsetProps } from './SunriseSunset';

/** Drop-in for {@link SunriseSunsetProps} — same props, a different design. */
export type SunriseSunsetV4Props = SunriseSunsetProps;

/**
 * SunriseSunset — **elevated white card** design (v4). A polished card carrying a
 * static daylight arc: a dependency-free dome of token-tinted dots with the sun
 * marker positioned at `progress` along it. The arc highlight uses `accent`; the
 * track uses `border`/`withAlpha`. Sunrise and sunset are labelled with glyphs +
 * times below, so the info never relies on the arc alone. Renders a muted empty
 * state when both times are absent. All colors/sizes come from the compiled theme
 * tokens via `useXenitionTheme()` — no literal colors, no SVG/native deps. Same
 * props as {@link SunriseSunsetProps}.
 */
export function SunriseSunsetV4({
  sunrise,
  sunset,
  progress = 0.5,
  arcHeight = 72,
  emptyLabel = 'Sun times unavailable',
  style,
}: SunriseSunsetV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  if (sunrise == null && sunset == null) {
    return (
      <View style={[card, style]} accessibilityRole="summary">
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.base }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const p = clamp(progress, 0, 1);
  const DOTS = 11;
  const height = clamp(arcHeight, 40, 200);

  return (
    <View
      style={[card, style]}
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
            const dotSize = 7;
            return (
              <View
                key={i}
                style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: dotSize / 2,
                  marginBottom: dome * (height - dotSize * 2),
                  backgroundColor: active ? colors.accent : withAlpha(colors.border, 0.9),
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
            marginLeft: -11,
          }}
        >
          <Icon
            glyph="☀️"
            size="xl"
            accessibilityLabel="Sun position"
            style={{ color: colors.accent }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: tokens.spacing.md,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph="🌅" size="base" accessibilityLabel="Sunrise" />
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.base,
              fontWeight: '600',
            }}
          >
            {sunrise ?? '—'}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph="🌇" size="base" accessibilityLabel="Sunset" />
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.base,
              fontWeight: '600',
            }}
          >
            {sunset ?? '—'}
          </Text>
        </View>
      </View>
    </View>
  );
}

import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { clamp, withAlpha } from './weather-utils';
import type { WindCompassProps } from './WindCompass';

/** Drop-in for {@link WindCompassProps} — same props, a different design. */
export type WindCompassV4Props = WindCompassProps;

const CARDINALS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;

/** Nearest 8-point cardinal name for a bearing in degrees. */
function cardinalFor(deg: number): string {
  const idx = Math.round((((deg % 360) + 360) % 360) / 45) % 8;
  return CARDINALS[idx] ?? 'N';
}

/**
 * WindCompass — **elevated card** design (v4). A polished white card carrying a
 * bigger, cleaner dependency-free dial: a token-ringed compass with N/E/S/W tick
 * labels and a rotated arrow (`transform: rotate`) showing the bearing, the
 * sustained speed centred on a soft token-tinted hub, and an optional gust
 * caption. The cardinal direction is also written out as text, so orientation
 * never relies on the arrow alone. Every color/size traces to the compiled theme
 * via `useXenitionTheme()` — no literal colors, no SVG/native deps. Same props as
 * {@link WindCompassProps}.
 */
export function WindCompassV4({
  direction = 0,
  speed,
  gust,
  unit = 'mph',
  size = 120,
  style,
}: WindCompassV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const deg = ((direction % 360) + 360) % 360;
  const cardinal = cardinalFor(deg);
  const dial = clamp(size, 72, 400);
  const arrowLen = dial * 0.4;

  const surface: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.card,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.12,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  const tick = (pos: 'top' | 'bottom' | 'left' | 'right', letter: string) => (
    <Text
      style={{
        position: 'absolute',
        [pos]: 6,
        color: letter === 'N' ? colors.primary : colors.mutedText,
        fontSize: tokens.typography.scale.xs,
        fontWeight: letter === 'N' ? '800' : '600',
      }}
    >
      {letter}
    </Text>
  );

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={`Wind from ${cardinal}, ${deg} degrees${
        speed != null ? `, ${speed} ${unit}` : ''
      }${gust != null ? `, gusting ${gust} ${unit}` : ''}`}
      style={surface}
    >
      <View style={{ alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: dial,
            height: dial,
            borderRadius: dial / 2,
            borderWidth: 3,
            borderColor: colors.border,
            backgroundColor: withAlpha(colors.primary, 0.15),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Cardinal ticks. */}
          {tick('top', 'N')}
          {tick('bottom', 'S')}
          {tick('left', 'W')}
          {tick('right', 'E')}

          {/* Rotated arrow (pure transform, dependency-free). */}
          <View
            style={{
              width: 3,
              height: arrowLen,
              transform: [{ rotate: `${deg}deg` }],
            }}
          >
            <View
              style={{
                width: 0,
                height: 0,
                alignSelf: 'center',
                borderLeftWidth: 6,
                borderRightWidth: 6,
                borderBottomWidth: 10,
                borderLeftColor: withAlpha(colors.primary, 0),
                borderRightColor: withAlpha(colors.primary, 0),
                borderBottomColor: colors.primary,
              }}
            />
            <View style={{ flex: 1, width: 3, alignSelf: 'center', backgroundColor: colors.primary }} />
          </View>

          {/* Centre hub label. */}
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              width: dial * 0.5,
              height: dial * 0.5,
              borderRadius: dial * 0.25,
              backgroundColor: colors.card,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: colors.onSurface,
                fontSize: tokens.typography.scale.xl,
                fontWeight: '800',
              }}
            >
              {speed != null ? speed : '—'}
            </Text>
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
              {unit}
            </Text>
          </View>
        </View>

        <Text
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          From {cardinal} ({deg}°)
        </Text>
        {gust != null ? (
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
            Gusts {gust} {unit}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

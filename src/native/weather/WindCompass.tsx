import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { clamp } from './weather-utils';

const CARDINALS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;

/** Nearest 8-point cardinal name for a bearing in degrees. */
function cardinalFor(deg: number): string {
  const idx = Math.round((((deg % 360) + 360) % 360) / 45) % 8;
  return CARDINALS[idx] ?? 'N';
}

export interface WindCompassProps {
  /** Wind bearing in degrees (0 = from North). Default `0`. */
  direction?: number;
  /** Sustained wind speed. */
  speed?: number;
  /** Peak gust speed. */
  gust?: number;
  /** Unit label for speed (e.g. `'mph'`, `'km/h'`). Default `'mph'`. */
  unit?: string;
  /** Diameter of the dial in px. Default `120`. */
  size?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Wind direction + speed dial. A dependency-free `View` compass: a token-bordered
 * ring with N/E/S/W tick labels and a rotated arrow (`transform: rotate`) showing
 * the bearing, with the sustained speed centred and an optional gust caption. The
 * cardinal direction is also written out as text, so orientation never relies on
 * the arrow alone. All colors/sizes come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors, no SVG/native deps.
 */
export function WindCompass({
  direction = 0,
  speed,
  gust,
  unit = 'mph',
  size = 120,
  style,
}: WindCompassProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const deg = ((direction % 360) + 360) % 360;
  const cardinal = cardinalFor(deg);
  const dial = clamp(size, 72, 400);
  const arrowLen = dial * 0.36;

  return (
    <Card
      variant="outlined"
      style={style}
      accessibilityRole="summary"
      accessibilityLabel={`Wind from ${cardinal}, ${deg} degrees${
        speed != null ? `, ${speed} ${unit}` : ''
      }${gust != null ? `, gusting ${gust} ${unit}` : ''}`}
    >
      <View style={{ alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: dial,
            height: dial,
            borderRadius: dial / 2,
            borderWidth: 2,
            borderColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Cardinal ticks. */}
          <Text
            style={{
              position: 'absolute',
              top: 4,
              color: colors.muted,
              fontSize: tokens.typography.scale.xs,
            }}
          >
            N
          </Text>
          <Text
            style={{
              position: 'absolute',
              bottom: 4,
              color: colors.muted,
              fontSize: tokens.typography.scale.xs,
            }}
          >
            S
          </Text>
          <Text
            style={{
              position: 'absolute',
              left: 4,
              color: colors.muted,
              fontSize: tokens.typography.scale.xs,
            }}
          >
            W
          </Text>
          <Text
            style={{
              position: 'absolute',
              right: 4,
              color: colors.muted,
              fontSize: tokens.typography.scale.xs,
            }}
          >
            E
          </Text>

          {/* Rotated arrow (pure transform, dependency-free). */}
          <View
            style={{
              width: 2,
              height: arrowLen,
              transform: [{ rotate: `${deg}deg` }],
            }}
          >
            <View
              style={{
                width: 0,
                height: 0,
                alignSelf: 'center',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderBottomWidth: 8,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: colors.primary,
              }}
            />
            <View style={{ flex: 1, width: 2, alignSelf: 'center', backgroundColor: colors.primary }} />
          </View>

          {/* Centre label. */}
          <View style={{ position: 'absolute', alignItems: 'center' }}>
            <Text
              style={{
                color: colors.onSurface,
                fontSize: tokens.typography.scale.lg,
                fontWeight: '800',
              }}
            >
              {speed != null ? speed : '—'}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {unit}
            </Text>
          </View>
        </View>

        <Text
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          From {cardinal} ({deg}°)
        </Text>
        {gust != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            Gusts {gust} {unit}
          </Text>
        ) : null}
      </View>
    </Card>
  );
}

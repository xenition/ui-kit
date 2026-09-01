import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { GradientSurface } from './internal/GradientSurface';
import { skyGradient, skyInk, skyInkSoft, skyTile } from './internal/v4-sky';

export interface LocationHeaderProps {
  /** Place name, e.g. `'New York City'`. */
  location: string;
  /** Secondary line under the location, e.g. `'Today, April 21'`. */
  date?: string;
  /** Trailing icon button handler; omit to hide the button. */
  onMenu?: () => void;
  /** Glyph for the trailing button. Default `'☰'`. */
  menuGlyph?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * LocationHeader — a rounded **sky** gradient header card (weather V4 line). A
 * pin glyph and the bold location sit over the gradient with the date beneath in
 * a softer ink; an optional circular translucent button trails on the right.
 * Reuses {@link GradientSurface} with `skyGradient` and the near-white sky inks,
 * exactly like the V4 exemplar, so the whole thing restyles from the seed and
 * never introduces a literal color.
 */
export function LocationHeader({
  location,
  date,
  onMenu,
  menuGlyph = '☰',
  style,
}: LocationHeaderProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = skyInk(r);
  const inkSoft = skyInkSoft(r);

  const surface = {
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    overflow: 'hidden' as const,
  };

  return (
    <View
      accessibilityRole="header"
      accessibilityLabel={date ? `${location}, ${date}` : location}
      style={[{ borderRadius: tokens.radius.lg }, style]}
    >
      <GradientSurface colors={skyGradient(r)} style={surface}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View style={{ flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.xs }}>
            <Icon glyph="📍" size="lg" style={{ color: ink }} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text
                numberOfLines={1}
                style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}
              >
                {location}
              </Text>
              {date ? (
                <Text
                  numberOfLines={1}
                  style={{
                    color: inkSoft,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    marginTop: tokens.spacing.xs,
                  }}
                >
                  {date}
                </Text>
              ) : null}
            </View>
          </View>
          {onMenu ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Menu"
              onPress={onMenu}
              style={({ pressed }) => ({
                width: 40,
                height: 40,
                borderRadius: tokens.radius.full,
                backgroundColor: skyTile(r),
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Icon glyph={menuGlyph} size="lg" style={{ color: ink }} />
            </Pressable>
          ) : null}
        </View>
      </GradientSurface>
    </View>
  );
}

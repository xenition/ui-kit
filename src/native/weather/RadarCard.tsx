import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { clamp, withAlpha } from './weather-utils';

export interface RadarCardProps {
  /** Card title. Default `'Radar'`. */
  title?: string;
  /** Caption under the title (e.g. `'Live · 2 min ago'`). */
  caption?: string;
  /** Height of the static radar canvas in px. Default `180`. */
  height?: number;
  /** Fired when the placeholder is tapped (e.g. open full-screen radar). */
  onPress?: () => void;
  /** Overlay label shown centred on the canvas. Default `'Radar preview'`. */
  placeholderLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Static radar map placeholder — INTENTIONALLY dependency-free: no maps SDK, no
 * SVG, no image. The "canvas" is built purely from `View`s: a token-tinted
 * backdrop, three concentric range rings, a crosshair, and a labelled centre. It
 * gives weather layouts a radar slot to render before (or without) a real tile
 * provider is wired. Optional `onPress` to open a full view. All colors/sizes
 * come from the compiled theme tokens via `useXenitionTheme()` — no literal
 * colors, no external dependencies.
 */
export function RadarCard({
  title = 'Radar',
  caption,
  height = 180,
  onPress,
  placeholderLabel = 'Radar preview',
  style,
}: RadarCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const canvas = clamp(height, 96, 480);
  const rings = [0.9, 0.6, 0.3];

  const Canvas = (
    <View
      style={{
        height: canvas,
        borderRadius: tokens.radius.md,
        backgroundColor: withAlpha(colors.primary, 0.08),
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Concentric range rings. */}
      {rings.map((scale, i) => {
        const dim = canvas * scale;
        return (
          <View
            key={i}
            pointerEvents="none"
            style={{
              position: 'absolute',
              width: dim,
              height: dim,
              borderRadius: dim / 2,
              borderWidth: 1,
              borderColor: withAlpha(colors.primary, 0.25),
            }}
          />
        );
      })}
      {/* Crosshair. */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          width: '100%',
          height: 1,
          backgroundColor: withAlpha(colors.primary, 0.2),
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          width: 1,
          height: '100%',
          backgroundColor: withAlpha(colors.primary, 0.2),
        }}
      />
      {/* Centre marker + label. */}
      <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
        <Icon glyph="📡" size="xl" accessibilityLabel="Radar" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {placeholderLabel}
        </Text>
      </View>
    </View>
  );

  return (
    <Card
      variant="outlined"
      padding="sm"
      style={style}
      accessibilityRole="summary"
      accessibilityLabel={`${title}${caption ? `, ${caption}` : ''}, ${placeholderLabel}`}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: tokens.spacing.sm,
        }}
      >
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '700',
          }}
        >
          {title}
        </Text>
        {caption ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {caption}
          </Text>
        ) : null}
      </View>

      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open radar"
          onPress={onPress}
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
        >
          {Canvas}
        </Pressable>
      ) : (
        Canvas
      )}
    </Card>
  );
}

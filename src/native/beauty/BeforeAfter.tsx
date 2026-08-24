import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';

export type BeforeAfterVariant = 'split' | 'toggle';

export interface BeforeAfterProps {
  /** "Before" image URL. */
  beforeUrl?: string;
  /** "After" image URL. */
  afterUrl?: string;
  /**
   * Split position 0–100 (percent of width showing the "after" image). Clamped.
   * In `split` mode a step control nudges it; ignored in `toggle` mode.
   */
  position?: number;
  /** How the two images are compared. `split` overlays; `toggle` swaps. */
  variant?: BeforeAfterVariant;
  /** Fixed height of the compare area (default 220). */
  height?: number;
  /** Labels for the two sides. */
  beforeLabel?: string;
  afterLabel?: string;
  /** Fires with the new split position when the divider is nudged. */
  onPositionChange?: (position: number) => void;
  style?: StyleProp<ViewStyle>;
}

const clamp = (n: number): number => Math.max(0, Math.min(100, n));

/**
 * A before/after image comparison built from plain styled `View`s + `Image`
 * (no gesture library). `variant="split"` overlays the "after" image clipped to
 * `position`% width with a divider and −/+ nudge buttons; `variant="toggle"`
 * swaps between the two full images on tap. Missing images render a token-tinted
 * placeholder. Divider/labels use `withAlpha` tints — token-only colors.
 */
export function BeforeAfter({
  beforeUrl,
  afterUrl,
  position = 50,
  variant = 'split',
  height = 220,
  beforeLabel = 'Before',
  afterLabel = 'After',
  onPositionChange,
  style,
}: BeforeAfterProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [showAfter, setShowAfter] = React.useState(false);
  const pos = clamp(position);

  const placeholder = (label: string): React.ReactElement => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.muted, 0.12) }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
    </View>
  );

  const tag = (label: string, side: 'left' | 'right'): React.ReactElement => (
    <View
      style={{
        position: 'absolute',
        bottom: tokens.spacing.sm,
        [side]: tokens.spacing.sm,
        borderRadius: tokens.radius.sm,
        paddingHorizontal: tokens.spacing.sm,
        paddingVertical: 2,
        backgroundColor: withAlpha(colors.onSurface, 0.55),
      }}
    >
      <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{label}</Text>
    </View>
  );

  if (variant === 'toggle') {
    const label = showAfter ? afterLabel : beforeLabel;
    const url = showAfter ? afterUrl : beforeUrl;
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Showing ${label}. Tap to compare.`}
        onPress={() => setShowAfter((v) => !v)}
        style={[
          { height, borderRadius: tokens.radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
          style,
        ]}
      >
        {url ? <Image source={{ uri: url }} resizeMode="cover" style={{ flex: 1 }} /> : placeholder(label)}
        {tag(label, 'left')}
      </Pressable>
    );
  }

  return (
    <View
      accessibilityLabel={`Before and after comparison, ${pos}% after`}
      style={[
        { height, borderRadius: tokens.radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
        style,
      ]}
    >
      {/* Base = before */}
      {beforeUrl ? <Image source={{ uri: beforeUrl }} resizeMode="cover" style={{ ...absoluteFill }} /> : placeholder(beforeLabel)}
      {/* Overlay = after, clipped to pos% width */}
      <View style={{ ...absoluteFill, width: `${pos}%`, overflow: 'hidden' }}>
        {afterUrl ? (
          <Image source={{ uri: afterUrl }} resizeMode="cover" style={{ height, width: '100%' }} />
        ) : (
          placeholder(afterLabel)
        )}
      </View>
      {/* Divider */}
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 2, backgroundColor: colors.surface }} />
      {tag(beforeLabel, 'right')}
      {tag(afterLabel, 'left')}

      {onPositionChange ? (
        <View style={{ position: 'absolute', top: tokens.spacing.sm, right: tokens.spacing.sm, flexDirection: 'row', gap: tokens.spacing.xs }}>
          <NudgeButton label="Show less after" glyph="−" onPress={() => onPositionChange(clamp(pos - 10))} />
          <NudgeButton label="Show more after" glyph="+" onPress={() => onPositionChange(clamp(pos + 10))} />
        </View>
      ) : null}
    </View>
  );
}

const absoluteFill = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const;

function NudgeButton({ label, glyph, onPress }: { label: string; glyph: string; onPress: () => void }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.full,
        backgroundColor: withAlpha(colors.onSurface, 0.55),
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{glyph}</Text>
    </Pressable>
  );
}

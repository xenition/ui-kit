import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { GradientSurface } from './internal/GradientSurface';
import { calmDawn, calmInk, calmInkSoft, calmTile, calmBorder } from './internal/calm';

export interface SessionCompleteCardProps {
  /** Headline for the celebration. Default `'Session complete'`. */
  title?: string;
  /** A supporting, encouraging line. */
  message?: string;
  /** Minutes practiced this session; shown as a frosted chip when set. */
  minutes?: number;
  /** Current streak in days; shown as a frosted chip when set. */
  streakDays?: number;
  /** Fires when the primary "Done" pill is tapped; the pill renders only when set. */
  onDone?: () => void;
  /** Fires when the ghost "Reflect" button is tapped; renders only when set. */
  onReflect?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * SessionCompleteCard — the peak moment after a practice: a festive two-hue
 * "dawn" gradient ground, a big frosted check badge, and frosted stat chips
 * (minutes, streak). The `Done`/`Reflect` actions each appear only when their
 * handler is set. Near-white ink and the gradient both derive from the brand
 * ramp — no literal colors, so the celebration restyles from the seed in light
 * and dark. Deliberately more saturated than the resting surfaces: this is the
 * one screen allowed to feel like a reward.
 */
export function SessionCompleteCard({
  title = 'Session complete',
  message,
  minutes,
  streakDays,
  onDone,
  onReflect,
  style,
}: SessionCompleteCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = calmInk(r);
  const inkSoft = calmInkSoft(r);

  const Chip = ({ glyph, text }: { glyph: string; text: string }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.xs,
        borderRadius: tokens.radius.full,
        backgroundColor: calmTile(r),
        borderWidth: 1,
        borderColor: calmBorder(r),
      }}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
        {glyph}
      </Text>
      <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{text}</Text>
    </View>
  );

  const a11y = `${title}${message ? ', ' + message : ''}${minutes != null ? ', ' + minutes + ' minutes' : ''}${
    streakDays != null ? ', ' + streakDays + ' day streak' : ''
  }`;

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={calmDawn(r)}
        style={{
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          overflow: 'hidden',
          alignItems: 'center',
          gap: tokens.spacing.md,
        }}
      >
        <View
          accessibilityRole="image"
          accessibilityLabel="Complete"
          style={{
            width: 64,
            height: 64,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: calmTile(r, 0.22),
            borderWidth: 1,
            borderColor: calmBorder(r),
          }}
        >
          <Icon glyph="✓" size={tokens.typography.scale['2xl']} style={{ color: ink }} />
        </View>

        <View accessible accessibilityLabel={a11y} style={{ alignItems: 'center', gap: 2 }}>
          <Text style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800', textAlign: 'center' }}>
            {title}
          </Text>
          {message ? (
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
              {message}
            </Text>
          ) : null}
        </View>

        {minutes != null || streakDays != null ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: tokens.spacing.sm,
            }}
          >
            {minutes != null ? <Chip glyph="🧘" text={`${minutes} min`} /> : null}
            {streakDays != null ? <Chip glyph="🔥" text={`${streakDays} day streak`} /> : null}
          </View>
        ) : null}

        {onDone || onReflect ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: tokens.spacing.sm,
              marginTop: tokens.spacing.xs,
            }}
          >
            {onDone ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Done"
                onPress={onDone}
                style={({ pressed }) => ({
                  paddingHorizontal: tokens.spacing.xl,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.radius.full,
                  backgroundColor: ink,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
                  Done
                </Text>
              </Pressable>
            ) : null}

            {onReflect ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Reflect"
                onPress={onReflect}
                style={({ pressed }) => ({
                  paddingHorizontal: tokens.spacing.xl,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.radius.full,
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: calmBorder(r),
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Text style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>Reflect</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}

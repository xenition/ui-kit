import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { GradientSurface } from './internal/GradientSurface';
import { calmGradient, calmInk, calmInkSoft, calmTile, calmBorder } from './internal/calm';

export interface WellnessHeaderProps {
  /** Time-of-day greeting, e.g. `'Good morning'`. */
  greeting?: string;
  /** The person's name. */
  name?: string;
  /** A subtitle line (e.g. a date or an encouraging note). */
  subtitle?: string;
  /** Current practice streak in days; shown as a frosted chip when set. */
  streakDays?: number;
  /** Minutes practiced today; shown as a frosted chip when set. */
  minutes?: number;
  /** Optional avatar glyph/emoji for the profile button. Default `'🧘'`. */
  avatarGlyph?: string;
  /** Fires when the profile avatar is tapped. */
  onProfile?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * WellnessHeader — the home-screen header: a soft gradient ground with a greeting
 * and name, an optional profile avatar, and frosted "glass" stat chips (streak,
 * minutes today). Near-white ink and the gradient both derive from the brand
 * ramp, and the chips are translucent brand-ink — no literal colors, restyles
 * from the seed, light + dark. The single vivid surface on the screen; the rest
 * of the screen stays calm around it.
 */
export function WellnessHeader({
  greeting = 'Good morning',
  name,
  subtitle,
  streakDays,
  minutes,
  avatarGlyph = '🧘',
  onProfile,
  style,
}: WellnessHeaderProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
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

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface colors={calmGradient(r)} style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{greeting}</Text>
            {name ? (
              <Text style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', marginTop: 2 }}>{name}</Text>
            ) : null}
            {subtitle ? (
              <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, marginTop: 2 }}>{subtitle}</Text>
            ) : null}
          </View>

          {onProfile ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open profile"
              onPress={onProfile}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: calmTile(r, 0.22),
                borderWidth: 1,
                borderColor: calmBorder(r),
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
                {avatarGlyph}
              </Text>
            </Pressable>
          ) : null}
        </View>

        {streakDays != null || minutes != null ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
            {streakDays != null ? <Chip glyph="🔥" text={`${streakDays} day streak`} /> : null}
            {minutes != null ? <Chip glyph="🧘" text={`${minutes} min today`} /> : null}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}

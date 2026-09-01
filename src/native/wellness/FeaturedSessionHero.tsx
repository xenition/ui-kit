import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { GradientSurface } from './internal/GradientSurface';
import { calmGradient, calmInk, calmInkSoft, calmTile, calmBorder } from './internal/calm';

export interface FeaturedSessionHeroProps {
  /** Small uppercase kicker above the title (e.g. `'Today'` or a category). */
  eyebrow?: string;
  /** The session title — the headline of the hero. */
  title: string;
  /** A supporting line below the title. */
  subtitle?: string;
  /** Session length in minutes; shown as a frosted chip when set. */
  durationMin?: number;
  /** Large, faint decorative glyph in the top-right. Default `'🌅'`. */
  coverGlyph?: string;
  /** Fires when the play button is tapped. */
  onPlay?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * FeaturedSessionHero — the home-screen centerpiece: a soft primary-hue gradient
 * ground carrying the featured session, a near-white play button, and a frosted
 * duration chip. A large faint glyph sits behind the copy for warmth. Near-white
 * ink and the gradient both derive from the brand ramp — no literal colors, so it
 * restyles from the seed in light and dark. This is the single vivid surface at
 * the top of the screen; everything else stays calm around it.
 */
export function FeaturedSessionHero({
  eyebrow,
  title,
  subtitle,
  durationMin,
  coverGlyph = '🌅',
  onPlay,
  style,
}: FeaturedSessionHeroProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = calmInk(r);
  const inkSoft = calmInkSoft(r);
  const a11y = `${eyebrow ? eyebrow + ', ' : ''}${title}${subtitle ? ', ' + subtitle : ''}${
    durationMin != null ? ', ' + durationMin + ' minutes' : ''
  }`;

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={calmGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }}
      >
        <Text
          allowFontScaling={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            position: 'absolute',
            top: tokens.spacing.sm,
            right: tokens.spacing.md,
            fontSize: tokens.typography.scale['3xl'] * 2,
            opacity: 0.16,
          }}
        >
          {coverGlyph}
        </Text>

        <View
          accessible
          accessibilityRole="header"
          accessibilityLabel={a11y}
          style={{ gap: 2, paddingRight: tokens.spacing.xl }}
        >
          {eyebrow ? (
            <Text
              style={{
                color: inkSoft,
                fontSize: tokens.typography.scale.xs,
                fontWeight: '700',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </Text>
          ) : null}
          <Text style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>{title}</Text>
          {subtitle ? (
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, marginTop: 2 }}>{subtitle}</Text>
          ) : null}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            marginTop: tokens.spacing.lg,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Play session"
            onPress={onPlay}
            style={({ pressed }) => ({
              width: 48,
              height: 48,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ink,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Icon glyph="▶" size={tokens.typography.scale.lg} style={{ color: colors.primary }} />
          </Pressable>

          {durationMin != null ? (
            <View
              style={{
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                backgroundColor: calmTile(r),
                borderWidth: 1,
                borderColor: calmBorder(r),
              }}
            >
              <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                {`${durationMin} min`}
              </Text>
            </View>
          ) : null}
        </View>
      </GradientSurface>
    </View>
  );
}

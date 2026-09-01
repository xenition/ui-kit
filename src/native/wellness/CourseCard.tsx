import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { GradientSurface } from './internal/GradientSurface';
import { withAlpha } from '../primitives/internal/color';
import { calmGradient, calmInk } from './internal/calm';

export interface CourseCardProps {
  /** Program title. */
  title: string;
  /** Secondary line — a short description. */
  subtitle?: string;
  /** Small uppercase category kicker. */
  category?: string;
  /** Total number of days in the program. */
  totalDays: number;
  /** Days completed so far. Default `0`. */
  completedDays?: number;
  /** Glyph shown on the gradient cover tile. Default `'🌿'`. */
  coverGlyph?: string;
  /** Fires when the card is tapped; the card is a button only when set. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * CourseCard — a multi-day program on a calm, clean surface card. A single small
 * gradient cover tile and a slim gradient progress fill are the only color; the
 * rest stays on the neutral surface with `onSurface`/`mutedText` type, in the
 * spirit of restraint. Progress is stated in words ("Day 3 of 10") as well as
 * the bar, so it never depends on color alone. Every value is a token, so it
 * adapts light + dark and restyles from the seed.
 */
export function CourseCard({
  title,
  subtitle,
  category,
  totalDays,
  completedDays = 0,
  coverGlyph = '🌿',
  onPress,
  style,
}: CourseCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const safeTotal = totalDays > 0 ? totalDays : 0;
  const done = Math.max(0, Math.min(completedDays, safeTotal));
  const pct = safeTotal > 0 ? (done / safeTotal) * 100 : 0;
  const a11y = `${category ? category + ', ' : ''}${title}${subtitle ? ', ' + subtitle : ''}, day ${done} of ${
    safeTotal
  }`;

  const body = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <GradientSurface
          colors={calmGradient(r)}
          style={{
            width: 56,
            height: 56,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Icon glyph={coverGlyph} size={24} style={{ color: calmInk(r) }} />
        </GradientSurface>

        <View style={{ flex: 1, minWidth: 0 }}>
          {category ? (
            <Text
              style={{
                color: colors.mutedText,
                fontSize: tokens.typography.scale.xs,
                fontWeight: '700',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              {category}
            </Text>
          ) : null}
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {title}
          </Text>
          {subtitle ? (
            <Text numberOfLines={1} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={{ gap: tokens.spacing.xs, marginTop: tokens.spacing.md }}>
        <View
          style={{
            height: 6,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.onSurface, 0.1),
            overflow: 'hidden',
          }}
        >
          <GradientSurface
            colors={calmGradient(r)}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: `${pct}%`, height: 6, borderRadius: tokens.radius.full }}
          />
        </View>
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
          {`Day ${done} of ${safeTotal}`}
        </Text>
      </View>
    </>
  );

  const cardStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
  };

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        style={({ pressed }) => [cardStyle, { opacity: pressed ? 0.9 : 1 }, style]}
      >
        {body}
      </Pressable>
    );
  }

  return (
    <View accessible accessibilityLabel={a11y} style={[cardStyle, style]}>
      {body}
    </View>
  );
}

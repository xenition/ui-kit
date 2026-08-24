import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Avatar } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import type { DoctorCardProps, DoctorAvailability } from './DoctorCard';

/** Same public contract as {@link DoctorCard} — a drop-in alternate design. */
export type DoctorCardV3Props = DoctorCardProps;

const AVAIL_META: Record<
  DoctorAvailability,
  { label: string; color: keyof SemanticColors; glyph: string }
> = {
  available: { label: 'Available', color: 'successText', glyph: '●' },
  busy: { label: 'Limited', color: 'warnText', glyph: '◐' },
  off: { label: 'Off', color: 'muted', glyph: '○' },
};

/**
 * DoctorCard, redesigned (v3): a **compact directory row**. A small avatar leads
 * a name / specialty stack; the star rating collapses to a single "★ 4.5"
 * figure on the right, and availability shows as a glyph + word (never color
 * alone). No CTA button, no card chrome — a hairline base rule separates rows so
 * a stack reads as a lean provider list. Distinct at a glance from v1's card and
 * v2's centered profile. Same props, token-pure.
 */
export function DoctorCardV3({
  name,
  specialty,
  avatar,
  rating,
  reviewCount,
  availability,
  onBook,
  style,
}: DoctorCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const meta = availability ? AVAIL_META[availability] : undefined;
  const availColor = meta ? colors[meta.color] : colors.muted;

  const a11y = `${name}, ${specialty}${rating != null ? `, rated ${rating} out of 5` : ''}${meta ? `, ${meta.label}` : ''}`;

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <Avatar src={avatar} name={name} size="sm" />
      <View style={{ flex: 1, gap: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {name}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {specialty}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 1 }}>
        {rating != null ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {`★ ${rating.toFixed(1)}`}
            {reviewCount != null ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>{` (${reviewCount})`}</Text>
            ) : null}
          </Text>
        ) : null}
        {meta ? (
          <Text style={{ color: availColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {`${meta.glyph} ${meta.label}`}
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (!onBook) {
    return <View accessibilityLabel={a11y}>{body}</View>;
  }
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onBook}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}

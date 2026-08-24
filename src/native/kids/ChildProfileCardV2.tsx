import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge } from '../primitives';
import { useEnter } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { ChildProfileCardProps, ChildMood } from './ChildProfileCard';

/** Same public contract as {@link ChildProfileCard} — a drop-in alternate design. */
export type ChildProfileCardV2Props = ChildProfileCardProps;

const MOOD_META: Record<ChildMood, { glyph: string; label: string }> = {
  happy: { glyph: '😊', label: 'Happy' },
  excited: { glyph: '🤩', label: 'Excited' },
  calm: { glyph: '😌', label: 'Calm' },
  sad: { glyph: '😢', label: 'Sad' },
  tired: { glyph: '😴', label: 'Tired' },
  sick: { glyph: '🤒', label: 'Not well' },
};

/**
 * ChildProfileCard, redesigned (v2): a **playful profile banner**. A soft
 * primary-tinted banner band tops the card; a large avatar overlaps it, centered
 * above a big name, a pill-shaped mood chip, and a centered wrap of interest
 * chips. Lifted with a shadow and a gentle mount-fade. Reads as a warm "hero"
 * card — clearly distinct from v1's flat left-aligned row. Same props.
 */
export function ChildProfileCardV2({
  name,
  photoUrl,
  age,
  grade,
  birthday,
  mood,
  interests,
  loading = false,
  onPress,
  style,
}: ChildProfileCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderRadius: tokens.radius.lg,
      overflow: 'hidden',
      ...shadow('md', tokens),
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading child profile" style={container}>
        <View style={{ height: 56, backgroundColor: withAlpha(colors.primary, 0.12) }} />
        <View style={{ alignItems: 'center', paddingBottom: tokens.spacing.lg, gap: tokens.spacing.xs }}>
          <View style={{ width: 72, height: 72, marginTop: -36, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
          <View style={{ height: 14, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 10, width: '30%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      </View>
    );
  }

  const moodMeta = mood ? MOOD_META[mood] : undefined;
  const subParts = [age, grade].filter(Boolean) as string[];

  const inner = (
    <Animated.View style={[container, { opacity: enter.opacity, transform: enter.transform }]}>
      <View style={{ height: 56, backgroundColor: withAlpha(colors.primary, 0.14) }} />
      <View style={{ alignItems: 'center', paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, gap: tokens.spacing.xs }}>
        <View style={{ marginTop: -36, borderRadius: tokens.radius.full, borderWidth: 3, borderColor: colors.surface }}>
          <Avatar src={photoUrl} name={name} size="xl" />
        </View>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
          {name}
        </Text>
        {subParts.length > 0 ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {subParts.join(' · ')}
          </Text>
        ) : null}
        {birthday ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            🎂 {birthday}
          </Text>
        ) : null}
        {moodMeta ? (
          <Badge tone="primary" variant="soft" size="sm">
            {`${moodMeta.glyph} ${moodMeta.label}`}
          </Badge>
        ) : null}
        {interests && interests.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
            {interests.map((interest, i) => (
              <Badge key={`${interest}-${i}`} tone="accent" variant="soft" size="sm">
                {interest}
              </Badge>
            ))}
          </View>
        ) : null}
      </View>
    </Animated.View>
  );

  const a11y = `${name}${age ? `, ${age}` : ''}${grade ? `, ${grade}` : ''}${
    moodMeta ? `, mood ${moodMeta.label}` : ''
  }`;
  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {inner}
    </Pressable>
  );
}

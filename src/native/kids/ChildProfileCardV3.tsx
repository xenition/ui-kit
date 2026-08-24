import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import type { ChildProfileCardProps, ChildMood } from './ChildProfileCard';

/** Same public contract as {@link ChildProfileCard} — a drop-in alternate design. */
export type ChildProfileCardV3Props = ChildProfileCardProps;

const MOOD_META: Record<ChildMood, { glyph: string; label: string }> = {
  happy: { glyph: '😊', label: 'Happy' },
  excited: { glyph: '🤩', label: 'Excited' },
  calm: { glyph: '😌', label: 'Calm' },
  sad: { glyph: '😢', label: 'Sad' },
  tired: { glyph: '😴', label: 'Tired' },
  sick: { glyph: '🤒', label: 'Not well' },
};

/**
 * ChildProfileCard, redesigned (v3): a **compact list row**. A small avatar, the
 * name with a single age·grade subline, and the mood as a trailing glyph — one
 * dense line suited to a roster or picker. Deliberately the opposite of v2's tall
 * hero banner. Same props.
 */
export function ChildProfileCardV3({
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
}: ChildProfileCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading child profile" style={container}>
        <View style={{ width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ height: 12, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 9, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      </View>
    );
  }

  const moodMeta = mood ? MOOD_META[mood] : undefined;
  const subParts = [age, grade, birthday ? `🎂 ${birthday}` : undefined].filter(Boolean) as string[];

  const inner = (
    <View style={container}>
      <Avatar src={photoUrl} name={name} size="sm" />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        {subParts.length > 0 ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {subParts.join(' · ')}
          </Text>
        ) : null}
      </View>
      {moodMeta ? (
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
          {moodMeta.glyph}
        </Text>
      ) : null}
    </View>
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
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {inner}
    </Pressable>
  );
}

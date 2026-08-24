import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge } from '../primitives';

export type ChildMood = 'happy' | 'excited' | 'calm' | 'sad' | 'tired' | 'sick';

interface MoodMeta {
  glyph: string;
  label: string;
}

const MOOD_META: Record<ChildMood, MoodMeta> = {
  happy: { glyph: '😊', label: 'Happy' },
  excited: { glyph: '🤩', label: 'Excited' },
  calm: { glyph: '😌', label: 'Calm' },
  sad: { glyph: '😢', label: 'Sad' },
  tired: { glyph: '😴', label: 'Tired' },
  sick: { glyph: '🤒', label: 'Not well' },
};

export interface ChildProfileCardProps {
  /** Child's name. */
  name: string;
  /** Photo URL for the avatar; falls back to initials. */
  photoUrl?: string;
  /** Age label already formatted, e.g. "6 yrs" or "18 mo". */
  age?: string;
  /** School grade / class, e.g. "Grade 1". */
  grade?: string;
  /** Birthday label, e.g. "May 4". */
  birthday?: string;
  /** Today's mood; shown as an emoji chip (glyph + word, never color alone). */
  mood?: ChildMood;
  /** Interests / hobbies shown as soft chips. */
  interests?: string[];
  /** Loading placeholder state. */
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Header card for a single child: avatar/photo, name, an age·grade line, an
 * optional mood chip, and a wrapped strip of interest chips. Pressable when
 * `onPress` is set; renders a muted skeleton while `loading`. Every color
 * traces to a `SemanticColors` token — no literals.
 */
export function ChildProfileCard({
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
}: ChildProfileCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading child profile" style={container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View style={{ width: 56, height: 56, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View style={{ height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
            <View style={{ height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          </View>
        </View>
      </View>
    );
  }

  const moodMeta = mood ? MOOD_META[mood] : undefined;
  const subParts = [age, grade].filter(Boolean) as string[];

  const inner = (
    <View style={container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Avatar src={photoUrl} name={name} size="lg" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
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
        </View>
        {moodMeta ? (
          <View style={{ alignItems: 'center', gap: 2 }}>
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
              {moodMeta.glyph}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{moodMeta.label}</Text>
          </View>
        ) : null}
      </View>

      {interests && interests.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          {interests.map((interest, i) => (
            <Badge key={`${interest}-${i}`} tone="accent" variant="soft" size="sm">
              {interest}
            </Badge>
          ))}
        </View>
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

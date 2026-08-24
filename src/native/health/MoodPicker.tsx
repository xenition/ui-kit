import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { usePressScale } from '../primitives/internal/motion';

/** Resolve a fill semantic key to its contrast-safe `*Text` sibling when one exists. */
function textTone(colors: SemanticColors, key: keyof SemanticColors): string {
  return (colors as unknown as Record<string, string>)[`${key}Text`] ?? colors[key];
}

export type Mood = 'awful' | 'bad' | 'okay' | 'good' | 'great';

interface MoodMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const MOOD_META: Record<Mood, MoodMeta> = {
  awful: { glyph: '😣', label: 'Awful', color: 'danger' },
  bad: { glyph: '🙁', label: 'Bad', color: 'warn' },
  okay: { glyph: '😐', label: 'Okay', color: 'muted' },
  good: { glyph: '🙂', label: 'Good', color: 'primary' },
  great: { glyph: '😄', label: 'Great', color: 'success' },
};

const MOOD_ORDER: Mood[] = ['awful', 'bad', 'okay', 'good', 'great'];

export interface MoodPickerProps {
  /** Currently selected mood, if any. */
  value?: Mood;
  /** Restrict / reorder the moods shown; defaults to all five. */
  options?: Mood[];
  /** Show the text label under each face. */
  showLabels?: boolean;
  /** Fires with the tapped mood. */
  onChange?: (mood: Mood) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single mood face — its own component so each option owns a `usePressScale`
 * spring (hooks can't run in a loop). The chosen face animates a tap scale.
 */
function MoodFace({
  mood,
  selected,
  dimmed,
  showLabels,
  onChange,
}: {
  mood: Mood;
  selected: boolean;
  dimmed: boolean;
  showLabels: boolean;
  onChange?: (mood: Mood) => void;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = MOOD_META[mood];
  const press = usePressScale();

  const face = (
    <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: tokens.radius.full,
          borderWidth: 2,
          borderColor: selected ? colors[meta.color] : colors.border,
          backgroundColor: colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: dimmed ? 0.5 : 1,
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
          {meta.glyph}
        </Text>
      </View>
      {showLabels ? (
        <Text
          style={{
            color: selected ? textTone(colors, meta.color) : colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: selected ? '700' : '400',
          }}
        >
          {meta.label}
        </Text>
      ) : null}
    </View>
  );

  if (!onChange) {
    return <View accessibilityLabel={meta.label}>{face}</View>;
  }
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        accessibilityLabel={meta.label}
        onPress={() => onChange(mood)}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {face}
      </Pressable>
    </Animated.View>
  );
}

/**
 * A mood check-in: a row of emoji faces from awful to great. The selected face
 * gets a tinted ring in its mood color; the rest read muted. Each face is an
 * accessible button labelled with its mood, and animates a tap scale when
 * chosen. `onChange` fires with the tapped mood. Token-only colors.
 */
export function MoodPicker({
  value,
  options = MOOD_ORDER,
  showLabels = true,
  onChange,
  style,
}: MoodPickerProps): React.ReactElement {
  const { tokens } = useXenitionTheme();

  return (
    <View
      accessibilityRole="radiogroup"
      style={[{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.xs }, style]}
    >
      {options.map((mood) => (
        <MoodFace
          key={mood}
          mood={mood}
          selected={value === mood}
          dimmed={value != null && value !== mood}
          showLabels={showLabels}
          onChange={onChange}
        />
      ))}
    </View>
  );
}

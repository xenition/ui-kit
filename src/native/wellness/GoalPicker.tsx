import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface WellnessGoal {
  id: string;
  label: string;
  glyph?: string;
}

export interface GoalPickerProps {
  goals: WellnessGoal[];
  selected: string[];
  onToggle: (id: string) => void;
  title?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * GoalPicker — a wrap of selectable goal chips. Unselected chips are clean
 * (surface + border, `onSurface` text); color arrives only on the chosen ones,
 * which flip to the primary fill with `onPrimary` text and a `✓`. Selection is
 * announced (`accessibilityState.selected`) and marked with the check, so it
 * never rests on color alone. Token-only colors.
 */
export function GoalPicker({ goals, selected, onToggle, title, style }: GoalPickerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      {title ? (
        <Text
          accessibilityRole="header"
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {title}
        </Text>
      ) : null}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
        {goals.map((goal) => {
          const isSelected = selected.includes(goal.id);
          return (
            <Pressable
              key={goal.id}
              accessibilityRole="button"
              accessibilityLabel={goal.label}
              accessibilityState={{ selected: isSelected }}
              onPress={() => onToggle(goal.id)}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: isSelected ? colors.primary : colors.border,
                backgroundColor: isSelected ? colors.primary : colors.surface,
                opacity: pressed ? 0.85 : 1,
              })}
            >
              {goal.glyph ? (
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
                  {goal.glyph}
                </Text>
              ) : null}
              <Text
                style={{
                  color: isSelected ? colors.onPrimary : colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: isSelected ? '700' : '600',
                }}
              >
                {goal.label}
              </Text>
              {isSelected ? (
                <Text allowFontScaling={false} style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                  ✓
                </Text>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

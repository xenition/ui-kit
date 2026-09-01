import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface DaySegmentProps {
  /** Segment labels, e.g. `['Today', 'Tomorrow', 'Next 7 days']`. */
  options: string[];
  /** Index of the active segment. */
  selectedIndex: number;
  /** Called with the tapped index. */
  onSelect: (index: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * DaySegment — a segmented pill selector (Today / Tomorrow / Next 7 days). Sits
 * on the page ground (not the gradient): a bordered, fully-rounded track holding
 * equal-width pills; the active pill fills with `primary` and its label flips to
 * `onPrimary`, the rest stay muted. All colors/sizes come from the compiled theme
 * tokens — no literal color (the unselected pill simply omits its background).
 */
export function DaySegment({
  options,
  selectedIndex,
  onSelect,
  style,
}: DaySegmentProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      accessibilityRole="tablist"
      style={[
        {
          flexDirection: 'row',
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.full,
          padding: 4,
        },
        style,
      ]}
    >
      {options.map((option, index) => {
        const selected = index === selectedIndex;
        return (
          <Pressable
            key={`${option}-${index}`}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={option}
            onPress={() => onSelect(index)}
            style={({ pressed }) => ({
              flex: 1,
              paddingVertical: tokens.spacing.sm,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              backgroundColor: selected ? colors.primary : undefined,
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <Text
              numberOfLines={1}
              style={{
                color: selected ? colors.onPrimary : colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: selected ? '800' : '600',
              }}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

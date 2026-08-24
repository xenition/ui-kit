import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';

export type SkillTagVariant = 'default' | 'matched' | 'missing';

export interface SkillTagProps {
  /** Skill label, e.g. `'TypeScript'`. */
  label: string;
  /**
   * Visual emphasis:
   * - `default` — a neutral keyword chip.
   * - `matched` — the applicant has this skill (success tones + ✓ marker).
   * - `missing` — required but not on the résumé (danger tones + ! marker).
   */
  variant?: SkillTagVariant;
  /** Marks the chip as selected (e.g. an active filter). */
  selected?: boolean;
  /** Makes the chip pressable (toggle a filter, open detail). */
  onPress?: () => void;
  /** Renders a × affordance that calls this. */
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** [background, foreground] semantic slots per variant — tokens only. */
const VARIANT: Record<SkillTagVariant, [keyof SemanticColors, keyof SemanticColors]> = {
  default: ['border', 'onSurface'],
  matched: ['success', 'onSuccess'],
  missing: ['danger', 'onDanger'],
};

/** A non-color signal so variant is not conveyed by color alone. */
const MARKER: Record<SkillTagVariant, string> = {
  default: '',
  matched: '✓ ',
  missing: '! ',
};

/**
 * A skill / keyword chip for job cards and résumé matching. Mirrors the
 * primitive `Tag` shape but adds a jobs-specific `variant` axis (`matched` /
 * `missing`) that pairs a token color with a leading glyph marker — so the
 * meaning survives for color-blind users and in monochrome. Optionally pressable
 * (`onPress`) and removable (`onRemove`). No literal colors.
 */
export function SkillTag({
  label,
  variant = 'default',
  selected = false,
  onPress,
  onRemove,
  style,
}: SkillTagProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [bg, fg] = VARIANT[variant];
  const marker = MARKER[variant];

  const body = (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: colors[bg],
          borderRadius: tokens.radius.sm,
          borderWidth: selected ? 2 : 0,
          borderColor: selected ? colors.primary : 'transparent',
          paddingVertical: 3,
          paddingHorizontal: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <Text style={{ color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
        {marker}
        {label}
      </Text>
      {onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${label}`}
          onPress={onRemove}
          hitSlop={8}
        >
          <Text
            style={{ color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}
          >
            ×
          </Text>
        </Pressable>
      ) : null}
    </View>
  );

  if (!onPress) return body;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {body}
    </Pressable>
  );
}

import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { npsBucket, type NPSScaleProps, type NPSBucket } from './NPSScale';

/** Drop-in for {@link NPSScaleProps} — same props, the V4 "focus" design. */
export type NPSScaleV4Props = NPSScaleProps;

const BUCKET_ON: Record<NPSBucket, keyof SemanticColors> = {
  detractor: 'onDanger',
  passive: 'onWarn',
  promoter: 'onSuccess',
};
const BUCKET_BASE: Record<NPSBucket, keyof SemanticColors> = {
  detractor: 'danger',
  passive: 'warn',
  promoter: 'success',
};

/**
 * NPSScale — **V4** "clean form / focus" design. Eleven big 0–10 cells (min
 * height 44, bold 800 numerals) in a calm, legible row that wraps, with the
 * anchor labels underneath. The selected cell is a solid **primary** fill with
 * on-primary numeral by default, or its semantic **bucket** color
 * (detractor→danger, passive→warn, promoter→success) when `colorByBucket`;
 * unselected cells sit on `surface` + `border` with a soft primary tint on press.
 * One accent otherwise. Same props/behavior as {@link NPSScaleProps} — the
 * `radiogroup`/`radio` roles, `accessibilityState`, bucket announcements and
 * `onChange` are all preserved; token-only colors via `useXenitionTheme()` (no
 * literal colors).
 */
export function NPSScaleV4({
  value,
  onChange,
  minLabel = 'Not at all likely',
  maxLabel = 'Extremely likely',
  colorByBucket = false,
  accessibilityLabel = 'Likelihood to recommend, 0 to 10',
  disabled = false,
  style,
}: NPSScaleV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}
      >
        {Array.from({ length: 11 }, (_, score) => {
          const selected = value === score;
          const bucket = npsBucket(score);
          const baseColor = colorByBucket ? colors[BUCKET_BASE[bucket]] : colors.primary;
          const onColor = colorByBucket ? colors[BUCKET_ON[bucket]] : colors.onPrimary;
          return (
            <Pressable
              key={score}
              accessibilityRole="radio"
              accessibilityState={{ selected, disabled }}
              accessibilityLabel={`${score}, ${bucket}`}
              disabled={disabled}
              onPress={() => onChange?.(score)}
              style={({ pressed }) => ({
                flex: 1,
                minWidth: 44,
                minHeight: 44,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.md,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? baseColor : colors.border,
                backgroundColor: selected
                  ? baseColor
                  : pressed
                    ? withAlpha(colors.primary, 0.12)
                    : colors.surface,
                opacity: disabled ? 0.5 : 1,
              })}
            >
              <Text
                style={{
                  color: selected ? onColor : colors.onSurface,
                  fontSize: tokens.typography.scale.lg,
                  fontWeight: '800',
                }}
              >
                {score}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }}>
          {minLabel}
        </Text>
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            flexShrink: 1,
            textAlign: 'right',
          }}
        >
          {maxLabel}
        </Text>
      </View>
    </View>
  );
}

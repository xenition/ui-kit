import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

/** Token-derived translucent tint (no literal hex; mirrors Button/GlassPanel). */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export type LikertVariant = 'dots' | 'numbered';

export interface LikertScaleProps {
  /** Number of agreement points (default 5). Common: 5 or 7. */
  points?: number;
  /** Selected point, 1-based. `null`/`undefined` → nothing selected. */
  value?: number | null;
  /** Fires with the chosen 1-based point. */
  onChange?: (value: number) => void;
  /** Label under the left-most (lowest) point. */
  minLabel?: string;
  /** Label under the right-most (highest) point. */
  maxLabel?: string;
  /** Accessible name for the whole scale. Default `'Agreement scale'`. */
  accessibilityLabel?: string;
  /** `numbered` prints the point number inside each button. Default `'dots'`. */
  variant?: LikertVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A Likert agreement scale — N equally-weighted points rendered as a
 * `radiogroup` of circular `radio` buttons, with optional anchor labels under
 * the extremes ("Strongly disagree" … "Strongly agree"). The selected point
 * fills with the primary token and is announced via `accessibilityState`
 * (selection is never color-alone). `numbered` prints each point's ordinal. No
 * literal colors.
 */
export function LikertScale({
  points = 5,
  value,
  onChange,
  minLabel,
  maxLabel,
  accessibilityLabel = 'Agreement scale',
  variant = 'dots',
  disabled = false,
  style,
}: LikertScaleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const count = Math.max(2, Math.floor(points));

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.xs }}
      >
        {Array.from({ length: count }, (_, i) => {
          const point = i + 1;
          const selected = value === point;
          return (
            <Pressable
              key={point}
              accessibilityRole="radio"
              accessibilityState={{ selected, disabled }}
              accessibilityLabel={`Point ${point} of ${count}`}
              disabled={disabled}
              onPress={() => onChange?.(point)}
              style={({ pressed }) => ({
                flex: 1,
                aspectRatio: 1,
                maxWidth: 56,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.full,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected
                  ? colors.primary
                  : pressed
                    ? withAlpha(colors.primary, 0.12)
                    : colors.surface,
                opacity: disabled ? 0.5 : 1,
              })}
            >
              {variant === 'numbered' ? (
                <Text
                  style={{
                    color: selected ? colors.onPrimary : colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '700',
                  }}
                >
                  {point}
                </Text>
              ) : null}
            </Pressable>
          );
        })}
      </View>

      {minLabel || maxLabel ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }}>
            {minLabel ?? ''}
          </Text>
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.xs,
              flexShrink: 1,
              textAlign: 'right',
            }}
          >
            {maxLabel ?? ''}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

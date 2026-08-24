import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type RatingScaleVariant = 'star' | 'number' | 'emoji';

const DEFAULT_EMOJI = ['😖', '🙁', '😐', '🙂', '😍'];

export interface RatingScaleInputProps {
  /** Selected rating, 1-based. `0`/`null`/`undefined` → nothing selected. */
  value?: number | null;
  /** Fires with the chosen 1-based rating. */
  onChange?: (value: number) => void;
  /** Total glyphs/cells (default 5). */
  max?: number;
  /** Render mode. Default `'star'`. */
  variant?: RatingScaleVariant;
  /**
   * Emoji faces for `variant='emoji'`, lowest→highest. Defaults to a 5-face
   * ramp; indexed defensively so any `max` is safe.
   */
  emojis?: string[];
  /** Accessible name for the control. Default `'Rating'`. */
  accessibilityLabel?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * An interactive rating input — a `radiogroup` of tappable cells that report a
 * 1-based rating. `star` fills glyphs up to the selection with the accent
 * token; `number` shows filled numeric chips; `emoji` maps each cell to a face.
 * Each cell announces its value and selection (never color-alone). Guards
 * `max`/`emojis` indexing. No literal colors.
 */
export function RatingScaleInput({
  value,
  onChange,
  max = 5,
  variant = 'star',
  emojis = DEFAULT_EMOJI,
  accessibilityLabel = 'Rating',
  disabled = false,
  style,
}: RatingScaleInputProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = Math.max(1, Math.floor(max));
  const current = value ?? 0;

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }, style]}
    >
      {Array.from({ length: total }, (_, i) => {
        const cell = i + 1;
        const active = cell <= current; // for star: fill up to selection
        const selected = cell === current;
        const emojiGlyph = emojis.length > 0 ? emojis[Math.min(i, emojis.length - 1)] : '🙂';
        return (
          <Pressable
            key={cell}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled }}
            accessibilityLabel={`${cell} of ${total}`}
            disabled={disabled}
            onPress={() => onChange?.(cell)}
            style={{ opacity: disabled ? 0.5 : 1 }}
          >
            {variant === 'star' ? (
              <Text
                allowFontScaling={false}
                style={{
                  color: active ? colors.accent : colors.muted,
                  fontSize: tokens.typography.scale['2xl'],
                }}
              >
                ★
              </Text>
            ) : variant === 'emoji' ? (
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: tokens.typography.scale['2xl'],
                  opacity: selected ? 1 : 0.4,
                }}
              >
                {emojiGlyph}
              </Text>
            ) : (
              <View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: tokens.radius.full,
                  borderWidth: selected ? 2 : 1,
                  borderColor: selected ? colors.primary : colors.border,
                  backgroundColor: selected ? colors.primary : colors.surface,
                }}
              >
                <Text
                  style={{
                    color: selected ? colors.onPrimary : colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '700',
                  }}
                >
                  {cell}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

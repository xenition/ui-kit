import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';

/** One face on the scale: the glyph and its spoken meaning. */
export interface EmojiOption {
  /** The emoji glyph to render (e.g. `'🙂'`). */
  emoji: string;
  /** Spoken/visible label for the face (e.g. `'Good'`). Carries the meaning so it's never color-only. */
  label: string;
}

/** Default 5-face satisfaction set, Terrible → Great. */
export const DEFAULT_EMOJI_OPTIONS: readonly EmojiOption[] = [
  { emoji: '😡', label: 'Terrible' },
  { emoji: '😞', label: 'Poor' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😍', label: 'Great' },
];

export interface EmojiScaleProps {
  /** Selected option index. `null`/`undefined` → nothing selected. */
  value?: number | null;
  /** Fires with the chosen option index (0-based). */
  onChange: (value: number) => void;
  /** The faces to show. Default {@link DEFAULT_EMOJI_OPTIONS} (a 5-face set). */
  options?: readonly EmojiOption[];
  /** Accessible name for the group. Default `'Satisfaction'`. */
  accessibilityLabel?: string;
  /** Non-interactive + dimmed when `true`. Default `false`. */
  disabled?: boolean;
  /** Extra style on the root. */
  style?: StyleProp<ViewStyle>;
}

/**
 * EmojiScale — **V4** "clean form / focus" emoji-face satisfaction picker. A row
 * of big emoji buttons on a calm neutral surface; the selected face gets the
 * single signature accent — a `primary` ring plus a soft `primary` tint
 * (`withAlpha`) — and scales up slightly, with its label shown beneath the row.
 * The face label carries the meaning so selection is never conveyed by color
 * alone. Exposed as a `radiogroup` of `radio`s with spoken labels. Controlled
 * via `value` + `onChange`; token-only colors via `useXenitionTheme()`.
 */
export function EmojiScale({
  value,
  onChange,
  options = DEFAULT_EMOJI_OPTIONS,
  accessibilityLabel = 'Satisfaction',
  disabled = false,
  style,
}: EmojiScaleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const selectedOption = value != null ? options[value] : undefined;

  return (
    <View style={[{ gap: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 }, style]}>
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: tokens.spacing.xs }}
      >
        {options.map((opt, index) => {
          const selected = value === index;
          return (
            <Pressable
              key={index}
              accessibilityRole="radio"
              accessibilityState={{ selected, disabled }}
              accessibilityLabel={opt.label}
              disabled={disabled}
              onPress={() => onChange(index)}
              style={{
                width: 48,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.full,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? withAlpha(colors.primary, 0.12) : colors.surface,
                transform: [{ scale: selected ? 1.1 : 1 }],
              }}
            >
              <Text style={{ fontSize: 24 }}>{opt.emoji}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Label of the currently selected face — reserves a line to avoid layout shift. */}
      <Text
        style={{
          minHeight: tokens.typography.scale.sm * 1.4,
          textAlign: 'center',
          color: colors.primary,
          fontSize: tokens.typography.scale.sm,
          fontWeight: '700',
        }}
      >
        {selectedOption?.label ?? ''}
      </Text>
    </View>
  );
}

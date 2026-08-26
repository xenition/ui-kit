import * as React from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import type { TagInputProps } from './TagInput';
import { fieldSkin, hitSlopTo, ringWrap } from './internal/picker-v4';
import { pressLayer } from './internal/state-v4';

export type { TagInputProps as TagInputV4Props };

/**
 * **V4 tag input** — the same props as {@link TagInput}, a different design
 * line.
 *
 * ## The duplicate was the bug
 *
 * Type a tag you already have and the base clears the field and does nothing
 * else. From the outside that is indistinguishable from the app dropping your
 * input: you typed something, it vanished, and no tag appeared. §38 is explicit
 * that an error state has to help you recover, and the recovery here is simply
 * being told what happened.
 *
 * So V4 **keeps what you typed** and says `“React” is already added` under the
 * field, announced politely. Nothing is lost, the reason is on screen, and the
 * message clears itself the moment you change the text. `dedupe={false}` still
 * turns the whole rule off.
 *
 * ## The remove ✕ was the other one
 *
 * A chip's ✕ is necessarily small — it lives inside a 32px chip — and the base
 * gives it 6px of slop, so about a 24px target, sitting next to other chips'
 * ✕s. `hitSlopTo` opens it out to the same `tapTarget()` the rest of the line
 * uses without growing the chip by a pixel: the touch area extends past the
 * view, which is exactly what `hitSlop` is for.
 *
 * ## The rest
 *
 * The wrapper wears `InputV4`'s treatment — `2xl` minimum height, `md` radius,
 * the brand halo with its space reserved — and wraps to as many rows as the
 * tags need. Chips are `accent`/`onAccent`, a pair the compiler
 * contrast-checks, at `sm` rather than `xs`: a tag is a thing you have to be
 * able to read, not a decoration.
 */
export function TagInputV4({
  value = [],
  onChange,
  placeholder = 'Add a tag…',
  dedupe = true,
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Add a tag',
  style,
}: TagInputProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [draft, setDraft] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  // What went wrong last time, in words. Cleared by the next keystroke.
  const [notice, setNotice] = React.useState<string | null>(null);

  const add = (): void => {
    const t = draft.trim();
    if (!t) return;
    if (dedupe && value.some((v) => v.toLowerCase() === t.toLowerCase())) {
      // The draft is NOT cleared: losing what someone typed to tell them
      // nothing is the failure §38 is about.
      setNotice(`“${t}” is already added`);
      return;
    }
    onChange?.([...value, t]);
    setDraft('');
    setNotice(null);
  };

  const removeAt = (index: number): void => {
    onChange?.(value.filter((_, i) => i !== index));
    setNotice(null);
  };

  const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>): void => {
    if (e.nativeEvent.key === 'Backspace' && draft.length === 0 && value.length > 0) {
      removeAt(value.length - 1);
    }
  };

  const chipHeight = tokens.spacing.xl;
  const removeGlyph = tokens.spacing.md;

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={ringWrap(theme, { focused, invalid })}>
        <View
          style={[
            fieldSkin(theme, { focused, invalid, disabled }),
            {
              // The field grows down as tags accumulate rather than scrolling
              // them out of sight.
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              gap: tokens.spacing.xs,
              paddingVertical: tokens.spacing.xs,
            },
          ]}
        >
          {value.map((tag, i) => (
            <View
              key={`${tag}-${i}`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                height: chipHeight,
                backgroundColor: colors.accent,
                borderRadius: tokens.radius.full,
                paddingHorizontal: tokens.spacing.sm,
              }}
            >
              <Text
                style={{
                  color: colors.onAccent,
                  fontFamily: tokens.typography.fontBody,
                  fontSize: tokens.typography.scale.sm,
                }}
              >
                {tag}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Remove ${tag}`}
                disabled={disabled}
                onPress={() => removeAt(i)}
                // The glyph stays chip-sized; only the touch area reaches the
                // floor, so the chip does not grow to accommodate it.
                hitSlop={hitSlopTo(theme, removeGlyph)}
                style={({ pressed }) => ({
                  width: removeGlyph,
                  height: removeGlyph,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: tokens.radius.full,
                  // The chip's ink, not the page's: the layer has to stay
                  // visible on the accent fill the chip is wearing.
                  backgroundColor: pressed ? pressLayer(theme, colors.onAccent) : 'transparent',
                })}
              >
                <Text
                  style={{ color: colors.onAccent, fontSize: tokens.typography.scale.xs }}
                >
                  ✕
                </Text>
              </Pressable>
            </View>
          ))}

          <TextInput
            editable={!disabled}
            accessibilityLabel={accessibilityLabel}
            accessibilityState={{ disabled }}
            value={draft}
            onChangeText={(t) => {
              setDraft(t);
              setNotice(null);
            }}
            onSubmitEditing={add}
            onKeyPress={onKeyPress}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            blurOnSubmit={false}
            placeholder={value.length === 0 ? placeholder : ''}
            placeholderTextColor={colors.mutedText}
            returnKeyType="done"
            style={{
              flexGrow: 1,
              minWidth: tokens.spacing['2xl'],
              height: chipHeight,
              color: colors.onSurface,
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.base,
              padding: 0,
            }}
          />
        </View>
      </View>

      {notice !== null ? (
        <Text
          accessibilityLiveRegion="polite"
          style={{
            color: colors.mutedText,
            fontFamily: tokens.typography.fontBody,
            fontSize: tokens.typography.scale.sm,
          }}
        >
          {notice}
        </Text>
      ) : null}
    </View>
  );
}

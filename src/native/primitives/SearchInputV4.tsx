import * as React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SearchInputProps } from './SearchInput';
import { fieldSkin, hitSlopTo, ringWrap } from './internal/picker-v4';
import { pressLayer } from './internal/state-v4';

export type { SearchInputProps as SearchInputV4Props };

/**
 * **V4 search field** — the same props as {@link SearchInput}, a different
 * design line.
 *
 * ## It looks like the other fields, and that is the point
 *
 * The base is a pill: `radius.full`, `sm` padding. A pill is a perfectly good
 * search affordance on a toolbar — but a search field is most often a field in
 * a form, sitting under a label and above two `InputV4`s, and there it reads as
 * a foreign object. §16 asks for forms that are minimal, and a form built from
 * three different field shapes is not minimal however few questions it asks.
 *
 * So V4 takes `InputV4`'s treatment exactly: the same `2xl` minimum height, the
 * same `md` radius, and the same brand halo whose space is reserved whether or
 * not it is showing, so focusing never nudges the layout (§36.11). The leading
 * ⌕ is what says "search" — the shape does not have to.
 *
 * ## The clear button is the fix nobody sees
 *
 * The base's ✕ is a bare glyph with 8px of slop: about 24px of target, sitting
 * inside a field, next to the text you are trying to select. Miss it and you
 * put the caret somewhere instead. Here it keeps the same drawn size — a 48px
 * ✕ inside a 48px field would be absurd — but `hitSlopTo` opens its touch area
 * out to the same `tapTarget()` every other V4 control is built on. Small mark,
 * large target, and the layout never notices.
 *
 * It is also announced as "Clear search" and only exists when there is
 * something to clear, so the row does not carry a dead affordance.
 */
export function SearchInputV4({
  value = '',
  onChangeText,
  onClear,
  placeholder = 'Search…',
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Search',
  containerStyle,
  onFocus,
  onBlur,
  ...rest
}: SearchInputProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [focused, setFocused] = React.useState(false);

  const clear = (): void => {
    onChangeText?.('');
    onClear?.();
  };

  // The ✕ stays glyph-sized; only its touch area grows.
  const glyph = tokens.spacing.lg;

  return (
    <View style={[ringWrap(theme, { focused, invalid }), containerStyle]}>
      <View style={fieldSkin(theme, { focused, invalid, disabled })}>
        <Text
          accessibilityElementsHidden
          importantForAccessibility="no"
          style={{ color: colors.mutedText, fontSize: tokens.typography.scale.base }}
        >
          ⌕
        </Text>
        <TextInput
          editable={!disabled}
          accessibilityLabel={accessibilityLabel}
          accessibilityState={{ disabled }}
          value={value}
          onChangeText={onChangeText}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedText}
          returnKeyType="search"
          style={{
            flex: 1,
            color: colors.onSurface,
            fontFamily: tokens.typography.fontBody,
            fontSize: tokens.typography.scale.base,
            padding: 0,
          }}
          {...rest}
        />
        {value.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            disabled={disabled}
            onPress={clear}
            hitSlop={hitSlopTo(theme, glyph)}
            style={({ pressed }) => ({
              width: glyph,
              height: glyph,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.full,
              backgroundColor: pressed ? pressLayer(theme) : 'transparent',
            })}
          >
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.base }}>✕</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

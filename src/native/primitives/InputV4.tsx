import * as React from 'react';
import {
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from './internal/color';
import type { InputProps } from './Input';

export interface InputV4Props extends InputProps {
  /**
   * What went wrong and how to fix it.
   *
   * Optional and additive — every existing `Input` usage still type-checks —
   * but it is the half of an error state that actually helps. A red border
   * says "wrong"; only a message says what to do about it (`design.md` §38),
   * and the kit cannot invent that copy for a field it knows nothing about.
   * Passing it also puts the field in the invalid state, so the border and the
   * message can never disagree.
   */
  error?: string;
}

/**
 * **V4 text input** — same props as {@link Input} plus an optional `error`
 * message, a different design line.
 *
 * Three things make it read as a considered control rather than a box:
 *
 * 1. **Height and softness.** A `2xl` minimum height (a comfortable target for
 *    a thumb, and room for the text to breathe) and the `md` radius instead of
 *    `sm`. Both come off the scales, so a `sharp` seed still gets square
 *    corners and nothing is picked here.
 * 2. **A real focus ring.** Focus paints a translucent brand halo AROUND the
 *    field, not just a different border colour — the difference between a
 *    control that responds and one that merely changes. The halo's space is
 *    reserved whether or not it is showing, so focusing a field never nudges
 *    the layout (§36.11 — do not move controls out from under the finger).
 *    The colour is `colors.primary`, which the provider has resolved for the
 *    active scheme; `ramps.primary[400]` would be a near-white halo on a dark
 *    page, because the ramps keep the light orientation in both schemes.
 * 3. **An error state that says something.** `invalid` turns the field and its
 *    ring to `danger`; `error` adds the message underneath, announced politely
 *    to a screen reader.
 *
 * No gradient, no glass, no shadow. A form field is not a hero, and depth on
 * an input is depth spent where §35.11 and §8 say it should not be — which is
 * why nothing here consumes `gradient` or `elevation` at all.
 */
export function InputV4({
  invalid = false,
  error,
  label,
  containerStyle,
  style,
  editable = true,
  onFocus,
  onBlur,
  ...rest
}: InputV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [focused, setFocused] = React.useState(false);

  // An error message IS an invalid state; keeping them in one variable is how
  // the border and the copy stay in agreement.
  const isInvalid = invalid || error !== undefined;
  const accent = isInvalid ? colors.danger : colors.primary;

  // Reserved whether or not it is showing, so focus never shifts the layout.
  // The negative margin lets the halo bleed outward, keeping the field's own
  // edge flush with the label above it; the container's `sm` gap leaves room.
  const ring = tokens.spacing.xs;

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    setFocused(true);
    onFocus?.(event);
  };
  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <View style={[{ gap: tokens.spacing.sm }, containerStyle]}>
      {label ? (
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontFamily: tokens.typography.fontBody,
            fontWeight: '500',
          }}
        >
          {label}
        </Text>
      ) : null}

      <View
        style={{
          padding: ring,
          margin: -ring,
          borderRadius: tokens.radius.md + ring,
          backgroundColor: focused ? withAlpha(accent, 0.18) : 'transparent',
        }}
      >
        <TextInput
          editable={editable}
          accessibilityState={{ disabled: !editable }}
          placeholderTextColor={colors.mutedText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            {
              width: '100%',
              minHeight: tokens.spacing['2xl'],
              color: colors.onSurface,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: isInvalid ? colors.danger : focused ? accent : colors.border,
              borderRadius: tokens.radius.md,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
              fontSize: tokens.typography.scale.base,
              fontFamily: tokens.typography.fontBody,
              opacity: editable ? 1 : 0.5,
            },
            style,
          ]}
          {...rest}
        />
      </View>

      {error !== undefined ? (
        <Text
          accessibilityLiveRegion="polite"
          style={{
            color: colors.dangerText,
            fontSize: tokens.typography.scale.sm,
            fontFamily: tokens.typography.fontBody,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

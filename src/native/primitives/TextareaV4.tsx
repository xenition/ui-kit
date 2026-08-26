import * as React from 'react';
import {
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { fieldAccent, fieldBorder, fieldMetrics, haloStyle } from './internal/field-v4';
import type { TextareaProps } from './Textarea';

export type { TextareaProps as TextareaV4Props };

/**
 * How tall a line of body text is set, as a multiple of its size.
 *
 * 1.5 rather than the base's 1.4. A single-line field is a label you are
 * editing; a textarea is prose, and prose is read in lines — §10 asks for
 * typography to do the work before containers do, and line height is most of
 * what makes several lines readable rather than dense.
 */
const LINE_HEIGHT = 1.5;

/**
 * **V4 multi-line field** — the same props as {@link Textarea}, a different
 * design line.
 *
 * A textarea is the one form control whose job is reading, not just entry, so
 * the changes split between the two:
 *
 * 1. **It matches the fields around it.** `md` radius and `md` horizontal
 *    padding from the shared `fieldMetrics`, and a minimum height of at least
 *    one full control height, so a one-row textarea is never shorter than the
 *    `InputV4` above it in a form (§13). The base's `radius.sm` box was
 *    visibly a different component.
 * 2. **It is set to be read.** Lines at 1.5× rather than 1.4×, which is most of
 *    what separates prose from a wall (§10). `rows` still drives the height,
 *    so the caller decides how much of the answer is visible before scrolling.
 * 3. **A real focus ring.** The same brand halo `InputV4` paints, with its
 *    space reserved whether or not it is showing, so focusing never nudges the
 *    label above it or the field below (§36.11).
 *
 * `invalid` turns the border and the ring `danger` from one flag, so they can
 * never disagree; the recovery copy belongs to the `Field` that wraps this
 * control, because a primitive cannot invent the sentence that says what to fix
 * (§38).
 *
 * No gradient, no glass, no shadow — §16 asks that forms stay minimal, and a
 * box someone is writing in is the last place to spend depth.
 */
export function TextareaV4({
  invalid = false,
  label,
  rows = 4,
  containerStyle,
  style,
  editable = true,
  onFocus,
  onBlur,
  ...rest
}: TextareaProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const metrics = fieldMetrics(theme);
  const [focused, setFocused] = React.useState(false);

  const accent = fieldAccent(theme, invalid);
  const lineHeight = Math.round(tokens.typography.scale.base * LINE_HEIGHT);
  const padY = tokens.spacing.sm;

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    setFocused(true);
    onFocus?.(event);
  };
  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <View style={[{ gap: metrics.gap }, containerStyle]}>
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

      <View style={haloStyle(theme, { showing: focused, accent })}>
        <TextInput
          multiline
          textAlignVertical="top"
          editable={editable}
          accessibilityState={{ disabled: !editable }}
          placeholderTextColor={colors.mutedText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            {
              width: '100%',
              // Never shorter than a single-line field, however few rows are
              // asked for — a one-row textarea beside an input should not look
              // like a mistake.
              minHeight: Math.max(metrics.height, rows * lineHeight + padY * 2),
              color: colors.onSurface,
              backgroundColor: colors.surface,
              borderRadius: metrics.radius,
              paddingVertical: padY,
              paddingHorizontal: metrics.padX,
              fontSize: tokens.typography.scale.base,
              fontFamily: tokens.typography.fontBody,
              lineHeight,
              opacity: editable ? 1 : 0.5,
              ...fieldBorder(theme, { invalid, focused }),
            },
            style,
          ]}
          {...rest}
        />
      </View>
    </View>
  );
}

import * as React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { fieldBorder, fieldMetrics, haloStyle } from '../primitives/internal/field-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { appearanceStyle } from '../primitives/internal/appearance';
import { AttachmentBarV4 } from './AttachmentBarV4';
import type { MessageComposerProps } from './MessageComposer';

export interface MessageComposerV4Props extends MessageComposerProps {
  /** Accessible names for the two controls. */
  sendLabel?: string;
  attachLabel?: string;
  /**
   * How many lines the field grows to before it scrolls. Default `5`.
   *
   * The base bound no maximum, so a long message pushed the send button off
   * the screen — on the one control the whole component exists to reach.
   */
  maxLines?: number;
}

/**
 * **V4 message composer** — same props as {@link MessageComposer} plus
 * `sendLabel`, `attachLabel` and `maxLines`.
 *
 * ## Four changes
 *
 * 1. **Send is disabled when there is nothing to send.** The base rendered a
 *    live control that fired with an empty value — so the first thing a user
 *    does by accident is send an empty message.
 * 2. **The field stops growing.** See `maxLines`; it grew without bound and
 *    pushed the send button off screen.
 * 3. **Both controls clear 44 and carry names.** They were unlabelled glyphs.
 * 4. **The field is on the shared field metrics and focus halo**, so the
 *    composer matches every other input in the product rather than having its
 *    own border and its own focus colour.
 */
export function MessageComposerV4({
  value = '',
  onChangeText,
  onSend,
  onAttach,
  attachments,
  onRemoveAttachment,
  placeholder = 'Message',
  disabled = false,
  appearance = 'classic',
  sendLabel = 'Send',
  attachLabel = 'Add attachment',
  maxLines = 5,
  style,
}: MessageComposerV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [focused, setFocused] = React.useState(false);

  const metrics = fieldMetrics(theme);
  const tap = minTap(tokens.spacing);
  const lineHeight = tokens.typography.scale.base * 1.4;

  // Empty (or whitespace-only) is not a message. The base sent it anyway.
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <View style={[{ ...appearanceStyle(appearance, colors, tokens) }, style]}>
      {attachments && attachments.length > 0 ? (
        <AttachmentBarV4
          attachments={attachments}
          onRemove={onRemoveAttachment}
          appearance={appearance}
        />
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.sm,
        }}
      >
        {onAttach ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={attachLabel}
            disabled={disabled}
            onPress={onAttach}
            style={({ pressed }) => ({
              width: tap,
              height: tap,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.full,
              backgroundColor: pressed ? pressFill(theme) : 'transparent',
              opacity: disabledOpacity(theme.state, disabled),
            })}
          >
            <IconV4 name="attachment" size="lg" color="mutedText" />
          </Pressable>
        ) : null}

        <View style={[{ flex: 1 }, haloStyle(theme, { showing: focused, accent: colors.ring })]}>
          <TextInput
            accessibilityLabel={placeholder}
            placeholder={placeholder}
            placeholderTextColor={colors.mutedText}
            value={value}
            editable={!disabled}
            multiline
            onChangeText={onChangeText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={[
              {
                minHeight: metrics.height,
                // Bounded: a long message must not push the send button away.
                maxHeight: lineHeight * Math.max(1, maxLines),
                paddingHorizontal: metrics.padX,
                paddingTop: tokens.spacing.sm,
                paddingBottom: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                fontSize: tokens.typography.scale.base,
                lineHeight,
                color: colors.onSurface,
                backgroundColor: colors.surface,
              },
              fieldBorder(theme, { invalid: false, focused }),
            ]}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={sendLabel}
          accessibilityState={{ disabled: !canSend }}
          disabled={!canSend}
          onPress={() => onSend?.(value)}
          style={({ pressed }) => ({
            width: tap,
            height: tap,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: canSend
              ? pressed
                ? colors.primaryText
                : colors.primary
              : colors.muted,
            opacity: disabledOpacity(theme.state, !canSend),
          })}
        >
          <IconV4
            name="send"
            size="lg"
            style={{ color: canSend ? colors.onPrimary : colors.mutedText }}
          />
        </Pressable>
      </View>
    </View>
  );
}

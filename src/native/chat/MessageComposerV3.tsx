import * as React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { AttachmentBar } from './AttachmentBar';
import type { MessageComposerProps } from './MessageComposer';

/** Drop-in alternate design for {@link MessageComposer} — identical props. */
export type MessageComposerV3Props = MessageComposerProps;

/**
 * MessageComposer — **flat toolbar** variant. No pill and no circular button:
 * a borderless field flanked by a row of flat inline actions (attach + camera)
 * on the left and a plain **"Send"** text button on the right that lights up in
 * the primary text token once there's something to send. The utilitarian,
 * desktop-messenger counterpart to the v1 box and the v2 pill+FAB. Same props as
 * `MessageComposer`. No literal colors.
 */
export function MessageComposerV3({
  value = '',
  onChangeText,
  onSend,
  onAttach,
  attachments,
  onRemoveAttachment,
  placeholder = 'Message',
  disabled = false,
  appearance = 'classic',
  style,
}: MessageComposerV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasAttachments = (attachments?.length ?? 0) > 0;
  const canSend = !disabled && (value.trim().length > 0 || hasAttachments);

  const submit = (): void => {
    if (!canSend) return;
    onSend?.(value);
  };

  return (
    <View
      style={[
        appearance === 'classic' ? null : appearanceStyle(appearance, colors, tokens),
        {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: appearance === 'classic' ? colors.surface : undefined,
          paddingVertical: tokens.spacing.xs,
        },
        style,
      ]}
    >
      {hasAttachments ? (
        <AttachmentBar attachments={attachments ?? []} onRemove={onRemoveAttachment} />
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add attachment"
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={onAttach}
          hitSlop={8}
          style={{ padding: tokens.spacing.xs, opacity: disabled ? 0.5 : 1 }}
        >
          <Icon glyph="＋" color="muted" size="lg" />
        </Pressable>

        <TextInput
          accessibilityLabel="Message input"
          editable={!disabled}
          multiline
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={submit}
          blurOnSubmit={false}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          style={{
            flex: 1,
            maxHeight: 120,
            color: colors.onSurface,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.xs,
            fontSize: tokens.typography.scale.base,
            opacity: disabled ? 0.5 : 1,
          }}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send message"
          accessibilityState={{ disabled: !canSend }}
          disabled={!canSend}
          onPress={submit}
          hitSlop={8}
          style={({ pressed }) => ({
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
            opacity: !canSend ? 0.4 : pressed ? 0.6 : 1,
          })}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontSize: tokens.typography.scale.base,
              fontWeight: '700',
            }}
          >
            Send
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

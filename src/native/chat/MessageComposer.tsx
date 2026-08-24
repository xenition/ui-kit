import * as React from 'react';
import { Pressable, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { AttachmentBar, type StagedAttachment } from './AttachmentBar';

export interface MessageComposerProps {
  /** Controlled draft text. */
  value?: string;
  /** Fired on every keystroke. */
  onChangeText?: (text: string) => void;
  /**
   * Fired when the send affordance is tapped (or return submits). Receives the
   * current draft text; the parent is expected to clear `value`.
   */
  onSend?: (text: string) => void;
  /** Fired when the attach (paperclip) button is tapped. */
  onAttach?: () => void;
  /** Staged attachments to preview above the input. */
  attachments?: StagedAttachment[];
  /** Remove a staged attachment by id. */
  onRemoveAttachment?: (id: string) => void;
  /** Placeholder text (default "Message"). */
  placeholder?: string;
  /** Disable input + actions. */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Message input bar — an attach button, a growing multiline field, and a send
 * button that is disabled until there's something to send (text or a staged
 * attachment). Staged attachments preview above via `AttachmentBar`. Controlled
 * via `value`/`onChangeText`; emits `onSend`/`onAttach`. No literal colors.
 */
export function MessageComposer({
  value = '',
  onChangeText,
  onSend,
  onAttach,
  attachments,
  onRemoveAttachment,
  placeholder = 'Message',
  disabled = false,
  style,
}: MessageComposerProps): React.ReactElement {
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
        {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
          paddingVertical: tokens.spacing.sm,
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
          alignItems: 'flex-end',
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add attachment"
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={onAttach}
          hitSlop={8}
          style={{ paddingBottom: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 }}
        >
          <Icon glyph="＋" color="muted" />
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
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.lg,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
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
          style={({ pressed }) => ({
            width: 40,
            height: 40,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
            opacity: !canSend ? 0.4 : pressed ? 0.85 : 1,
          })}
        >
          <Icon glyph="➤" color="onPrimary" />
        </Pressable>
      </View>
    </View>
  );
}

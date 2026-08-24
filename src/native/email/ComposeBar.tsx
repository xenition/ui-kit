import * as React from 'react';
import { Pressable, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { AttachmentChip, type AttachmentKind } from './AttachmentChip';

export interface ComposeStagedAttachment {
  id: string;
  name: string;
  kind?: AttachmentKind;
  size?: string;
}

export interface ComposeBarProps {
  /** Controlled recipient string. When provided, a "To" field is shown. */
  to?: string;
  onChangeTo?: (text: string) => void;
  /** Controlled subject. When provided, a "Subject" field is shown. */
  subject?: string;
  onChangeSubject?: (text: string) => void;
  /** Controlled body text. */
  body?: string;
  onChangeBody?: (text: string) => void;
  /**
   * Fired when send is tapped. Receives the assembled draft; the parent clears
   * the fields.
   */
  onSend?: (draft: { to?: string; subject?: string; body: string }) => void;
  /** Attach button handler. */
  onAttach?: () => void;
  /** Staged attachments previewed above the body. */
  attachments?: ComposeStagedAttachment[];
  /** Remove a staged attachment by id. */
  onRemoveAttachment?: (id: string) => void;
  /** Body placeholder. Default "Write a message". */
  placeholder?: string;
  /** Sending in flight → send button shows a busy state and is blocked. */
  sending?: boolean;
  /** Disable the whole bar. */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A mobile mail compose surface — optional "To"/"Subject" fields (shown only
 * when their controlled value is supplied), a growing body field, staged
 * attachment chips, an attach button, and a send button that stays disabled
 * until there's something to send (body text or an attachment) and while
 * `sending`. Controlled; emits an assembled `{ to, subject, body }` on send.
 * No literal colors.
 */
export function ComposeBar({
  to,
  onChangeTo,
  subject,
  onChangeSubject,
  body = '',
  onChangeBody,
  onSend,
  onAttach,
  attachments,
  onRemoveAttachment,
  placeholder = 'Write a message',
  sending = false,
  disabled = false,
  style,
}: ComposeBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const staged = attachments ?? [];
  const hasAttachments = staged.length > 0;
  const canSend = !disabled && !sending && (body.trim().length > 0 || hasAttachments);

  const submit = (): void => {
    if (!canSend) return;
    onSend?.({ to, subject, body });
  };

  const fieldStyle = {
    color: colors.onSurface,
    fontSize: tokens.typography.scale.base,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  } as const;

  return (
    <View
      style={[
        {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
          paddingBottom: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {to !== undefined ? (
        <TextInput
          accessibilityLabel="To"
          editable={!disabled}
          value={to}
          onChangeText={onChangeTo}
          placeholder="To"
          placeholderTextColor={colors.muted}
          autoCapitalize="none"
          keyboardType="email-address"
          style={fieldStyle}
        />
      ) : null}
      {subject !== undefined ? (
        <TextInput
          accessibilityLabel="Subject"
          editable={!disabled}
          value={subject}
          onChangeText={onChangeSubject}
          placeholder="Subject"
          placeholderTextColor={colors.muted}
          style={fieldStyle}
        />
      ) : null}

      {hasAttachments ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, padding: tokens.spacing.sm }}>
          {staged.map((a) => (
            <AttachmentChip
              key={a.id}
              name={a.name}
              kind={a.kind ?? 'file'}
              size={a.size}
              onRemove={onRemoveAttachment ? () => onRemoveAttachment(a.id) : undefined}
            />
          ))}
        </View>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          paddingTop: tokens.spacing.sm,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Attach file"
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={onAttach}
          hitSlop={8}
          style={{ paddingBottom: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 }}
        >
          <Icon glyph="📎" color="muted" />
        </Pressable>
        <TextInput
          accessibilityLabel="Message body"
          editable={!disabled}
          multiline
          value={body}
          onChangeText={onChangeBody}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          style={{
            flex: 1,
            maxHeight: 140,
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
          accessibilityLabel="Send email"
          accessibilityState={{ disabled: !canSend, busy: sending }}
          disabled={!canSend}
          onPress={submit}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
            opacity: !canSend ? 0.4 : pressed ? 0.85 : 1,
          })}
        >
          <Icon glyph={sending ? '…' : '➤'} color="onPrimary" />
        </Pressable>
      </View>
    </View>
  );
}

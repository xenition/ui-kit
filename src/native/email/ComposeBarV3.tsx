import * as React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { AttachmentChip } from './AttachmentChip';
import type { ComposeBarProps } from './ComposeBar';

/** Same public contract as {@link ComposeBar} — a drop-in alternate design. */
export type ComposeBarV3Props = ComposeBarProps;

/**
 * ComposeBar — design V3. A **flat, full-width bar** with an edge-to-edge body
 * field over a row of **inline text actions** (Attach · Send) — no pill, no FAB,
 * no elevation. Optional To/Subject fields appear only when their controlled
 * value is supplied. Send stays disabled until there is a body or an attachment
 * (and while `sending`), reading "Sending…" in flight. Same props as
 * `ComposeBar`. No literal colors.
 */
export function ComposeBarV3({
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
}: ComposeBarV3Props): React.ReactElement {
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
        { borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surface },
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

      <TextInput
        accessibilityLabel="Message body"
        editable={!disabled}
        multiline
        value={body}
        onChangeText={onChangeBody}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={{
          maxHeight: 160,
          minHeight: 44,
          color: colors.onSurface,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          fontSize: tokens.typography.scale.base,
          opacity: disabled ? 0.5 : 1,
        }}
      />

      {/* Inline action row. */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Attach file"
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={onAttach}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <Icon glyph="📎" color="muted" size="base" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>Attach</Text>
        </Pressable>

        <View style={{ flex: 1 }} />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send email"
          accessibilityState={{ disabled: !canSend, busy: sending }}
          disabled={!canSend}
          onPress={submit}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.lg,
            opacity: !canSend ? 0.4 : pressed ? 0.7 : 1,
          })}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontSize: tokens.typography.scale.base,
              fontWeight: '700',
            }}
          >
            {sending ? 'Sending…' : 'Send'}
          </Text>
          <Icon glyph="➤" color="primaryText" size="base" />
        </Pressable>
      </View>
    </View>
  );
}

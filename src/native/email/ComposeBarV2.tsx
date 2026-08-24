import * as React from 'react';
import { Animated, Pressable, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { AttachmentChip } from './AttachmentChip';
import type { ComposeBarProps } from './ComposeBar';

/** Same public contract as {@link ComposeBar} — a drop-in alternate design. */
export type ComposeBarV2Props = ComposeBarProps;

/**
 * ComposeBar — design V2. A **rounded pill** input carrying the attach button
 * and a growing body field, paired with a **floating circular send FAB** that
 * lifts on a shadow and press-scales on tap. Optional To/Subject fields appear
 * only when their controlled value is supplied. Send stays disabled until there
 * is a body or an attachment (and while `sending`). Same props as `ComposeBar`.
 * No literal colors.
 */
export function ComposeBarV2({
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
}: ComposeBarV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
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
        { backgroundColor: colors.surface, paddingBottom: tokens.spacing.md, paddingTop: tokens.spacing.sm },
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
        }}
      >
        {/* The rounded pill: attach + growing body. */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            paddingLeft: tokens.spacing.sm,
            paddingRight: tokens.spacing.md,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Attach file"
            accessibilityState={{ disabled }}
            disabled={disabled}
            onPress={onAttach}
            hitSlop={8}
            style={{ paddingVertical: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 }}
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
              paddingVertical: tokens.spacing.sm,
              fontSize: tokens.typography.scale.base,
              opacity: disabled ? 0.5 : 1,
            }}
          />
        </View>

        {/* Floating send FAB. */}
        <Animated.View style={{ transform: [{ scale: press.scale }] }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Send email"
            accessibilityState={{ disabled: !canSend, busy: sending }}
            disabled={!canSend}
            onPress={submit}
            onPressIn={press.onPressIn}
            onPressOut={press.onPressOut}
            style={{
              width: 52,
              height: 52,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.primary,
              opacity: canSend ? 1 : 0.4,
              ...shadow(canSend ? 'md' : 'none', tokens),
            }}
          >
            <Icon glyph={sending ? '…' : '➤'} color="onPrimary" size="lg" />
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

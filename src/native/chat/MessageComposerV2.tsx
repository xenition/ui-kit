import * as React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { AttachmentBar } from './AttachmentBar';
import type { MessageComposerProps } from './MessageComposer';

/** Drop-in alternate design for {@link MessageComposer} — identical props. */
export type MessageComposerV2Props = MessageComposerProps;

/**
 * MessageComposer — **pill + FAB** variant. The attach button and the growing
 * field live together inside one fully-rounded pill; the send affordance is a
 * separate prominent circular **FAB** that floats to the right of the pill and
 * lifts on a drop shadow once there's something to send. A softer, more modern
 * silhouette than the v1 bordered box + inline send. Same props as
 * `MessageComposer`. No literal colors.
 */
export function MessageComposerV2({
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
}: MessageComposerV2Props): React.ReactElement {
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
          backgroundColor: appearance === 'classic' ? colors.surface : undefined,
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
        {/* The pill: attach + field share one fully-rounded, tinted capsule. */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.06),
            borderWidth: 1,
            borderColor: withAlpha(colors.primary, 0.14),
            paddingLeft: tokens.spacing.sm,
            paddingRight: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add attachment"
            accessibilityState={{ disabled }}
            disabled={disabled}
            onPress={onAttach}
            hitSlop={8}
            style={{ paddingBottom: 6 }}
          >
            <Icon glyph="＋" color="primary" />
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
              paddingVertical: 6,
              fontSize: tokens.typography.scale.base,
            }}
          />
        </View>

        {/* The FAB: a distinct floating circular send button. */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send message"
          accessibilityState={{ disabled: !canSend }}
          disabled={!canSend}
          onPress={submit}
          style={({ pressed }) => ({
            width: 48,
            height: 48,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
            opacity: !canSend ? 0.4 : pressed ? 0.85 : 1,
            ...(canSend ? shadow('md', tokens) : null),
          })}
        >
          <Icon glyph="➤" color="onPrimary" size="lg" />
        </Pressable>
      </View>
    </View>
  );
}

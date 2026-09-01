import * as React from 'react';
import { Pressable, ScrollView, Text, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives';
import { withAlpha } from './internal';

/** A saved reply the agent can drop into the composer with one tap. */
export interface CannedReply {
  /** Stable identifier, reported to `onPickCanned`. */
  id: string;
  /** Short chip label (e.g. "Greeting", "Refund policy"). */
  label: string;
  /** Full reply text this chip represents (for the consumer to insert). */
  body: string;
}

export interface ReplyBoxProps {
  /** Controlled composer text. */
  value: string;
  /** Fires with the next text on every keystroke (controlled). */
  onChangeText: (text: string) => void;
  /** Fires when the agent submits the reply (Send button). */
  onSend?: () => void;
  /** Placeholder shown while empty. Defaults to "Write a reply…". */
  placeholder?: string;
  /** In-flight state — shows a busy Send and blocks submits. */
  sending?: boolean;
  /** Disable the whole composer (input + Send + chips). */
  disabled?: boolean;
  /** Optional quick-pick chips shown above the input. */
  cannedReplies?: readonly CannedReply[];
  /** Fires with the picked chip's `id` when a canned reply is tapped. */
  onPickCanned?: (id: string) => void;
  /** Label for the Send button. Defaults to "Send". */
  sendLabel?: string;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

/**
 * ReplyBox — **V4** "calm console" agent reply composer. A controlled,
 * rounded composer: an optional horizontal row of soft-primary quick-pick chips
 * (canned replies) above a multiline input, with a single primary **Send**
 * button (≥44px tap target) that disables when empty or sending. One accent =
 * primary. Fully controlled — `value` in, `onChangeText` + `onSend` out; nothing
 * fetches. Token-only colors via `useXenitionTheme()`; NO gradients.
 * Dark-mode safe.
 */
export function ReplyBox({
  value,
  onChangeText,
  onSend,
  placeholder = 'Write a reply…',
  sending = false,
  disabled = false,
  cannedReplies,
  onPickCanned,
  sendLabel = 'Send',
  style,
}: ReplyBoxProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const canSend = !disabled && !sending && value.trim().length > 0 && typeof onSend === 'function';
  const chipsDisabled = disabled || sending;
  const hasChips = Array.isArray(cannedReplies) && cannedReplies.length > 0;

  return (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 2,
        },
        style,
      ]}
    >
      {hasChips ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          accessibilityLabel="Quick replies"
          contentContainerStyle={{ gap: tokens.spacing.sm, paddingRight: tokens.spacing.sm }}
        >
          {cannedReplies!.map((reply) => (
            <Pressable
              key={reply.id}
              accessibilityRole="button"
              accessibilityLabel={`Insert quick reply: ${reply.label}`}
              accessibilityState={{ disabled: chipsDisabled }}
              disabled={chipsDisabled}
              onPress={onPickCanned ? () => onPickCanned(reply.id) : undefined}
              style={({ pressed }) => ({
                minHeight: 32,
                justifyContent: 'center',
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.full,
                backgroundColor: withAlpha(colors.primary, 0.12),
                opacity: chipsDisabled ? 0.5 : pressed ? 0.85 : 1,
              })}
            >
              <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                {reply.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.sm }}>
        <TextInput
          accessibilityLabel="Write a reply"
          value={value}
          onChangeText={onChangeText}
          editable={!disabled && !sending}
          multiline
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          style={{
            flex: 1,
            minHeight: 44,
            maxHeight: 120,
            color: colors.onSurface,
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.md,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            fontSize: tokens.typography.scale.sm,
            opacity: disabled || sending ? 0.5 : 1,
          }}
        />
        <Button
          variant="primary"
          size="md"
          accessibilityLabel={sendLabel}
          disabled={!canSend}
          onPress={canSend ? () => onSend!() : undefined}
          style={{ minHeight: 44 }}
        >
          {sending ? 'Sending…' : sendLabel}
        </Button>
      </View>
    </View>
  );
}

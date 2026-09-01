import * as React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { KeyboardAvoiderV4 } from '../layout/KeyboardAvoiderV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressLayer, pressOver } from '../primitives/internal/state-v4';
import { AttachmentChipV4 } from './AttachmentChipV4';
import { canSendMail } from './internal/mail-v4';
import type { ComposeBarProps } from './ComposeBar';

export interface ComposeBarV4Props extends ComposeBarProps {
  /** Name the attach control. Default `'Add attachment'`. */
  attachLabel?: string;
  /** Name the send control. Default `'Send'`. */
  sendLabel?: string;
  /** How tall the body field may grow, in lines. Default `5`. */
  maxLines?: number;
}

/**
 * **V4 compose bar** — same props as {@link ComposeBar} plus `attachLabel`,
 * `sendLabel` and `maxLines`.
 *
 * ## Five changes
 *
 * 1. **Send is dead with an empty recipient.** `canSend` tested the body and
 *    the attachments and never tested `to`, so one character of body — or a
 *    single staged file — fired `onSend({ to: '', … })` and the message went
 *    nowhere with no error. `canSendMail` is the shared rule, so both twins
 *    answer the question the same way. This is the one place V4 is not purely
 *    additive: a bar mounted with **no** `to` prop has no recipient to check
 *    and so cannot send until the caller supplies one.
 * 2. **The bar clears the home indicator.** It read no safe-area inset, so on
 *    a notched phone the send button sat under the home indicator — the one
 *    bug that tells a user this screen was not built for their device.
 * 3. **It gets out of the keyboard's way.** There was no keyboard avoidance of
 *    any kind: raise the keyboard to type and the bar you are typing into is
 *    behind it. `KeyboardAvoiderV4` is the kit's own answer, sized to the bar
 *    rather than to a screen.
 * 4. **The body field's ceiling is `maxLines`, not 140.** A literal height is
 *    a number of lines on exactly one type scale; a dense seed got three lines
 *    where a large one got two.
 * 5. **The attach control clears 44, the field is outlined with `input`, and
 *    press is a state layer.** `hitSlop={8}` around a glyph is not a target;
 *    `border` is the hairline token, not a control outline; and
 *    `opacity: 0.5 / 0.85` mixed M3's *disabled* band into a press. Disabled
 *    is 0.38.
 */
export function ComposeBarV4({
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
  attachLabel = 'Add attachment',
  sendLabel = 'Send',
  maxLines = 5,
  style,
}: ComposeBarV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  // Needs a `SafeAreaProvider` above it (Expo default).
  const insets = useSafeAreaInsets();

  const staged = attachments ?? [];
  const hasAttachments = staged.length > 0;
  // The shared rule, called exactly as the web twin calls it, so the two bars
  // cannot disagree about what a sendable draft is. Note the consequence: a bar
  // mounted with no `to` at all owns no recipient and therefore cannot send —
  // a reply bar passes the address it is replying to.
  const canSend = canSendMail({ to, body, hasAttachments, disabled, sending });

  const submit = (): void => {
    if (!canSend) return;
    onSend?.({ to, subject, body });
  };

  const tap = minTap(tokens.spacing);
  const lineHeight = tokens.typography.scale.base * 1.5;
  // The ceiling in lines, plus the field's own padding, so a dense seed and a
  // large one both stop at `maxLines` rather than at a remembered 140.
  const maxHeight = lineHeight * Math.max(1, maxLines) + tokens.spacing.sm * 2;

  const fieldStyle = {
    color: colors.onSurface,
    fontSize: tokens.typography.scale.base,
    minHeight: tap,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    borderBottomWidth: 1,
    // `input` is the control-outline token; `border` is the hairline between
    // two things, and the base spent it on both.
    borderBottomColor: colors.input,
    opacity: disabledOpacity(theme.state, disabled),
  } as const;

  return (
    <KeyboardAvoiderV4
      // A bar, not a screen: it has no height of its own to shrink, so the
      // avoider's `flex: 1` is overridden and the keyboard's height arrives as
      // padding underneath.
      style={{ flex: 0 }}
    >
      <View
        style={[
          {
            borderTopWidth: 1,
            borderTopColor: colors.border,
            backgroundColor: colors.surface,
            paddingBottom: tokens.spacing.sm + insets.bottom,
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
            placeholderTextColor={colors.mutedText}
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
            placeholderTextColor={colors.mutedText}
            style={fieldStyle}
          />
        ) : null}

        {hasAttachments ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: tokens.spacing.xs,
              padding: tokens.spacing.sm,
            }}
          >
            {staged.map((a) => (
              <AttachmentChipV4
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
            accessibilityLabel={attachLabel}
            accessibilityState={{ disabled }}
            disabled={disabled}
            onPress={onAttach}
            style={({ pressed }) => ({
              width: tap,
              height: tap,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.full,
              backgroundColor: pressed ? pressLayer(theme) : 'transparent',
              opacity: disabledOpacity(theme.state, disabled),
            })}
          >
            <IconV4 glyph="📎" color="mutedText" />
          </Pressable>
          <TextInput
            accessibilityLabel="Message body"
            editable={!disabled}
            multiline
            value={body}
            onChangeText={onChangeBody}
            placeholder={placeholder}
            placeholderTextColor={colors.mutedText}
            style={{
              flex: 1,
              minHeight: tap,
              maxHeight,
              color: colors.onSurface,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.input,
              borderRadius: tokens.radius.lg,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
              fontSize: tokens.typography.scale.base,
              opacity: disabledOpacity(theme.state, disabled),
            }}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={sendLabel}
            accessibilityState={{ disabled: !canSend, busy: sending }}
            disabled={!canSend}
            onPress={submit}
            style={({ pressed }) => ({
              width: tap,
              height: tap,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              // The button owns its fill, so the layer is composited into it.
              backgroundColor: pressed
                ? pressOver(theme, colors.primary, colors.onPrimary)
                : colors.primary,
              opacity: disabledOpacity(theme.state, !canSend),
            })}
          >
            <IconV4 glyph={sending ? '…' : '➤'} color="onPrimary" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoiderV4>
  );
}

import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressLayer } from '../primitives/internal/state-v4';
import { StarButtonV4 } from './StarButtonV4';
import { AttachmentChipV4 } from './AttachmentChipV4';
import { MailLabelChipV4 } from './MailLabelChipV4';
import { skeletonFill, useThreadExpansion } from './internal/mail-v4';
import type { EmailThreadProps } from './EmailThread';

export interface EmailThreadV4Props extends EmailThreadProps {
  /**
   * Which message starts open when the caller does **not** pass `expandedIds`.
   * Defaults to the newest message, which is what the base opened.
   */
  defaultExpandedId?: string;
  /** Announced while the thread loads. Default `'Loading messages'`. */
  loadingLabel?: string;
  /**
   * What to say when the fetch failed. There was no representation of a failed
   * thread at all: it rendered as an empty conversation.
   */
  errorLabel?: string;
}

/** How many ghost messages the loading state draws. */
const SKELETON_ROWS = 3;

/**
 * **V4 email thread** — same props as {@link EmailThread} plus
 * `defaultExpandedId`, `loadingLabel` and `errorLabel`.
 *
 * ## Five changes
 *
 * 1. **Expansion works when nobody is driving it.** The base computed
 *    `new Set(expandedIds ?? [lastId])` fresh on every render and held no
 *    state at all — while `expandedIds` is an *optional* prop and
 *    `onToggleMessage` an optional callback. Mounted the way the module's own
 *    barrel doc describes it (`<EmailThread subject messages />`), every header
 *    tap fired into a callback nobody was listening to: the newest message
 *    stayed open, every earlier one stayed a clipped one-line snippet, and
 *    `accessibilityState.expanded` never flipped. A user tapped the third
 *    reply, saw nothing, tapped again, and concluded the app was broken; a
 *    reader heard "Expand message from Priya, collapsed" every single time.
 *    `useThreadExpansion` — shared with the web twin, so both platforms fix it
 *    the same way — leaves the **controlled** path exactly as it was and gives
 *    the uncontrolled one somewhere to put its state. `onToggleMessage` still
 *    fires on both paths.
 * 2. **The timestamp and the star are outside the toggle.** They were children
 *    of the toggle `Pressable`, so tapping a message's time collapsed it — and
 *    because that Pressable is `accessible`, the star inside it was
 *    presentational: VoiceOver could not reach it at all. Toggle, timestamp
 *    and star are three siblings now, and the toggle is the sender and the
 *    snippet, which is the part that means "open this".
 * 3. **Loading is skeleton messages that announce themselves.** A centred
 *    spinner in a padded box collapsed the layout and then jumped; and the
 *    base's loading view had no role and no live region, so a reader was told
 *    nothing was happening.
 * 4. **A failed fetch has a representation.** `errorLabel` renders it, and
 *    announces — an empty thread and a broken one looked identical before.
 * 5. **The subject is the heading**, and every ink is a `*Text` slot rather
 *    than `colors.muted`, a ramp step carrying no contrast promise.
 */
export function EmailThreadV4({
  subject,
  messages,
  labels,
  expandedIds,
  onToggleMessage,
  onToggleStar,
  onPressAttachment,
  loading = false,
  defaultExpandedId,
  loadingLabel = 'Loading messages',
  errorLabel,
  style,
}: EmailThreadV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const safeMessages = messages ?? [];
  const safeLabels = labels ?? [];
  const lastId =
    safeMessages.length > 0 ? safeMessages[safeMessages.length - 1]!.id : undefined;

  // Before any early return: this holds state, and a hook that only runs when
  // the thread has loaded is a hook that runs conditionally.
  const expansion = useThreadExpansion(expandedIds, defaultExpandedId ?? lastId);

  const surface = { backgroundColor: colors.surface };

  if (errorLabel) {
    return (
      <View
        accessibilityRole="alert"
        accessibilityLiveRegion="assertive"
        style={[surface, style]}
      >
        <EmptyStateV4 title={errorLabel} />
      </View>
    );
  }

  if (loading) {
    return (
      <View
        accessibilityRole="progressbar"
        accessibilityLabel={loadingLabel}
        accessibilityLiveRegion="polite"
        style={[
          surface,
          { padding: tokens.spacing.md, gap: tokens.spacing.lg },
          style,
        ]}
      >
        {Array.from({ length: SKELETON_ROWS }, (_, i) => (
          // The shape it is about to be — an avatar, a sender and a snippet —
          // rather than a spinner that collapses the layout and then jumps.
          <View
            key={i}
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
          >
            <View
              style={{
                width: tokens.spacing['2xl'],
                height: tokens.spacing['2xl'],
                borderRadius: tokens.radius.full,
                backgroundColor: skeletonFill(theme),
              }}
            />
            <View style={{ flex: 1, gap: tokens.spacing.xs }}>
              <View
                style={{
                  height: tokens.typography.scale.base,
                  width: '40%',
                  borderRadius: tokens.radius.sm,
                  backgroundColor: skeletonFill(theme),
                }}
              />
              <View
                style={{
                  height: tokens.typography.scale.sm,
                  width: '75%',
                  borderRadius: tokens.radius.sm,
                  backgroundColor: skeletonFill(theme),
                }}
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <ScrollView style={[surface, style]}>
      <View
        style={{
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          gap: tokens.spacing.sm,
        }}
      >
        <TextV4 accessibilityRole="header" size="xl" weight="bold" tone="onSurface">
          {subject}
        </TextV4>
        {safeLabels.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
            {safeLabels.map((l) => (
              <MailLabelChipV4 key={l.id} label={l.label} tone={l.tone ?? 'neutral'} />
            ))}
          </View>
        ) : null}
      </View>

      {safeMessages.length === 0 ? (
        <View style={{ padding: tokens.spacing.xl }}>
          <EmptyStateV4 title="No messages" description="This conversation is empty." />
        </View>
      ) : (
        safeMessages.map((m) => {
          const isOpen = expansion.isOpen(m.id);
          const atts = m.attachments ?? [];
          return (
            <View
              key={m.id}
              style={{
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${isOpen ? 'Collapse' : 'Expand'} message from ${m.sender}`}
                  accessibilityState={{ expanded: isOpen }}
                  onPress={() => {
                    // A no-op on the controlled path — the caller owns it —
                    // and the callback fires either way, exactly as before.
                    expansion.toggle(m.id);
                    onToggleMessage?.(m.id);
                  }}
                  style={({ pressed }) => ({
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    minHeight: minTap(tokens.spacing),
                    paddingHorizontal: tokens.spacing.xs,
                    marginHorizontal: -tokens.spacing.xs,
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed ? pressLayer(theme) : 'transparent',
                  })}
                >
                  <AvatarV4 size="md" src={m.avatarUri} name={m.sender} />
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
                      {m.sender}
                    </TextV4>
                    {!isOpen ? (
                      <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
                        {m.body}
                      </TextV4>
                    ) : null}
                  </View>
                </Pressable>
                {m.timestamp ? (
                  <TextV4 size="xs" tone="mutedText" numeric="tabular">
                    {m.timestamp}
                  </TextV4>
                ) : null}
                <StarButtonV4
                  starred={m.starred ?? false}
                  onToggle={onToggleStar ? (s) => onToggleStar(m.id, s) : undefined}
                  size="base"
                />
              </View>

              {isOpen ? (
                <View style={{ marginTop: tokens.spacing.sm, gap: tokens.spacing.sm }}>
                  <TextV4 size="base" tone="onSurface">
                    {m.body}
                  </TextV4>
                  {atts.length > 0 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: tokens.spacing.xs,
                      }}
                    >
                      {atts.map((a) => (
                        <AttachmentChipV4
                          key={a.id}
                          name={a.name}
                          kind={a.kind ?? 'file'}
                          size={a.size}
                          onPress={
                            onPressAttachment ? () => onPressAttachment(m.id, a.id) : undefined
                          }
                        />
                      ))}
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

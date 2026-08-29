import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { EmptyStateProps } from './EmptyState';

export type { EmptyStateProps as EmptyStateV4Props };

/**
 * `EmptyState`, V4 — the same props, and the action outranks the picture.
 *
 * ## §15: an empty state exists to move the user forward
 *
 * "No data." is the failure mode §15 names. The answer is three things in
 * order — what belongs here, why it matters, and what to do next — and the
 * third one is the only one that changes anything. So V4 reorders the emphasis:
 *
 * - The **illustration** keeps its familiar place at the top (§31 — use the
 *   established pattern) but loses the visual centre. It is hidden from the
 *   accessibility tree and sits one `sm` step from the title, so it reads as a
 *   quiet mark on the heading rather than as the subject of the screen.
 * - The **title** carries the weight the icon gave up: the heading face at
 *   `lg`, which is §10's "typography before containers".
 * - The **action** is separated by the largest gap in the component. That
 *   separation is what makes it terminal — the one dominant thing §5 asks
 *   every screen to have — rather than a footnote under the copy.
 *
 * The honest limit: `icon` and `action` are caller slots, so this component
 * cannot resize what it is handed. What it can do is decide the order, the
 * spacing and which element gets the room. It does that, and does not pretend
 * to more.
 *
 * ## The dashed box is gone
 *
 * The base draws a dashed rectangle around the whole thing. §11 asks that a
 * container earn its existence, and this one does not: an empty state already
 * occupies the region whose emptiness it is explaining, so the outline
 * describes a boundary the reader can already see. A dashed placeholder
 * rectangle is also one of §8's listed tells of generic generated UI. What
 * replaces it is space — §9, spacing as structure.
 *
 * ## Colour
 *
 * The description moves from `muted` to `mutedText`. `muted` is a decorative
 * slot with no contrast promise; a sentence explaining what the user should do
 * next is text, and §46 puts its legibility ahead of its quietness.
 *
 * The measure it wraps at is `2xl × 7` off the spacing scale rather than the
 * base's literal 320, so a re-scaled seed re-scales it — and so both twins land
 * on the same number instead of 320 here and `max-w-sm` there.
 */
export function EmptyStateV4({
  icon,
  title,
  description,
  action,
  style,
}: EmptyStateProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const measure = tokens.spacing['2xl'] * 7;

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing['2xl'],
        },
        style,
      ]}
    >
      {icon ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ marginBottom: tokens.spacing.sm }}
        >
          {icon}
        </View>
      ) : null}
      {typeof title === 'string' ? (
        <Text
          style={{
            color: colors.onSurface,
            fontFamily: tokens.typography.fontHeading,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
      ) : (
        title
      )}
      {description ? (
        typeof description === 'string' ? (
          <Text
            style={{
              // `mutedText`, not `muted`: this sentence is what tells the user
              // what to do, and `muted` carries no contrast promise.
              color: colors.mutedText,
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.sm,
              textAlign: 'center',
              maxWidth: measure,
            }}
          >
            {description}
          </Text>
        ) : (
          description
        )
      ) : null}
      {/*
        The largest gap in the component, and the reason it is here: the action
        is what the empty state is FOR (§15), so it gets the room that makes it
        read as the next step rather than as a caption.
      */}
      {action ? <View style={{ marginTop: tokens.spacing.lg }}>{action}</View> : null}
    </View>
  );
}

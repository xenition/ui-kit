import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { RatingV4 } from '../primitives/RatingV4';
import { TextV4 } from '../primitives/TextV4';
import { metaLine } from './internal/salon-v4';
import type { ReviewCardProps } from './ReviewCard';

export interface ReviewCardV4Props extends ReviewCardProps {
  /** Copy on the verified chip. Default `'Verified visit'`. */
  verifiedLabel?: string;
  /** Label above the salon's reply. Default `'Reply from the salon'`. */
  replyLabel?: string;
}

/**
 * **V4 review card** — same props as {@link ReviewCard} plus `verifiedLabel`
 * and `replyLabel`.
 *
 * ## Four changes
 *
 * 1. **The rating carries its number**, and the whole header is announced as
 *    one string — the base left the author, the stars and the date as three
 *    loose fragments a reader walks through separately.
 * 2. **The reply is attributed.** An indented paragraph under a review does
 *    not say who wrote it; `replyLabel` does, which matters because the reply
 *    is the *business* answering a customer.
 * 3. **`verified` is a chip with a word**, not a bare checkmark glyph.
 * 4. **The reply's ground is a mixed tint on the card**, so it reads as a
 *    nested quote in both schemes rather than a grey box that vanishes on a
 *    dark page.
 *
 * **Renders nothing without an `author`** (§4.5).
 */
export function ReviewCardV4({
  author,
  rating,
  text,
  date,
  service,
  avatarUrl,
  verified = false,
  variant = 'default',
  reply,
  verifiedLabel = 'Verified visit',
  replyLabel = 'Reply from the salon',
  style,
}: ReviewCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!author) return null;

  const compact = variant === 'compact';
  const caption = metaLine([service, date]);

  return (
    <CardV4
      accessible
      accessibilityLabel={metaLine([
        author,
        typeof rating === 'number' ? `rated ${rating}` : null,
        verified ? verifiedLabel : null,
        caption,
        text,
      ])}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <AvatarV4 src={avatarUrl} name={author} size={compact ? 'xs' : 'sm'} />
        <View style={{ flex: 1, gap: tokens.spacing.xs / 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            <TextV4 size="sm" weight="semibold" tone="onCard" numberOfLines={1} style={{ flexShrink: 1 }}>
              {author}
            </TextV4>
            {verified ? (
              <BadgeV4 tone="success" variant="soft" size="sm">
                {verifiedLabel}
              </BadgeV4>
            ) : null}
          </View>
          {caption ? (
            <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
              {caption}
            </TextV4>
          ) : null}
        </View>
        <RatingV4 value={rating} size="sm" showValue />
      </View>

      {text ? (
        <TextV4 size="sm" tone="onCard" numberOfLines={compact ? 3 : undefined}>
          {text}
        </TextV4>
      ) : null}

      {reply ? (
        <View
          style={{
            gap: tokens.spacing.xs / 2,
            borderRadius: tokens.radius.md,
            borderLeftWidth: 2,
            borderLeftColor: colors.primary,
            backgroundColor: colors.selected,
            padding: tokens.spacing.sm,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <IconV4 name="send" size="xs" color="primaryText" />
            <TextV4 size="xs" weight="semibold" tone="mutedText">
              {replyLabel}
            </TextV4>
          </View>
          <TextV4 size="sm" tone="onSelected">
            {reply}
          </TextV4>
        </View>
      ) : null}
    </CardV4>
  );
}

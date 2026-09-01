import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { metaLine } from '../primitives/internal/tone-v4';
import { pressOver } from '../primitives/internal/state-v4';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  spokenLine,
  tintGround,
} from './internal/civic-v4';
import type { NoticeCategory, PublicNoticeCardProps } from './PublicNoticeCard';

export interface PublicNoticeCardV4Props extends PublicNoticeCardProps {
  /** Override the seven category words (`'Public hearing'`, `'Roadwork'`, …). */
  categoryLabels?: Partial<Record<NoticeCategory, string>>;
  /** What the unread flag says. Default `'New'`. */
  newLabel?: string;
}

/**
 * Category → its word and its glyph. The tone is gone: a category is
 * **identity**, and the base spent `warn` on Roadwork, `primary` on a hearing
 * and `accent` on a meeting — three status colours describing what kind of
 * notice it is rather than how anything turned out.
 */
const CATEGORY_V4: Record<NoticeCategory, { label: string; glyph: string }> = {
  hearing: { label: 'Public hearing', glyph: '⚖️' },
  meeting: { label: 'Meeting', glyph: '📋' },
  roadwork: { label: 'Roadwork', glyph: '🚧' },
  election: { label: 'Election', glyph: '🗳️' },
  ordinance: { label: 'Ordinance', glyph: '📜' },
  bid: { label: 'Bid / RFP', glyph: '📑' },
  general: { label: 'Notice', glyph: '📢' },
};

/**
 * **V4 public notice** — same props as {@link PublicNoticeCard} plus
 * `categoryLabels` and `newLabel`.
 *
 * ## Four changes
 *
 * 1. **The date and the venue join the name.** The card announced
 *    `` `${category}: ${title}` `` and stopped, so a hearing notice's date —
 *    the legally operative field, the one that decides whether you can still
 *    object — was pruned, along with the address it concerns.
 * 2. **"New" stops being `danger`.** Unread is not a hazard, and `danger` is
 *    the same tone this module uses for Denied, Rejected and Urgent, so an
 *    unread roadwork notice read visually as a rejection. It is `primary`
 *    emphasis now — the module's tone for open and just-arrived.
 * 3. **The category stops wearing a status colour** at all, badge and disc
 *    alike: `IDENTITY_TONE`, so `warn` keeps meaning "look at this" rather
 *    than "this one is about roads".
 * 4. **The press is a state layer**, not `opacity: 0.85` — an opacity that
 *    fades the card's own content, which is how M3 draws *disabled*. The meta
 *    line is built before it is tested, so a notice whose agency, date and
 *    location are all empty strings renders no empty caption where the web
 *    twin renders none either.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export function PublicNoticeCardV4({
  category,
  title,
  body,
  agency,
  date,
  location,
  isNew = false,
  categoryLabels,
  newLabel = 'New',
  onPress,
  style,
}: PublicNoticeCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const cat = CATEGORY_V4[category] ?? CATEGORY_V4.general;
  const categoryWord = categoryLabels?.[category] ?? cat.label;
  const meta = metaLine([agency, location, date]);
  const disc = tokens.spacing.xl + tokens.spacing.sm;

  const spoken = spokenLine([
    isNew ? newLabel : null,
    categoryWord,
    title,
    date,
    location,
    agency,
  ]);

  const content = (pressed: boolean): React.ReactElement => (
    <CardV4
      variant={CARD_V4}
      style={[
        pressed ? { backgroundColor: pressOver(theme, colors.surface, colors.onSurface) } : null,
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: disc,
            height: disc,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: tintGround(theme, IDENTITY_TONE),
          }}
        >
          {/* Decorative: the category is written in the badge beside it. */}
          <IconV4 glyph={cat.glyph} />
        </View>
        <View
          style={{
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            flexWrap: 'wrap',
          }}
        >
          <BadgeV4 tone={IDENTITY_TONE} {...BADGE_V4}>
            {categoryWord}
          </BadgeV4>
          {isNew ? (
            <BadgeV4 tone="primary" {...BADGE_V4}>
              {`● ${newLabel}`}
            </BadgeV4>
          ) : null}
        </View>
      </View>

      <TextV4 size="base" weight="bold" tone="onSurface" style={{ marginTop: tokens.spacing.sm }}>
        {title}
      </TextV4>

      {body ? (
        <TextV4
          size="sm"
          tone="onSurface"
          numberOfLines={3}
          style={{ marginTop: tokens.spacing.xs / 2 }}
        >
          {body}
        </TextV4>
      ) : null}

      {meta !== '' ? (
        <TextV4 size="xs" tone="mutedText" style={{ marginTop: tokens.spacing.sm }}>
          {meta}
        </TextV4>
      ) : null}
    </CardV4>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={spoken}>
        {content(false)}
      </View>
    );
  }

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={spoken} onPress={onPress}>
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}

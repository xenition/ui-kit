import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  rowContainerStyle,
  rowLeadingStyle,
  rowPressFill,
  rowTextStyle,
  rowTrailingStyle,
} from '../dashboard/internal/row-v4';
import {
  BADGE_V4,
  IDENTITY_TONE,
  labelledId,
  spokenLine,
  tintGround,
  tintInk,
  type ToneV4,
} from './internal/civic-v4';
import type { ComplaintPriority, ComplaintRowProps, ComplaintStatus } from './ComplaintRow';

export interface ComplaintRowV4Props extends ComplaintRowProps {
  /** Override the four priority words (`'Urgent'`, `'High'`, …). */
  priorityLabels?: Partial<Record<ComplaintPriority, string>>;
  /** Override the five status words (`'In progress'`, `'Resolved'`, …). */
  statusLabels?: Partial<Record<ComplaintStatus, string>>;
}

/** What the ticket number identifies — the word the base's own spoken name used. */
const TICKET_LABEL = 'Request';

const STATUS_V4: Record<ComplaintStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  open: { label: 'Open', glyph: '🆕', tone: IDENTITY_TONE },
  assigned: { label: 'Assigned', glyph: '👤', tone: IDENTITY_TONE },
  'in-progress': { label: 'In progress', glyph: '🔧', tone: 'warn' },
  resolved: { label: 'Resolved', glyph: '✓', tone: 'success' },
  closed: { label: 'Closed', glyph: '✕', tone: 'neutral' },
};

const PRIORITY_V4: Record<ComplaintPriority, { label: string; glyph: string; tone: ToneV4 }> = {
  low: { label: 'Low', glyph: '↓', tone: 'neutral' },
  normal: { label: 'Normal', glyph: '•', tone: 'neutral' },
  high: { label: 'High', glyph: '↑', tone: 'warn' },
  urgent: { label: 'Urgent', glyph: '!', tone: 'danger' },
};

/**
 * **V4 complaint row** — same props as {@link ComplaintRow} plus
 * `priorityLabels` and `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **"Urgent" joins the name.** Priority is the module's only triage
 *    escalation, it is drawn as a pill, and the row announced
 *    `` `Request ${ticket}, ${title}, ${status}` `` — so the one field that
 *    says *this one first* never reached a reader at all. The category and the
 *    filed date were pruned with it.
 * 2. **The ticket number is labelled**, visibly and in the name, instead of a
 *    bare "311-88214" a reader cannot place.
 * 3. **One badge shape.** The status pill was `soft` and the priority pill
 *    `outline` in the same row, which reads as two different kinds of thing
 *    rather than two facts about one request.
 * 4. **It is a row from the shared row line** — the family's 44 leading slot
 *    and metrics — with a state layer in place of `opacity: 0.7`, and a status
 *    disc inked with the contrast-corrected slot on an opaque ground rather
 *    than a fill slot washed over whatever is behind it, which is a different
 *    colour on every surface it lands on.
 * 5. **A queue position is not a status.** `open` was `primary` and `assigned`
 *    was `accent` — brand colours spent on where a request sits in a queue,
 *    the way `fieldservice` spent them on `en-route` and `on-site`. Both are
 *    `IDENTITY_TONE` now, so the tones that survive mean an outcome:
 *    `resolved` is done, `urgent` needs you.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export function ComplaintRowV4({
  ticketNumber,
  title,
  status,
  category,
  priority,
  date,
  priorityLabels,
  statusLabels,
  onPress,
  style,
}: ComplaintRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const sd = STATUS_V4[status] ?? STATUS_V4.open;
  const statusWord = statusLabels?.[status] ?? sd.label;
  const pr = priority ? (PRIORITY_V4[priority] ?? PRIORITY_V4.normal) : undefined;
  // Only an escalation is worth a pill; `low` and `normal` are the absence of
  // one, and a badge saying "Normal" on every row is noise.
  const showPriority = pr != null && (priority === 'high' || priority === 'urgent');
  const priorityWord = priority && pr ? (priorityLabels?.[priority] ?? pr.label) : undefined;
  const idLine = labelledId(TICKET_LABEL, ticketNumber);

  const name = spokenLine([
    title,
    idLine,
    category,
    statusWord,
    showPriority ? priorityWord : null,
    date,
  ]);

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: true }),
        {
          backgroundColor: pressed ? rowPressFill(theme, colors.surface, colors.onSurface) : 'transparent',
        },
        style,
      ]}
    >
      <View
        style={[
          rowLeadingStyle(theme),
          {
            borderRadius: tokens.radius.full,
            backgroundColor: tintGround(theme, sd.tone),
          },
        ]}
      >
        {/* Decorative: the status word is in the pill and in the row's name. */}
        <IconV4 glyph={sd.glyph} style={{ color: tintInk(theme, sd.tone) }} />
      </View>

      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
          {title}
        </TextV4>
        <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
          {metaLine([idLine, category])}
        </TextV4>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          <BadgeV4 tone={sd.tone} {...BADGE_V4}>
            {`${sd.glyph} ${statusWord}`}
          </BadgeV4>
          {showPriority && priorityWord != null ? (
            <BadgeV4 tone={pr.tone} {...BADGE_V4}>
              {`${pr.glyph} ${priorityWord}`}
            </BadgeV4>
          ) : null}
        </View>
      </View>

      {date ? (
        <View style={rowTrailingStyle(theme)}>
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {date}
          </TextV4>
        </View>
      ) : null}
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={name}>
        {content(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}

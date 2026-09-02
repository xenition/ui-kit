import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import type { IconName } from '../../primitives/icon-names';
import { isAdverse } from '../../jobs/hiring-v4';
import { formatShortDate, formatTime as formatClock } from './format';
import type { InterviewMode } from './types';
import { spokenName, type ToneV4 } from './internal/tone-v4';
import type { InterviewSlotProps } from './InterviewSlot';

/**
 * What has happened to a slot.
 *
 * New in V4, and the reason it is new is a defect: `Interview` carried no
 * status field at all, so an interview the employer cancelled could only be
 * expressed by passing `disabled` — which draws "unavailable, dimmed" with no
 * word explaining why, and reads identically to a slot that is merely display
 * only.
 */
export type InterviewSlotStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'rescheduled';

export interface InterviewSlotV4Props extends InterviewSlotProps {
  /** What has happened to this slot. Default `undefined` — nothing claimed. */
  status?: InterviewSlotStatus;
  /** Why, for an adverse `status`. Drawn and announced. */
  statusReason?: string;
  /** Re-word the interview channel. Defaults to On-site / Video / Phone. */
  modeLabels?: Partial<Record<InterviewMode, string>>;
  /** Render the date. Default a localized short date, e.g. `'Jun 15'`. */
  formatDate?: (iso: string) => string;
  /** Render a time. Default a localized `h:mm a`. */
  formatTime?: (iso: string) => string;
}

/** Mode → the glyph that says the channel without saying it in colour. */
const MODE_ICON: Record<InterviewMode, IconName> = {
  onsite: 'location',
  video: 'camera',
  phone: 'phone',
};

/** Mode → its default word. */
const MODE_LABEL: Record<InterviewMode, string> = {
  onsite: 'On-site',
  video: 'Video',
  phone: 'Phone',
};

/** Status → its default word. A status is never carried by hue alone. */
const STATUS_LABEL: Record<InterviewSlotStatus, string> = {
  scheduled: 'Scheduled',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  rescheduled: 'Rescheduled',
};

/** Status → tone. These four are genuine statuses, so they may take one. */
const STATUS_TONE: Record<InterviewSlotStatus, ToneV4> = {
  scheduled: 'neutral',
  confirmed: 'success',
  cancelled: 'danger',
  rescheduled: 'warn',
};

/**
 * **V4 interview slot** — same props as {@link InterviewSlot} plus `status`,
 * `statusReason`, `modeLabels`, `formatDate` and `formatTime`.
 *
 * ## Five changes
 *
 * 1. **A slot that cannot be read is not drawn.** An unparseable `startsAt`
 *    produced a blank date and a blank time whose accessible name was
 *    literally `" , Video"` — a control announcing a comma. A slot with no
 *    time is not a slot, so it renders nothing (§4.5).
 * 2. **An unknown mode is not called a video call.** `MODE[mode] ?? MODE.video`
 *    fell back to Video for any value outside the union, announcing a video
 *    interview for something that is not one — a candidate could turn up in
 *    the wrong place. An unrecognised mode now claims nothing: no glyph, no
 *    word.
 * 3. **Display-only is no longer drawn as unavailable.** A slot with no
 *    `onSelect` was rendered `disabled` — dimmed, and announced as
 *    unavailable, which for an interview reads as *cancelled*. It is now a
 *    plain announced element at full strength, and the actual adverse case has
 *    a `status` of its own to say so in a word, with `statusReason` for why.
 *    `disabled` still means what it says, and still dims — to M3's 0.38, not
 *    the base's picked 0.5.
 * 4. **Selected is the compiler's own slot.** The base filled the whole card
 *    with `primary` and inked everything `onPrimary`, which left no readable
 *    pair for a status badge sitting on top of it. `selected`/`onSelected`
 *    exist precisely for "the chosen one" and ship as a guaranteed pair.
 * 5. **44, and a state layer.** The base's press was `opacity: 0.9` — M3
 *    spends opacity on *disabled* — and a compact slot chip could fall well
 *    under the tap floor.
 */
export function InterviewSlotV4({
  interview,
  selected = false,
  disabled = false,
  onSelect,
  status,
  statusReason,
  modeLabels,
  formatDate,
  formatTime,
  style,
}: InterviewSlotV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens, state } = theme;

  const startsAt = interview?.startsAt;
  const dateLabel = startsAt ? (formatDate ?? formatShortDate)(startsAt) : '';
  const start = startsAt ? (formatTime ?? formatClock)(startsAt) : '';
  // Both formatters return '' for an instant that does not parse, so this one
  // test covers a missing date, a malformed one and a caller's own formatter
  // declining to render it.
  if (!dateLabel && !start) return null;

  const end = interview.endsAt ? (formatTime ?? formatClock)(interview.endsAt) : '';
  const timeRange = end ? `${start} – ${end}` : start;

  // An unrecognised mode says nothing rather than something false.
  const known = interview.mode in MODE_LABEL;
  const modeLabel = known ? (modeLabels?.[interview.mode] ?? MODE_LABEL[interview.mode]) : null;
  const modeIcon = known ? MODE_ICON[interview.mode] : null;

  const statusWord = status ? STATUS_LABEL[status] : null;
  const reason = status && isAdverse(status) ? statusReason : undefined;

  const ground = selected ? colors.selected : colors.card;
  const ink = selected ? colors.onSelected : colors.onCard;

  const name = spokenName([
    dateLabel,
    timeRange,
    modeLabel,
    interview.interviewer ? `with ${interview.interviewer}` : null,
    statusWord,
    reason,
  ]);

  const box = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        {
          gap: tokens.spacing.xs,
          minHeight: minTap(tokens.spacing),
          justifyContent: 'center',
          backgroundColor: pressed ? pressOver(theme, ground, ink) : ground,
          borderColor: selected ? colors.primary : colors.border,
          borderWidth: selected ? 2 : 1,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
          opacity: disabledOpacity(state, disabled),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        {modeIcon ? <IconV4 name={modeIcon} size="sm" color="mutedText" /> : null}
        <TextV4 size="xs" weight="semibold" style={{ color: ink }} numberOfLines={1}>
          {modeLabel ? `${dateLabel}  ·  ${modeLabel}` : dateLabel}
        </TextV4>
      </View>

      <TextV4 size="base" weight="semibold" numeric="tabular" style={{ color: ink }}>
        {timeRange}
      </TextV4>

      {interview.interviewer ? (
        <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
          {interview.interviewer}
        </TextV4>
      ) : null}

      {statusWord ? (
        <View style={{ flexDirection: 'row' }}>
          <BadgeV4 tone={STATUS_TONE[status as InterviewSlotStatus]} variant="soft" size="sm">
            {statusWord}
          </BadgeV4>
        </View>
      ) : null}

      {reason ? (
        <TextV4 size="xs" tone="dangerText" numberOfLines={2}>
          {reason}
        </TextV4>
      ) : null}
    </View>
  );

  // No `onSelect` means this slot is a statement, not an offer. The base drew
  // it as a disabled button, which for an interview reads as cancelled.
  if (!onSelect) {
    return (
      <View accessible accessibilityLabel={name} accessibilityState={{ selected, disabled }}>
        {box(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={() => onSelect(interview)}
    >
      {({ pressed }) => box(pressed)}
    </Pressable>
  );
}

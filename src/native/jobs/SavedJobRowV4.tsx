import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import {
  rowContainerStyle,
  rowEdgeStyle,
  rowLeadingStyle,
  rowTextStyle,
  rowTrailingStyle,
} from '../dashboard/internal/row-v4';
import { EMPLOYMENT_LABEL } from './types';
import { SalaryRangeV4 } from './SalaryRangeV4';
import { relativeLabel, salaryText, spokenName } from './internal/tone-v4';
import type { SavedJobRowProps } from './SavedJobRow';

export interface SavedJobRowV4Props extends SavedJobRowProps {
  /** Name of the un-save affordance. Default `'Remove from saved'`. */
  removeLabel?: string;
  /** Re-word the saved age. Default `'2d ago'`. */
  formatRelative?: (iso: string) => string;
  /** The last row in a list — drops the separator that would hang off the end. */
  last?: boolean;
}

/**
 * **V4 saved-job row** — same props as {@link SavedJobRow} plus `removeLabel`,
 * `formatRelative` and `last`.
 *
 * ## Five changes
 *
 * 1. **The remove control is reachable.** It sat inside the row's own
 *    `Pressable`, which flattens its subtree on native — so the only way to
 *    un-save a job was invisible to a screen reader, and on the web twin
 *    pressing Enter on it opened the job instead of removing it. The row
 *    container is now a plain `View`, the activation wraps the avatar and text,
 *    and the ★ sits beside it as a real focus stop with a 44 target.
 * 2. **Removing is an action, not a toggle.** The base hard-coded
 *    `accessibilityState={{ selected: true }}` on it (and `aria-pressed={true}`
 *    on web), so the reader announced a permanently-on toggle. Pressing it
 *    removes the job; there is no second state to be in.
 * 3. **The row says what it is.** Its name was the title and the company. The
 *    pay, the employment type and the saved age are all inside the activation
 *    and flattened into it, so they are now part of the name — otherwise they
 *    are drawn for sighted users only.
 * 4. **Employment type lost its status colour.** `contract → warn` and
 *    `remote → success` are identity wearing the palette's two warning
 *    colours. A neutral chip carries the same fact and leaves `warn` meaning
 *    "caution".
 * 5. **It is a row from the shared row line** — one height, one 44 leading
 *    slot, one state layer, one hairline — with `mutedText` inking the
 *    captions instead of `muted`, which is a fill with no contrast promise.
 *
 * **Renders nothing without a job title** (§4.5).
 */
export function SavedJobRowV4({
  job,
  savedAt,
  onPress,
  onRemove,
  removeLabel = 'Remove from saved',
  formatRelative,
  last = false,
  style,
}: SavedJobRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!job?.title) return null;

  const saved = relativeLabel(savedAt, formatRelative);
  const savedText = saved ? `Saved ${saved}` : '';
  const pay = salaryText(job.salary).text;
  const tap = minTap(tokens.spacing);

  const name = spokenName([
    job.title,
    job.companyName,
    EMPLOYMENT_LABEL[job.type],
    pay,
    savedText,
  ]);

  const body = (
    <>
      <View style={rowLeadingStyle(theme)}>
        <AvatarV4 src={job.companyLogoUrl} name={job.companyName} size="sm" />
      </View>
      <View style={rowTextStyle(theme)}>
        <TextV4 size="sm" weight="semibold" tone="onCard" numberOfLines={1}>
          {job.title}
        </TextV4>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            flexWrap: 'wrap',
          }}
        >
          <BadgeV4 tone="neutral" size="sm">
            {EMPLOYMENT_LABEL[job.type]}
          </BadgeV4>
          {job.salary ? <SalaryRangeV4 salary={job.salary} size="sm" glyph={null} /> : null}
        </View>
        {savedText ? (
          <TextV4 size="xs" tone="mutedText">
            {savedText}
          </TextV4>
        ) : null}
      </View>
    </>
  );

  return (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: true }),
        { alignItems: 'flex-start' },
        !last ? rowEdgeStyle(theme) : null,
        style,
      ]}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={name}
          onPress={() => onPress(job)}
          style={({ pressed }) => ({
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
          })}
        >
          {body}
        </Pressable>
      ) : (
        <View
          accessible
          accessibilityLabel={name}
          style={{
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
          }}
        >
          {body}
        </View>
      )}

      {onRemove ? (
        <View style={rowTrailingStyle(theme)}>
          <Pressable
            accessibilityRole="button"
            // No `selected` state: this removes the job, it does not toggle it.
            accessibilityLabel={spokenName([removeLabel, job.title])}
            onPress={() => onRemove(job)}
            style={({ pressed }) => ({
              minWidth: tap,
              minHeight: tap,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.full,
              backgroundColor: pressed
                ? pressOver(theme, colors.card, colors.onCard)
                : 'transparent',
            })}
          >
            <TextV4 size="lg" tone="primaryText">
              ★
            </TextV4>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

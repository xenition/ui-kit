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
  isAdverse,
  labelledId,
  spokenLine,
  tintGround,
  tintInk,
} from './internal/civic-v4';
import { formStatus } from './internal/status';
import type { FormStatusRowProps, FormStatusValue } from './FormStatusRow';

export interface FormStatusRowV4Props extends FormStatusRowProps {
  /** Why the form was rejected or what action it needs. Rendered when the status is adverse. */
  reason?: string;
  /** Override the six status words (`'Action needed'`, `'Rejected'`, …). */
  statusLabels?: Partial<Record<FormStatusValue, string>>;
}

/** What the form number identifies — the word the base's own spoken name used. */
const FORM_LABEL = 'Form';

/**
 * **V4 form status row** — same props as {@link FormStatusRow} plus `reason`
 * and `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **`action-needed` and `rejected` can say why.** The two states that exist
 *    to make somebody act carried no field for what to do or what went wrong —
 *    the row said "Action needed" and left the applicant to phone the agency.
 *    `isAdverse()` decides when the `reason` renders, and the line is an
 *    assertive live region so a status that changes under a reader is heard.
 * 2. **The form number is labelled.** It rendered as a bare "APP-77412",
 *    visibly and in the spoken name, with nothing saying what it identified.
 * 3. **The row is one name carrying the agency and the date.** The base's
 *    three-field template — number, title, status — pruned exactly the two
 *    fields an applicant chasing a form needs.
 * 4. **It is a row from the shared row line**, with the family's 44 leading
 *    slot, its metrics and its state layer, instead of `opacity: 0.7` — an
 *    opacity that dims the row's content the way M3 marks a *disabled* one.
 *    The status disc takes the contrast-corrected ink on a ground composited
 *    against an opaque ground, not a fill slot washed over whatever is behind
 *    it — a translucent tint is a different colour on every surface it lands on.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export function FormStatusRowV4({
  formNumber,
  title,
  status,
  agency,
  date,
  reason,
  statusLabels,
  onPress,
  style,
}: FormStatusRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const sd = formStatus(status);
  const statusWord = statusLabels?.[status] ?? sd.label;
  const adverse = isAdverse(status);
  const idLine = labelledId(FORM_LABEL, formNumber);
  const showReason = adverse && Boolean(reason);

  const name = spokenLine([
    title,
    idLine,
    agency,
    statusWord,
    date,
    showReason ? reason : null,
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
          {metaLine([idLine, agency])}
        </TextV4>
        {showReason ? (
          <TextV4
            size="xs"
            accessibilityLiveRegion="assertive"
            style={{ color: tintInk(theme, sd.tone) }}
          >
            {reason}
          </TextV4>
        ) : null}
      </View>

      <View style={[rowTrailingStyle(theme), { alignItems: 'flex-end', flexDirection: 'column' }]}>
        <BadgeV4 tone={sd.tone} {...BADGE_V4}>
          {`${sd.glyph} ${statusWord}`}
        </BadgeV4>
        {date ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {date}
          </TextV4>
        ) : null}
      </View>
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

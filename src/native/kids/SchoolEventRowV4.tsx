import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { IDENTITY_TONE, metaLine, rowShellStyle, spokenLine } from './internal/tone-v4';
import type { SchoolEventRowProps, SchoolEventType } from './SchoolEventRow';

export interface SchoolEventRowV4Props extends SchoolEventRowProps {
  /** The word each event type is printed and announced with. */
  typeLabels?: Partial<Record<SchoolEventType, string>>;
}

const TYPE_GLYPH: Record<SchoolEventType, string> = {
  holiday: '🏖️',
  exam: '📝',
  meeting: '👥',
  trip: '🚌',
  activity: '⚽',
  deadline: '⏳',
  other: '🏫',
};

const TYPE_LABEL: Record<SchoolEventType, string> = {
  holiday: 'Holiday',
  exam: 'Exam',
  meeting: 'Meeting',
  trip: 'Trip',
  activity: 'Activity',
  deadline: 'Deadline',
  other: 'Event',
};

/**
 * **V4 school event row** — same props as {@link SchoolEventRow} plus
 * `typeLabels`.
 *
 * ## Four changes
 *
 * 1. **An exam is not an error and a holiday is not a success.** The base drew
 *    `exam → danger` and `holiday → success`, spending two status colours on
 *    what is plainly a *category*. A child looking at their own calendar saw a
 *    red chip on the exam. Every type now wears the same neutral chip and is
 *    told apart by its glyph and its word, which is the only version that also
 *    survives greyscale and a screen reader.
 * 2. **The row's summary is not silently dropped.** The non-pressable branch
 *    put `accessibilityLabel` on a bare `View` with no `accessible`, which
 *    Android ignores entirely — so the row read as one name on iOS and as four
 *    loose fragments on Android.
 * 3. **The spoken name carries the whole row**, including the time, the
 *    location and which child it concerns. It stopped at the date before, so
 *    "Room 12" and "Maya" were on screen and nowhere else.
 * 4. **`card`/`onCard` and a state layer** instead of the page's `surface` and
 *    `opacity: pressed ? 0.85 : 1`, which is inside M3's *disabled* band.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export function SchoolEventRowV4({
  title,
  type = 'other',
  date,
  time,
  location,
  childName,
  typeLabels,
  onPress,
  style,
}: SchoolEventRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const glyph = TYPE_GLYPH[type] ?? TYPE_GLYPH.other;
  const word = typeLabels?.[type] ?? TYPE_LABEL[type] ?? TYPE_LABEL.other;
  const caption = metaLine([date, time, location]);
  const spoken = spokenLine([word, title, date, time, location, childName]);

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowShellStyle(theme),
        pressed ? { backgroundColor: pressOver(theme, colors.card, colors.onCard) } : null,
        style,
      ]}
    >
      <TextV4
        size="xl"
        allowFontScaling={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {glyph}
      </TextV4>
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {title}
        </TextV4>
        {caption ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {caption}
          </TextV4>
        ) : null}
        {childName ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {`👶 ${childName}`}
          </TextV4>
        ) : null}
      </View>
      {/* Identity, not status — see IDENTITY_TONE. */}
      <BadgeV4 tone={IDENTITY_TONE} variant="soft" size="sm">
        {word}
      </BadgeV4>
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={spoken}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={spoken} onPress={onPress}>
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}

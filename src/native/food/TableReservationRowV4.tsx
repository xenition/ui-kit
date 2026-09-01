import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import { rowTextStyle, rowTrailingStyle } from '../dashboard/internal/row-v4';
import { BADGE_V4, placeholderGround, spokenLine, TABULAR, type ToneV4 } from './internal/menu-v4';
import type { ReservationStatus, TableReservationRowProps } from './TableReservationRow';

export interface TableReservationRowV4Props extends TableReservationRowProps {
  /** Override the status words. Default `Requested` … `Cancelled`. */
  statusLabels?: Partial<Record<ReservationStatus, string>>;
}

const STATUS_META: Record<ReservationStatus, { label: string; tone: ToneV4 }> = {
  requested: { label: 'Requested', tone: 'warn' },
  confirmed: { label: 'Confirmed', tone: 'primary' },
  seated: { label: 'Seated', tone: 'success' },
  completed: { label: 'Completed', tone: 'neutral' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
};

/**
 * **V4 table reservation row** — same props as {@link TableReservationRow}
 * plus `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **The table number is announced.** The row's name was guest, party,
 *    date/time and status; `tableLabel` — the one thing a host is looking for
 *    when they scan the list — was drawn on screen and pruned out of the tree
 *    by the `button` role above it.
 * 2. **The party glyph stops being a reader stop.** `👥` carried
 *    `accessibilityLabel={"Party of 4"}`, which the row's own name already
 *    says, so a reader heard the party size twice — and on a row that is a
 *    single leaf it was a label competing with the row's.
 * 3. **A neutral badge resolves the same way on both twins.** Native's solid
 *    `neutral` fills with the **border** token — a hairline colour used as a
 *    fill — where web gives it a ramp step. Both take the module's one badge
 *    shape now, which is a soft tint composited into the surface.
 * 4. **Press is a state layer**, not `opacity: 0.9` — the band M3 spends on
 *    disabled.
 * 5. **The text and trailing slots come from the shared row family** — only
 *    those two, because the family's container is transparent and border-less
 *    by design, and this row draws its own frame. The party tile stops being a
 *    `tokens.ramps.neutral[100]` block that does not invert.
 *
 * **Renders nothing without a `name`.**
 */
export function TableReservationRowV4({
  name,
  partySize,
  dateText,
  timeText,
  tableLabel,
  status = 'requested',
  statusLabels,
  onPress,
  style,
}: TableReservationRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const tile = minTap(tokens.spacing);
  const meta = STATUS_META[status] ?? STATUS_META.requested;
  const statusWord = statusLabels?.[status] ?? meta.label;
  const when = metaLine([dateText, timeText]);
  const party = `Party of ${partySize}`;

  // Change 1: the table number belongs in the name, not only on the screen.
  const spoken = spokenLine([name, party, when, tableLabel, statusWord]);

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    style,
  ];

  const inner = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        padding: tokens.spacing.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      {/* Change 2: the glyph and the count restate the row's own name, so they
          are drawn and not spoken. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: tile,
          height: tile,
          flexShrink: 0,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radius.md,
          backgroundColor: placeholderGround(theme),
        }}
      >
        <IconV4 glyph="👥" size="sm" />
        <TextV4 size="xs" weight="bold" tone="onCard" style={TABULAR}>
          {partySize}
        </TextV4>
      </View>
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {name}
        </TextV4>
        {when ? (
          <TextV4 size="sm" tone="mutedText" style={TABULAR}>
            {when}
          </TextV4>
        ) : null}
        {tableLabel ? (
          <TextV4 size="xs" tone="mutedText">
            {tableLabel}
          </TextV4>
        ) : null}
      </View>
      <View style={rowTrailingStyle(theme)}>
        <BadgeV4 tone={meta.tone} variant={BADGE_V4.variant} size={BADGE_V4.size}>
          {statusWord}
        </BadgeV4>
      </View>
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={spoken} style={containerStyle}>
        {inner(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      style={containerStyle}
    >
      {({ pressed }) => inner(pressed)}
    </Pressable>
  );
}

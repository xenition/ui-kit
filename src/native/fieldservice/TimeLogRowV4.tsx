import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
  rowTrailingStyle,
} from '../dashboard/internal/row-v4';
import { formatMoney as defaultFormatMoney } from '../../commerce/money';
import { formatDuration } from './internal/format';
import { BADGE_V4, discGround, discInk, spokenLine, type ToneV4 } from './internal/job-v4';
import type { TimeLogRowProps, TimeLogStatus } from './TimeLogRow';

export interface TimeLogRowV4Props extends TimeLogRowProps {
  /** The billable chip's word. Default `'Billable'` — with no currency sign. */
  billableLabel?: string;
}

const STATUS_META: Record<TimeLogStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  running: { label: 'Running', glyph: '⏱', tone: 'primary' },
  stopped: { label: 'Logged', glyph: '■', tone: 'neutral' },
  approved: { label: 'Approved', glyph: '✓', tone: 'success' },
  rejected: { label: 'Rejected', glyph: '✕', tone: 'danger' },
};

/**
 * **V4 time log row** — same props as {@link TimeLogRow} plus `billableLabel`.
 *
 * ## Four changes
 *
 * 1. **The money and the billable flag are announced.** The row's name was
 *    `"${label}, ${duration}, ${status}"`, which replaces the subtree — so on
 *    a timesheet the two facts an approver is actually reading, the line total
 *    and whether it bills, were spoken to nobody.
 * 2. **The literal `$` is gone.** The chip read "$ Billable" while the total
 *    beside it was formatted by `currency`, so a EUR timesheet printed "€12.50"
 *    under a dollar sign. Billable is a word; the currency belongs to the
 *    number.
 * 3. **The stacked figures are tabular**, so a column of durations and totals
 *    lines up digit-for-digit down a timesheet instead of drifting.
 * 4. **The row is a row from the shared row line** — 44 clear, a press that is
 *    a state layer rather than `opacity: 0.7`, a decorative disc, and the
 *    module's one badge shape.
 *
 * **Renders nothing without a `label`.**
 */
export function TimeLogRowV4({
  label,
  minutes,
  status,
  window,
  billable = false,
  rateCentsPerHour,
  currency = 'USD',
  formatMoney = defaultFormatMoney,
  billableLabel = 'Billable',
  onPress,
  style,
}: TimeLogRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!label) return null;

  const meta = STATUS_META[status] ?? STATUS_META.stopped;
  const safeMinutes = Number.isFinite(minutes) ? Math.max(0, Math.trunc(minutes)) : 0;
  const duration = formatDuration(safeMinutes);
  const totalCents =
    rateCentsPerHour != null && Number.isFinite(rateCentsPerHour)
      ? Math.round((safeMinutes / 60) * Math.max(0, rateCentsPerHour))
      : undefined;
  const total = totalCents != null ? formatMoney(totalCents, currency) : null;

  const spoken = spokenLine([
    label,
    window,
    duration,
    meta.label,
    total,
    billable ? billableLabel : null,
  ]);

  const content = (
    <>
      {/* Decorative: the clock state is in the row's name and on the badge. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          rowLeadingStyle(theme),
          { borderRadius: tokens.radius.full, backgroundColor: discGround(theme, meta.tone) },
        ]}
      >
        <IconV4 glyph={meta.glyph} style={{ color: discInk(theme, meta.tone) }} />
      </View>
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {label}
        </TextV4>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {window != null ? (
            <TextV4 size="xs" tone="mutedText" numeric="tabular">
              {window}
            </TextV4>
          ) : null}
          <BadgeV4 tone={meta.tone} {...BADGE_V4}>
            {`${meta.glyph} ${meta.label}`}
          </BadgeV4>
          {billable ? (
            <BadgeV4 tone="accent" {...BADGE_V4}>
              {billableLabel}
            </BadgeV4>
          ) : null}
        </View>
      </View>
      <View style={[rowTrailingStyle(theme), { flexDirection: 'column', alignItems: 'flex-end' }]}>
        <TextV4 size="base" weight="bold" tone="onCard" numeric="tabular">
          {duration}
        </TextV4>
        {total != null ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {total}
          </TextV4>
        ) : null}
      </View>
    </>
  );

  if (!onPress) {
    return (
      <View
        accessible
        accessibilityLabel={spoken}
        style={[rowContainerStyle(theme, { twoLine: true }), style]}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      style={[{ borderRadius: tokens.radius.md }, style]}
    >
      {({ pressed }) => (
        <View
          style={[
            rowContainerStyle(theme, { twoLine: true }),
            { borderRadius: tokens.radius.md, backgroundColor: rowGround(theme, { pressed }) },
          ]}
        >
          {content}
        </View>
      )}
    </Pressable>
  );
}

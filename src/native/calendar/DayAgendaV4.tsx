import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { sameDay } from '../../calendar/format';
import { layoutEvents } from '../../calendar/layout-v4';
import { EventBlockV4 } from './EventBlockV4';
import { skeletonFill } from './internal/grid-v4';
import type { DayAgendaProps } from './DayAgenda';

export interface DayAgendaV4Props extends DayAgendaProps {
  /** Locale for the time gutter. Default: the device's. */
  locale?: string;
  /** Label on the "now" divider. Default `'Now'`. */
  nowLabel?: string;
}

/**
 * **V4 day agenda** — same props as {@link DayAgenda} plus `locale` and
 * `nowLabel`.
 *
 * ## Four changes
 *
 * 1. **The list is ordered by the shared layout pass**, so an agenda and a
 *    time grid showing the same day agree on the order — the base sorted here
 *    and there independently.
 * 2. **"Now" is a labelled divider**, not an unnamed rule. A screen-reader
 *    user could not tell which events had already happened.
 * 3. **The skeleton is opaque**, not a translucent wash of `muted`.
 * 4. **The empty state is copy in `mutedText`**, and the whole list announces
 *    itself as a list.
 */
export function DayAgendaV4({
  day,
  events = [],
  now,
  locale,
  nowLabel = 'Now',
  onSelectEvent,
  selectedEventId,
  loading = false,
  emptyLabel = 'Nothing scheduled.',
  variant = 'soft',
  style,
}: DayAgendaV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  if (loading) {
    return (
      <View style={[{ gap: tokens.spacing.sm }, style]}>
        {[70, 55, 80].map((w) => (
          <View
            key={w}
            style={{
              height: tokens.spacing.xl,
              width: `${w}%`,
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
        ))}
      </View>
    );
  }

  const today = React.useMemo(
    () => events.filter((e) => sameDay(e.start, day)),
    [events, day]
  );
  const ordered = React.useMemo(() => layoutEvents(today), [today]);
  const nowMinutes =
    now != null && sameDay(now, day) ? now.getHours() * 60 + now.getMinutes() : null;

  if (ordered.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ padding: tokens.spacing.md }, style]}>
        <TextV4 size="sm" tone="mutedText">
          {emptyLabel}
        </TextV4>
      </View>
    );
  }

  const timeFmt = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' });
  let nowDrawn = false;

  return (
    <View accessibilityRole="list" style={[{ gap: tokens.spacing.sm }, style]}>
      {ordered.map((p) => {
        // The divider lands before the first event that has not started yet.
        const showNow = nowMinutes != null && !nowDrawn && p.startMin >= nowMinutes;
        if (showNow) nowDrawn = true;

        return (
          <React.Fragment key={p.key}>
            {showNow ? (
              <View
                accessible
                accessibilityLabel={nowLabel}
                style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
              >
                <TextV4 size="xs" weight="bold" tone="dangerText">
                  {nowLabel}
                </TextV4>
                <View style={{ flex: 1, height: 1, backgroundColor: colors.danger }} />
              </View>
            ) : null}

            <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
              <TextV4
                size="xs"
                tone="mutedText"
                numeric="tabular"
                style={{ width: tokens.spacing['2xl'], paddingTop: tokens.spacing.xs / 2 }}
              >
                {p.event.allDay ? '' : timeFmt.format(p.event.start)}
              </TextV4>
              <View style={{ flex: 1 }}>
                <EventBlockV4
                  event={p.event}
                  variant={variant}
                  selected={selectedEventId === p.event.id}
                  onPress={onSelectEvent}
                />
              </View>
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
}

import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { SegmentedV4 } from '../primitives/SegmentedV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import type { CalendarViewMode } from '../../calendar/types';
import type { DateNavigatorProps } from './DateNavigator';

export interface DateNavigatorV4Props extends DateNavigatorProps {
  /** Accessible names for the two chevrons. */
  previousLabel?: string;
  nextLabel?: string;
  /** Copy on the today action. Default `'Today'`. */
  todayLabel?: string;
  /** Override the view-switcher words — three English words lived inside. */
  viewLabels?: Partial<Record<CalendarViewMode, string>>;
}

const VIEW_LABEL: Record<CalendarViewMode, string> = {
  month: 'Month',
  week: 'Week',
  day: 'Day',
};

/**
 * **V4 date navigator** — same props as {@link DateNavigator} plus four copy
 * hooks.
 *
 * ## Four changes
 *
 * 1. **The chevrons clear 44 and carry names.** They were glyph-sized
 *    pressables with no accessible label — on the control a user hits most in
 *    a calendar.
 * 2. **The title is a heading**, so a screen reader can jump to it, and it is
 *    announced with the view it belongs to.
 * 3. **The view switcher is `SegmentedV4`**, not three hand-rolled buttons, so
 *    it matches every other segmented control in the product and reports
 *    itself as a group.
 * 4. **Press is a state layer**, not an opacity on the glyph.
 */
export function DateNavigatorV4({
  title,
  onPrev,
  onNext,
  onToday,
  view,
  onViewChange,
  views = ['month', 'week', 'day'],
  previousLabel,
  nextLabel,
  todayLabel = 'Today',
  viewLabels,
  style,
}: DateNavigatorV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const tap = minTap(tokens.spacing);
  const unit = view ?? 'month';

  const chevron = (direction: -1 | 1): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        direction < 0
          ? (previousLabel ?? `Previous ${unit}`)
          : (nextLabel ?? `Next ${unit}`)
      }
      onPress={direction < 0 ? onPrev : onNext}
      style={({ pressed }) => ({
        width: tap,
        height: tap,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.full,
        backgroundColor: pressed ? pressFill(theme) : 'transparent',
      })}
    >
      <IconV4
        name={direction < 0 ? 'chevron-left' : 'chevron-right'}
        size="lg"
        color="onSurface"
      />
    </Pressable>
  );

  return (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
        style,
      ]}
    >
      {onPrev ? chevron(-1) : null}
      <TextV4
        accessibilityRole="header"
        face="heading"
        size="base"
        weight="bold"
        tone="onSurface"
        numberOfLines={1}
        style={{ flex: 1 }}
      >
        {title}
      </TextV4>
      {onNext ? chevron(1) : null}

      {onToday ? (
        <ButtonV4 variant="secondary" size="sm" onPress={onToday} accessibilityLabel={todayLabel}>
          {todayLabel}
        </ButtonV4>
      ) : null}

      {onViewChange && views.length > 1 ? (
        <SegmentedV4
          options={views.map((v) => ({ label: viewLabels?.[v] ?? VIEW_LABEL[v], value: v }))}
          value={view ?? views[0]!}
          onChange={(v) => onViewChange(v as CalendarViewMode)}
        />
      ) : null}
    </View>
  );
}

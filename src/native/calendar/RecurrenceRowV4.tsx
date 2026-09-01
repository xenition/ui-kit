import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { SegmentedV4 } from '../primitives/SegmentedV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import type { RecurrenceFreq, RecurrenceRowProps } from './RecurrenceRow';

export interface RecurrenceRowV4Props extends RecurrenceRowProps {
  /** Override the frequency words — five English words lived inside. */
  freqLabels?: Partial<Record<RecurrenceFreq, string>>;
}

/** The default options, in the order a scheduler offers them. */
const FREQ_LABEL: Record<RecurrenceFreq, string> = {
  none: 'Does not repeat',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
};

const FREQ_ORDER: readonly RecurrenceFreq[] = ['none', 'daily', 'weekly', 'monthly', 'yearly'];

/**
 * **V4 recurrence row** — same props as {@link RecurrenceRow} plus
 * `freqLabels`.
 *
 * ## Three changes
 *
 * 1. **The inline variant is `SegmentedV4`**, not five hand-rolled chips, so
 *    it announces itself as one control with a selected option rather than as
 *    five independent buttons.
 * 2. **The summary variant is a row from the shared row line**, with a
 *    chevron that says it opens something — the base rendered a bare line of
 *    text that happened to be pressable.
 * 3. **All five words are props**, and the row is announced as
 *    "Repeats, Weekly" rather than as two loose fragments.
 */
export function RecurrenceRowV4({
  value,
  onChange,
  label = 'Repeats',
  variant = 'summary',
  onPress,
  options,
  freqLabels,
  style,
}: RecurrenceRowV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const wordFor = (freq: RecurrenceFreq): string =>
    options?.find((o) => o.value === freq)?.label ?? freqLabels?.[freq] ?? FREQ_LABEL[freq];
  const choices = options?.map((o) => o.value) ?? FREQ_ORDER;
  const current = wordFor(value);

  if (variant === 'inline') {
    return (
      <View style={[{ gap: tokens.spacing.xs }, style]}>
        <TextV4 size="xs" weight="semibold" tone="mutedText">
          {label}
        </TextV4>
        <SegmentedV4
          options={choices.map((f) => ({ label: wordFor(f), value: f }))}
          value={value}
          onChange={(v) => onChange?.(v as RecurrenceFreq)}
        />
      </View>
    );
  }

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, {}),
        { backgroundColor: rowGround(theme, { pressed }) },
        style,
      ]}
    >
      <IconV4 name="refresh" size="lg" color="mutedText" />
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard">
          {label}
        </TextV4>
      </View>
      <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
        {current}
      </TextV4>
      {onPress ? <IconV4 name="chevron-right" size="lg" color="mutedText" /> : null}
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={`${label}, ${current}`}>
        {content(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${current}`}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}

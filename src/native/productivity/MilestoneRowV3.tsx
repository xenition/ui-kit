import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Progress } from '../primitives';
import { DueDatePill } from './DueDatePill';
import type { MilestoneRowProps } from './MilestoneRow';

/** Same public contract as {@link MilestoneRow} — a drop-in alternate design. */
export type MilestoneRowV3Props = MilestoneRowProps;

/**
 * MilestoneRow, redesigned (v3): a **dense milestone line**. A reached ✓ (or flag),
 * the title with a thin progress bar, and the target-date pill on the right — a
 * hairline row for a roadmap list. The opposite of v2's card. Same props,
 * token-only.
 */
export function MilestoneRowV3({ title, reached = false, progress, dateLabel, dateTone, appearance, style }: MilestoneRowV3Props): React.ReactElement {
  void appearance;
  const { colors, tokens } = useXenitionTheme();
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : reached ? 100 : 0;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <Text style={{ color: reached ? colors.successText : colors.muted }}>{reached ? '✓' : '🏁'}</Text>
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{
            color: reached ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            textDecorationLine: reached ? 'line-through' : 'none',
          }}
        >
          {title}
        </Text>
        <Progress value={pct} tone={reached ? 'success' : 'primary'} size="sm" />
      </View>
      {dateLabel ? <DueDatePill label={dateLabel} tone={dateTone} /> : null}
    </View>
  );
}

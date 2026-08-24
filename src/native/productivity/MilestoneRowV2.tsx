import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Progress } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { DueDatePill } from './DueDatePill';
import type { MilestoneRowProps } from './MilestoneRow';

/** Same public contract as {@link MilestoneRow} — a drop-in alternate design. */
export type MilestoneRowV2Props = MilestoneRowProps;

/**
 * MilestoneRow, redesigned (v2): an **elevated milestone card**. A flag/✓ medallion
 * leads the title; a progress bar with a percent read-out and a target-date pill
 * follow. Reached milestones tint success. Distinct from v1. Same props,
 * token-only.
 */
export function MilestoneRowV2({ title, reached = false, progress, dateLabel, dateTone, appearance, style }: MilestoneRowV2Props): React.ReactElement {
  void appearance;
  const { colors, tokens } = useXenitionTheme();
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : reached ? 100 : 0;

  return (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          ...shadow('sm', tokens),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(reached ? colors.success : colors.primary, 0.12),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: reached ? colors.successText : colors.primaryText }}>{reached ? '✓' : '🏁'}</Text>
        </View>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            color: reached ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '700',
            textDecorationLine: reached ? 'line-through' : 'none',
          }}
        >
          {title}
        </Text>
        {dateLabel ? <DueDatePill label={dateLabel} tone={dateTone} /> : null}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1 }}>
          <Progress value={pct} tone={reached ? 'success' : 'primary'} size="sm" />
        </View>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{pct}%</Text>
      </View>
    </View>
  );
}

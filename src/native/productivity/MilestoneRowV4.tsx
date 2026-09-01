import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Progress } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { DueDatePill } from './DueDatePill';
import type { MilestoneRowProps } from './MilestoneRow';

/** Drop-in for {@link MilestoneRowProps} — same props, the V4 "flow" design. */
export type MilestoneRowV4Props = MilestoneRowProps;

/**
 * MilestoneRow — **V4** "flow" design. The focused-workspace take on a
 * milestone line, laid out on a subtle timeline rail: a status marker
 * (**success** glow when reached, else muted), a legible title, an optional
 * target {@link DueDatePill}, and a **primary** progress hint. Reaching a
 * milestone settles the row into a soft-success glow. Same props/behavior as
 * {@link MilestoneRowProps}; token-only colors via `useXenitionTheme()`.
 */
export function MilestoneRowV4({
  title,
  reached = false,
  progress,
  dateLabel,
  dateTone = 'upcoming',
  style,
}: MilestoneRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.md,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          backgroundColor: reached ? withAlpha(colors.success, 0.08) : colors.surface,
        },
        style,
      ]}
    >
      <View
        accessibilityRole="image"
        accessibilityLabel={reached ? 'Milestone reached' : 'Milestone pending'}
        style={{
          width: 16,
          height: 16,
          marginTop: 2,
          borderRadius: tokens.radius.full,
          borderWidth: 2,
          borderColor: reached ? colors.success : colors.border,
          backgroundColor: reached ? colors.success : colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {reached ? (
          <Text style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>✓</Text>
        ) : null}
      </View>

      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
          }}
        >
          <Text
            style={{
              flex: 1,
              color: reached ? colors.muted : colors.onSurface,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '600',
            }}
          >
            {title}
          </Text>
          {dateLabel ? <DueDatePill label={dateLabel} tone={dateTone} /> : null}
        </View>
        {pct != null ? <Progress value={pct} tone={reached ? 'success' : 'primary'} size="sm" /> : null}
      </View>
    </View>
  );
}

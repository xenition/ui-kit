import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Progress } from '../primitives';
import { type Appearance, appearanceStyle } from '../primitives/internal/appearance';
import { DueDatePill, type DueDateTone } from './DueDatePill';

export interface MilestoneRowProps {
  /** Milestone name. */
  title: string;
  /** Whether the milestone has been reached (done = success). */
  reached?: boolean;
  /** Completion percent toward the milestone (0–100). */
  progress?: number;
  /** Optional target-date label. */
  dateLabel?: string;
  /** Tone for the target-date pill. */
  dateTone?: DueDateTone;
  /** Surface treatment (visual-diversity preset). Defaults to `classic`. */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A milestone line: a status marker (filled **success** when reached), the title,
 * an optional target {@link DueDatePill}, and an optional {@link Progress} bar.
 * The marker and progress recolor to success once reached. No literal colors.
 */
export function MilestoneRow({
  title,
  reached = false,
  progress,
  dateLabel,
  dateTone = 'upcoming',
  appearance = 'classic',
  style,
}: MilestoneRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;

  return (
    <View
      style={[
        appearance === 'classic' ? null : appearanceStyle(appearance, colors, tokens),
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
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

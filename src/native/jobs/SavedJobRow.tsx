import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge, type BadgeTone } from '../primitives';
import type { EmploymentType, Job } from './types';
import { EMPLOYMENT_LABEL } from './types';
import { SalaryRange } from './SalaryRange';
import { formatRelative } from './format';

const TYPE_TONE: Record<EmploymentType, BadgeTone> = {
  'full-time': 'primary',
  'part-time': 'neutral',
  contract: 'warn',
  remote: 'success',
};

export interface SavedJobRowProps {
  /** The saved job to render. */
  job: Job;
  /** When it was saved (ISO-8601); shown as a relative age. */
  savedAt?: string;
  /** Fired when the row is pressed (open detail). */
  onPress?: (job: Job) => void;
  /** Fired when the bookmark toggle is pressed (unsave). */
  onRemove?: (job: Job) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A compact row for the "saved jobs" list: company avatar, title, type badge +
 * salary, saved age, and a filled bookmark that removes the job when pressed.
 * Data + callbacks only; tokens only.
 */
export function SavedJobRow({
  job,
  savedAt,
  onPress,
  onRemove,
  style,
}: SavedJobRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const saved = formatRelative(savedAt);

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${job.title} at ${job.companyName}`}
      disabled={!onPress}
      onPress={onPress ? () => onPress(job) : undefined}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
        },
        pressed && onPress ? { opacity: 0.9 } : null,
        style,
      ]}
    >
      <Avatar src={job.companyLogoUrl} name={job.companyName} size="sm" />

      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {job.title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <Badge tone={TYPE_TONE[job.type]}>{EMPLOYMENT_LABEL[job.type]}</Badge>
          {job.salary ? <SalaryRange salary={job.salary} size="sm" glyph={null} /> : null}
        </View>
        {saved ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{`Saved ${saved}`}</Text>
        ) : null}
      </View>

      {onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${job.title} from saved`}
          accessibilityState={{ selected: true }}
          onPress={() => onRemove(job)}
          hitSlop={8}
        >
          <Text style={{ fontSize: tokens.typography.scale.lg, color: colors.primary }}>★</Text>
        </Pressable>
      ) : null}
    </Pressable>
  );
}

import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Checkbox, Badge, type BadgeTone } from '../primitives';

/** Defect severity — drives the severity pill (text + glyph + color). */
export type PunchSeverity = 'minor' | 'major' | 'critical';

interface SeverityDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
}

const SEVERITY: Record<PunchSeverity, SeverityDescriptor> = {
  minor: { label: 'Minor', glyph: '·', tone: 'neutral' },
  major: { label: 'Major', glyph: '▲', tone: 'warn' },
  critical: { label: 'Critical', glyph: '!', tone: 'danger' },
};

export interface PunchListItemProps {
  /** Defect / task description (e.g. "Touch-up paint scuff in lobby"). */
  label: string;
  /** Whether the item has been resolved / signed off. */
  done: boolean;
  /** Defect severity; when set, renders a severity pill. */
  severity?: PunchSeverity;
  /** Trade or location shown as a meta line. */
  location?: string;
  /** Person the item is assigned to, shown as a meta line. */
  assignee?: string;
  /** Fires with the next `done` value when the checkbox is toggled. */
  onToggle?: (done: boolean) => void;
  /** Disables the checkbox. */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * One punch-list defect: a leading checkbox to mark it resolved, a description
 * that strikes through when `done` (so completion reads without color alone), a
 * severity pill (text + glyph + a color that traces to a `SemanticColors`
 * slot), and location / assignee meta. Toggling fires `onToggle` with the next
 * state. No literal colors.
 */
export function PunchListItem({
  label,
  done,
  severity,
  location,
  assignee,
  onToggle,
  disabled = false,
  style,
}: PunchListItemProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = severity ? SEVERITY[severity] : undefined;
  const meta = [location, assignee].filter((v): v is string => v != null).join(' · ');

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ paddingTop: 2 }}>
        <Checkbox
          checked={done}
          disabled={disabled}
          onCheckedChange={onToggle}
          accessibilityLabel={label}
        />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={3}
          style={{
            color: done ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
            textDecorationLine: done ? 'line-through' : 'none',
          }}
        >
          {label}
        </Text>
        {meta !== '' ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{meta}</Text>
        ) : null}
      </View>
      {sd ? (
        <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
      ) : null}
    </View>
  );
}

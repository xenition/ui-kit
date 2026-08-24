import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge, type BadgeTone } from '../primitives';
import { withAlpha } from './internal/format';

/** Lifecycle of a citizen complaint / 311 service request. */
export type ComplaintStatus = 'open' | 'assigned' | 'in-progress' | 'resolved' | 'closed';

const STATUS: Record<ComplaintStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  open: { label: 'Open', glyph: '🆕', tone: 'primary' },
  assigned: { label: 'Assigned', glyph: '👤', tone: 'accent' },
  'in-progress': { label: 'In progress', glyph: '🔧', tone: 'warn' },
  resolved: { label: 'Resolved', glyph: '✓', tone: 'success' },
  closed: { label: 'Closed', glyph: '✕', tone: 'neutral' },
};

/** Triage priority of the request. */
export type ComplaintPriority = 'low' | 'normal' | 'high' | 'urgent';

const PRIORITY: Record<ComplaintPriority, { label: string; glyph: string; tone: BadgeTone }> = {
  low: { label: 'Low', glyph: '↓', tone: 'neutral' },
  normal: { label: 'Normal', glyph: '•', tone: 'neutral' },
  high: { label: 'High', glyph: '↑', tone: 'warn' },
  urgent: { label: 'Urgent', glyph: '!', tone: 'danger' },
};

export interface ComplaintRowProps {
  /** Ticket / request reference (e.g. "311-88214"). */
  ticketNumber: string;
  /** Short description of the complaint (e.g. "Pothole on 5th Ave"). */
  title: string;
  /** Lifecycle status — conveyed by text + glyph + color. */
  status: ComplaintStatus;
  /** Category (e.g. "Roads", "Sanitation"). */
  category?: string;
  /** Triage priority — rendered as a text+glyph badge when `high`/`urgent`. */
  priority?: ComplaintPriority;
  /** Localized filed / updated date. */
  date?: string;
  /** Fires on row press (open request detail); button only when supplied. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line in a citizen-complaint / 311 service-request list: a tinted status
 * glyph disc, a title/ticket stack, and status + optional priority pills — each
 * conveyed by **glyph + label + a color that traces to a `SemanticColors`
 * slot** (resolved → success, urgent → danger), never color alone. Becomes a
 * button only when `onPress` is supplied.
 */
export function ComplaintRow({
  ticketNumber,
  title,
  status,
  category,
  priority,
  date,
  onPress,
  style,
}: ComplaintRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = STATUS[status] ?? STATUS.open;
  const pr = priority ? PRIORITY[priority] ?? PRIORITY.normal : undefined;
  const showPriority = pr != null && (priority === 'high' || priority === 'urgent');
  const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];

  const row = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(tint, 0.14),
        }}
      >
        <Icon glyph={sd.glyph} accessibilityLabel={sd.label} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{ticketNumber}</Text>
          {category != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {category}</Text>
          ) : null}
          <Badge tone={sd.tone} variant="soft" size="sm">
            {`${sd.glyph} ${sd.label}`}
          </Badge>
          {showPriority ? (
            <Badge tone={pr.tone} variant="outline" size="sm">
              {`${pr.glyph} ${pr.label}`}
            </Badge>
          ) : null}
        </View>
      </View>
      {date != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{date}</Text>
      ) : null}
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Request ${ticketNumber}, ${title}, ${sd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}

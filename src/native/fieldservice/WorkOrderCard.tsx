import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Card, Icon, Badge, Skeleton, type BadgeTone } from '../primitives';
import { withAlpha } from './internal/format';

/** Work-order lifecycle — conveyed by text + glyph + color (never color-alone). */
export type WorkOrderStatus = 'open' | 'in-progress' | 'on-hold' | 'done' | 'cancelled';

/** Job urgency — drives the priority pill. */
export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'emergency';

interface StatusDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
}

const WORK_ORDER_STATUS: Record<WorkOrderStatus, StatusDescriptor> = {
  open: { label: 'Open', glyph: '○', tone: 'neutral' },
  'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary' },
  'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn' },
  done: { label: 'Done', glyph: '✓', tone: 'success' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};

const PRIORITY: Record<WorkOrderPriority, StatusDescriptor> = {
  low: { label: 'Low', glyph: '↓', tone: 'neutral' },
  medium: { label: 'Medium', glyph: '=', tone: 'primary' },
  high: { label: 'High', glyph: '↑', tone: 'warn' },
  emergency: { label: 'Emergency', glyph: '!', tone: 'danger' },
};

export interface WorkOrderCardProps {
  /** Work-order reference (e.g. "WO-10482"). */
  workOrderNumber: string;
  /** Short task title (e.g. "Replace HVAC compressor"). */
  title: string;
  /** Lifecycle status — text + glyph + color. */
  status: WorkOrderStatus;
  /** Urgency; when set, renders a priority pill. */
  priority?: WorkOrderPriority;
  /** Assigned technician / crew name shown as a meta line. */
  assignee?: string;
  /** Job-site / customer name shown as a meta line. */
  site?: string;
  /** Localized scheduled date/time string (already formatted by the caller). */
  scheduledFor?: string;
  /** Trade / category glyph shown in the leading disc (emoji or symbol). */
  glyph?: string;
  /** Show a skeleton placeholder instead of data. */
  loading?: boolean;
  /** Fires on card press; the card is only a button when supplied. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A summary card for a single field-service work order. A tinted leading trade
 * glyph disc, a title/number stack, a status pill (text + glyph + a color that
 * traces to a `SemanticColors` slot — never color alone), an optional priority
 * pill, and assignee / site / schedule meta. Becomes a pressable button only
 * when `onPress` is supplied. Renders a `Skeleton` while `loading`. Every color
 * traces to a token or a `ramps`-derived tint — no literals.
 */
export function WorkOrderCard({
  workOrderNumber,
  title,
  status,
  priority,
  assignee,
  site,
  scheduledFor,
  glyph = '🔧',
  loading = false,
  onPress,
  style,
}: WorkOrderCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = WORK_ORDER_STATUS[status] ?? WORK_ORDER_STATUS.open;
  const pd = priority ? PRIORITY[priority] : undefined;

  if (loading) {
    return (
      <Card variant="elevated" style={style}>
        <View
          accessibilityLabel="Loading work order"
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}
        >
          <Skeleton variant="rect" width={44} height={44} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <Skeleton variant="text" width="70%" height={14} />
            <Skeleton variant="text" width="40%" height={10} />
          </View>
        </View>
      </Card>
    );
  }

  const body = (
    <Card variant={onPress ? 'interactive' : 'elevated'} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.primary, 0.12),
          }}
        >
          <Icon glyph={glyph} size="xl" accessibilityLabel="Work order" />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={2}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {title}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {workOrderNumber}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          <Badge tone={sd.tone} variant="soft">{`${sd.glyph} ${sd.label}`}</Badge>
          {pd ? (
            <Badge tone={pd.tone} variant="outline" size="sm">{`${pd.glyph} ${pd.label}`}</Badge>
          ) : null}
        </View>
      </View>

      {assignee != null || site != null || scheduledFor != null ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            paddingTop: tokens.spacing.md,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            gap: 2,
          }}
        >
          {site != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>📍 {site}</Text>
          ) : null}
          {assignee != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>👷 {assignee}</Text>
          ) : null}
          {scheduledFor != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>🕑 {scheduledFor}</Text>
          ) : null}
        </View>
      ) : null}
    </Card>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Work order ${workOrderNumber}, ${title}, ${sd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {body}
    </Pressable>
  );
}

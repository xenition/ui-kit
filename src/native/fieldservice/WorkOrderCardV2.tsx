import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Icon, Badge, Skeleton, type BadgeTone } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import type { WorkOrderCardProps, WorkOrderStatus, WorkOrderPriority } from './WorkOrderCard';

/**
 * Alternate design (v2) of {@link WorkOrderCard} — a drop-in with the **same
 * props**. Where the original is a flat left-aligned summary, V2 is an
 * *elevated status-rail card*: a full-height colored **status rail** down the
 * leading edge, a tinted trade-glyph disc, a **large title**, and a
 * **priority pill** hero'd at the trailing edge, over site / assignee / schedule
 * meta. Status is a text + glyph badge AND a labelled rail (never color alone).
 * Token-pure: semantic slots, `withAlpha` tints, and the shared `shadow()`.
 */
export type WorkOrderCardV2Props = WorkOrderCardProps;

interface Desc {
  label: string;
  glyph: string;
  tone: BadgeTone;
  slot: 'primary' | 'warn' | 'success' | 'danger' | 'muted';
}

const STATUS: Record<WorkOrderStatus, Desc> = {
  open: { label: 'Open', glyph: '○', tone: 'neutral', slot: 'muted' },
  'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary', slot: 'primary' },
  'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn', slot: 'warn' },
  done: { label: 'Done', glyph: '✓', tone: 'success', slot: 'success' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral', slot: 'muted' },
};

const PRIORITY: Record<WorkOrderPriority, Desc> = {
  low: { label: 'Low', glyph: '↓', tone: 'neutral', slot: 'muted' },
  medium: { label: 'Medium', glyph: '=', tone: 'primary', slot: 'primary' },
  high: { label: 'High', glyph: '↑', tone: 'warn', slot: 'warn' },
  emergency: { label: 'Emergency', glyph: '!', tone: 'danger', slot: 'danger' },
};

export function WorkOrderCardV2({
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
}: WorkOrderCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const sd = STATUS[status] ?? STATUS.open;
  const pd = priority ? PRIORITY[priority] : undefined;
  const railColor = colors[sd.slot];

  const surface = {
    flexDirection: 'row' as const,
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.surface,
    overflow: 'hidden' as const,
    ...shadow('lg', tokens),
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading work order" style={[surface, style]}>
        <View style={{ width: 6, backgroundColor: withAlpha(colors.muted, 0.4) }} />
        <View style={{ flex: 1, padding: tokens.spacing.lg, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <Skeleton variant="rect" width={48} height={48} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <Skeleton variant="text" width="70%" height={16} />
            <Skeleton variant="text" width="40%" height={10} />
          </View>
        </View>
      </View>
    );
  }

  const inner = (
    <View style={surface}>
      <View style={{ width: 6, backgroundColor: railColor }} />
      <View style={{ flex: 1, padding: tokens.spacing.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: tokens.radius.md,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: withAlpha(railColor, 0.14),
            }}
          >
            <Icon glyph={glyph} size="xl" accessibilityLabel="Work order" />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
              {title}
            </Text>
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600', letterSpacing: 0.5 }}>
              {workOrderNumber}
            </Text>
          </View>
          {pd ? <Badge tone={pd.tone} variant="soft" size="sm">{`${pd.glyph} ${pd.label}`}</Badge> : null}
        </View>

        <View style={{ marginTop: tokens.spacing.md, flexDirection: 'row' }}>
          <Badge tone={sd.tone} variant="soft">{`${sd.glyph} ${sd.label}`}</Badge>
        </View>

        {site != null || assignee != null || scheduledFor != null ? (
          <View
            style={{
              marginTop: tokens.spacing.md,
              paddingTop: tokens.spacing.md,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              gap: 2,
            }}
          >
            {site != null ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>📍 {site}</Text> : null}
            {assignee != null ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>👷 {assignee}</Text> : null}
            {scheduledFor != null ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>🕑 {scheduledFor}</Text> : null}
          </View>
        ) : null}
      </View>
    </View>
  );

  const a11y = `Work order ${workOrderNumber}, ${title}, ${sd.label}`;

  return (
    <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, style]}>
      {onPress ? (
        <Animated.View style={{ transform: [{ scale: press.scale }] }}>
          <Pressable
            accessible
            accessibilityRole="button"
            accessibilityLabel={a11y}
            onPress={onPress}
            onPressIn={press.onPressIn}
            onPressOut={press.onPressOut}
          >
            {inner}
          </Pressable>
        </Animated.View>
      ) : (
        <View accessible accessibilityLabel={a11y}>
          {inner}
        </View>
      )}
    </Animated.View>
  );
}

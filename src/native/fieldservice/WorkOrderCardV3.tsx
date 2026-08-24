import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Badge, type BadgeTone } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { WorkOrderCardProps, WorkOrderStatus, WorkOrderPriority } from './WorkOrderCard';

/**
 * Alternate design (v3) of {@link WorkOrderCard} — a drop-in with the **same
 * props**. The *dense list line*: a leading **status dot**, the title on one
 * line with the work-order number + priority glyph beneath, and a compact
 * status badge pinned to the trailing edge. Status is conveyed by the dot AND
 * the badge's glyph + label (never color alone). Token-pure.
 */
export type WorkOrderCardV3Props = WorkOrderCardProps;

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

const PRIORITY_GLYPH: Record<WorkOrderPriority, { glyph: string; label: string }> = {
  low: { glyph: '↓', label: 'Low' },
  medium: { glyph: '=', label: 'Medium' },
  high: { glyph: '↑', label: 'High' },
  emergency: { glyph: '!', label: 'Emergency' },
};

export function WorkOrderCardV3({
  workOrderNumber,
  title,
  status,
  priority,
  assignee,
  site,
  glyph = '🔧',
  loading = false,
  onPress,
  style,
}: WorkOrderCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = STATUS[status] ?? STATUS.open;
  const pd = priority ? PRIORITY_GLYPH[priority] : undefined;

  const rowStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.sm,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading work order" style={[rowStyle, style]}>
        <View style={{ width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.muted, 0.4) }} />
        <View style={{ flex: 1, height: 12, borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
      </View>
    );
  }

  const subtitle = [workOrderNumber, pd ? `${pd.glyph} ${pd.label}` : null, site].filter(Boolean).join('  ·  ');
  const a11y = `Work order ${workOrderNumber}, ${title}, ${sd.label}`;

  const Container: React.ElementType = onPress ? Pressable : View;

  return (
    <Container
      accessible
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={a11y}
      onPress={onPress}
      style={onPress ? ({ pressed }: { pressed: boolean }) => [rowStyle, style, { opacity: pressed ? 0.85 : 1 }] : [rowStyle, style]}
    >
      <Text style={{ fontSize: tokens.typography.scale.base }} accessibilityLabel="Trade">
        {glyph}
      </Text>
      <View style={{ width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors[sd.slot] }} />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {title}
        </Text>
        {subtitle ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {subtitle}{assignee != null ? `  ·  ${assignee}` : ''}
          </Text>
        ) : null}
      </View>
      <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
    </Container>
  );
}

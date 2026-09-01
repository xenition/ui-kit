import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { BADGE_V4, discGround, skeletonFill, spokenLine, type ToneV4 } from './internal/job-v4';
import type { WorkOrderCardProps, WorkOrderPriority, WorkOrderStatus } from './WorkOrderCard';

export interface WorkOrderCardV4Props extends WorkOrderCardProps {
  /** Override the four priority names — they lived inside the component. */
  priorityLabels?: Partial<Record<WorkOrderPriority, string>>;
  /** Override the five status names. */
  statusLabels?: Partial<Record<WorkOrderStatus, string>>;
  /** Announced while the skeleton is up. Default `'Loading work order'`. */
  loadingLabel?: string;
}

const STATUS_META: Record<WorkOrderStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  open: { label: 'Open', glyph: '○', tone: 'neutral' },
  'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary' },
  'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn' },
  done: { label: 'Done', glyph: '✓', tone: 'success' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};

/**
 * Priority is which job this is, not how the job is going — so it wears a
 * glyph and a word on a neutral chip rather than a status colour. Spending
 * `danger` on an identity leaves nothing louder for the thing that is actually
 * wrong, which is the whole reason the status pill has a palette.
 */
const PRIORITY_META: Record<WorkOrderPriority, { label: string; glyph: string }> = {
  low: { label: 'Low', glyph: '↓' },
  medium: { label: 'Medium', glyph: '=' },
  high: { label: 'High', glyph: '↑' },
  emergency: { label: 'Emergency', glyph: '!' },
};

/**
 * **V4 work order card** — same props as {@link WorkOrderCard} plus
 * `priorityLabels`, `statusLabels` and `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The card announces the priority.** Its name was
 *    `"Work order WO-1, title, Open"`, which **replaces** the subtree — so an
 *    emergency job and a low-priority one sounded identical, and the site, the
 *    assignee and the schedule were never spoken at all. A technician heard
 *    "Open" and never "Emergency".
 * 2. **Priority stops wearing a status colour.** `emergency` was a `danger`
 *    pill beside a `danger`-capable status pill, so two different questions
 *    answered in the same red. It is a neutral chip with its own glyph now.
 * 3. **A press is a state layer.** `opacity: 0.85` fades the card's own
 *    content, which is the signal M3 spends 0.38 on to mean *disabled*.
 * 4. **The skeleton is opaque and announced.** It was a translucent `muted`
 *    wash — a different colour on every ground — sitting on a plain `View`
 *    whose `accessibilityLabel` announced nothing.
 * 5. **The badges are one shape across the twins**, and the meta glyphs are
 *    decorative rather than emoji embedded in the sentence a reader speaks.
 *
 * **Renders nothing without a `title`.**
 */
export function WorkOrderCardV4({
  workOrderNumber,
  title,
  status,
  priority,
  assignee,
  site,
  scheduledFor,
  glyph = '🔧',
  loading = false,
  priorityLabels,
  statusLabels,
  loadingLabel = 'Loading work order',
  onPress,
  style,
}: WorkOrderCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const tap = minTap(tokens.spacing);

  if (loading) {
    return (
      <CardV4 variant="elevated" style={[{ backgroundColor: colors.card }, style]}>
        <View
          accessible
          accessibilityLabel={loadingLabel}
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}
        >
          <View
            style={{
              width: tap,
              height: tap,
              borderRadius: tokens.radius.md,
              backgroundColor: skeletonFill(theme),
            }}
          />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View
              style={{
                height: tokens.spacing.md,
                width: '70%',
                borderRadius: tokens.radius.sm,
                backgroundColor: skeletonFill(theme),
              }}
            />
            <View
              style={{
                height: tokens.spacing.sm + tokens.spacing.xs,
                width: '40%',
                borderRadius: tokens.radius.sm,
                backgroundColor: skeletonFill(theme),
              }}
            />
          </View>
        </View>
      </CardV4>
    );
  }

  if (!title) return null;

  const meta = STATUS_META[status] ?? STATUS_META.open;
  const statusWord = statusLabels?.[status] ?? meta.label;
  const priorityMeta = priority ? PRIORITY_META[priority] : undefined;
  const priorityWord = priority ? (priorityLabels?.[priority] ?? priorityMeta?.label) : undefined;

  const metaLines: ReadonlyArray<{ glyph: string; text: string }> = [
    site != null ? { glyph: '📍', text: site } : null,
    assignee != null ? { glyph: '👷', text: assignee } : null,
    scheduledFor != null ? { glyph: '🕑', text: scheduledFor } : null,
  ].filter((line): line is { glyph: string; text: string } => line != null);

  const name = spokenLine([
    workOrderNumber,
    title,
    statusWord,
    priorityWord,
    site,
    assignee,
    scheduledFor,
  ]);

  const body = (pressed: boolean): React.ReactElement => (
    <CardV4
      variant={onPress ? 'interactive' : 'elevated'}
      style={{
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : colors.card,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {/* The trade glyph names a category, not a state — decorative, and the
            card's own name already carries the work order it belongs to. */}
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            width: tap,
            height: tap,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: discGround(theme, 'primary'),
          }}
        >
          <IconV4 glyph={glyph} size="xl" />
        </View>
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="lg" weight="bold" tone="onCard" numberOfLines={2}>
            {title}
          </TextV4>
          <TextV4 size="sm" tone="mutedText" numberOfLines={1} numeric="tabular">
            {workOrderNumber}
          </TextV4>
        </View>
        <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          <BadgeV4 tone={meta.tone} {...BADGE_V4}>
            {`${meta.glyph} ${statusWord}`}
          </BadgeV4>
          {priorityMeta && priorityWord != null ? (
            <BadgeV4 tone="neutral" {...BADGE_V4}>
              {`${priorityMeta.glyph} ${priorityWord}`}
            </BadgeV4>
          ) : null}
        </View>
      </View>

      {metaLines.length > 0 ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            paddingTop: tokens.spacing.md,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            gap: tokens.spacing.xs / 2,
          }}
        >
          {metaLines.map((line) => (
            <View
              key={line.glyph}
              style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
            >
              <IconV4 glyph={line.glyph} size="xs" />
              <TextV4 size="xs" tone="mutedText" numberOfLines={1} style={{ flex: 1 }}>
                {line.text}
              </TextV4>
            </View>
          ))}
        </View>
      ) : null}
    </CardV4>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={name} style={style}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={onPress}
      style={[{ borderRadius: tokens.radius.lg }, style]}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}

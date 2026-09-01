import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { spokenLine } from './internal/crm-v4';
import type { NextStepPriority, NextStepRowProps } from './NextStepRow';

export interface NextStepRowV4Props extends NextStepRowProps {
  /** Override the priority words (`Low` / `Normal` / `High`). */
  priorityLabels?: Partial<Record<NextStepPriority, string>>;
  /** Word for a step past due. Default `'Overdue'`. */
  overdueLabel?: string;
  /** Name of the checkbox while unchecked. Default `'Mark complete'`. */
  completeLabel?: string;
  /** Name of the checkbox once checked. Default `'Completed'`. */
  completedLabel?: string;
}

const PRIORITY_V4: Record<NextStepPriority, { glyph: string; label: string }> = {
  low: { glyph: '↓', label: 'Low' },
  normal: { glyph: '•', label: 'Normal' },
  high: { glyph: '↑', label: 'High' },
};

/**
 * **V4 next-step row** — same props as {@link NextStepRow} plus
 * `priorityLabels`, `overdueLabel`, `completeLabel` and `completedLabel`.
 *
 * ## Six changes
 *
 * 1. **The row announces its meta line.** `accessibilityLabel={title}` dropped
 *    everything under the title, so "⚠ Overdue · Mar 4" — the entire point of
 *    a next-step row — was silent (rule A).
 * 2. **The checkbox clears 44.** It was a 22px box with `hitSlop`, and it is
 *    the row's *primary* action; the box keeps its size and the target grows
 *    around it.
 * 3. **No dead checkbox.** With no `onToggle` the base still rendered a
 *    normal, apparently-tappable checkbox that silently did nothing. Without a
 *    handler it is now a static mark, and `done` is carried by the row's name.
 * 4. **A checked box fills `primary`, not `success`.** Ticking a task is a
 *    *selection*, not a report that something went well; spending a status
 *    colour on it leaves `success` meaning nothing.
 * 5. **Overdue is inked with `dangerText`**, the contrast-corrected slot — the
 *    base drew text in the `danger` **fill**, which carries no promise as ink.
 * 6. **A press is a state layer** (rule B) rather than no feedback at all.
 *
 * **Renders nothing without a `title`.**
 */
export function NextStepRowV4({
  title,
  dueDate,
  overdue = false,
  done = false,
  assignee,
  priority,
  priorityLabels,
  overdueLabel = 'Overdue',
  completeLabel = 'Mark complete',
  completedLabel = 'Completed',
  onToggle,
  onPress,
  testID,
  style,
}: NextStepRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const tap = minTap(tokens.spacing);
  // 24 — the drawn box. The 44 target is the transparent square around it.
  const box = tokens.spacing.lg;
  const prio = priority
    ? { ...PRIORITY_V4[priority], label: priorityLabels?.[priority] ?? PRIORITY_V4[priority].label }
    : undefined;

  const name = spokenLine([
    title,
    prio ? prio.label : null,
    assignee,
    overdue ? overdueLabel : null,
    dueDate,
    done ? completedLabel : null,
  ]);

  const mark = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        width: box,
        height: box,
        borderRadius: tokens.radius.sm,
        borderWidth: 2,
        borderColor: done ? colors.primary : colors.border,
        backgroundColor: done
          ? pressed
            ? pressOver(theme, colors.primary, colors.onPrimary)
            : colors.primary
          : pressed
            ? pressOver(theme, colors.surface, colors.onSurface)
            : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {done ? (
        <TextV4 size="xs" weight="bold" style={{ color: colors.onPrimary }}>
          ✓
        </TextV4>
      ) : null}
    </View>
  );

  const target = {
    width: tap,
    height: tap,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        gap: tokens.spacing.xs / 2,
        paddingVertical: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.xs,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.surface, colors.onSurface) : 'transparent',
      }}
    >
      <TextV4
        size="sm"
        weight="semibold"
        tone={done ? 'mutedText' : 'onSurface'}
        numberOfLines={2}
        style={{ textDecorationLine: done ? 'line-through' : 'none' }}
      >
        {title}
      </TextV4>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          flexWrap: 'wrap',
        }}
      >
        {prio ? (
          <TextV4 size="xs" weight="semibold" tone="mutedText">
            {`${prio.glyph} ${prio.label}`}
          </TextV4>
        ) : null}
        {assignee ? (
          <TextV4 size="xs" tone="mutedText">
            {assignee}
          </TextV4>
        ) : null}
        {overdue ? (
          <TextV4 size="xs" weight="bold" tone="dangerText">
            {`⚠ ${overdueLabel}${dueDate ? ` · ${dueDate}` : ''}`}
          </TextV4>
        ) : dueDate ? (
          <TextV4 size="xs" tone="mutedText">
            {dueDate}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  return (
    <View
      testID={testID}
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
        style,
      ]}
    >
      {onToggle ? (
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: done }}
          accessibilityLabel={`${done ? completedLabel : completeLabel}: ${title}`}
          onPress={() => onToggle(!done)}
          style={target}
        >
          {({ pressed }) => mark(pressed)}
        </Pressable>
      ) : (
        // No handler, so no affordance. The state travels in the row's name.
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={target}
        >
          {mark(false)}
        </View>
      )}

      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={name}
          onPress={onPress}
          style={{ flex: 1, minHeight: tap, justifyContent: 'center' }}
        >
          {({ pressed }) => body(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={name} style={{ flex: 1 }}>
          {body(false)}
        </View>
      )}
    </View>
  );
}

import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CheckboxV4 } from '../primitives/CheckboxV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowEdgeStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { metaLine, type FarmTone } from './internal/farm-v4';
import type { FarmTaskRowProps, TaskPriority } from './FarmTaskRow';

export interface FarmTaskRowV4Props extends FarmTaskRowProps {
  /** Override the priority names — four English words lived inside the component. */
  priorityLabels?: Partial<Record<TaskPriority, string>>;
  /** Announced after the title when the task is late. Default `'overdue'`. */
  overdueLabel?: string;
}

/** Priority → tone and default label. Genuinely a status, so the tones stay. */
const PRIORITY_META: Record<TaskPriority, { label: string; tone: FarmTone }> = {
  low: { label: 'Low', tone: 'neutral' },
  normal: { label: 'Normal', tone: 'primary' },
  high: { label: 'High', tone: 'warn' },
  urgent: { label: 'Urgent', tone: 'danger' },
};

/**
 * **V4 farm task row** — same props as {@link FarmTaskRow} plus
 * `priorityLabels` and `overdueLabel`.
 *
 * ## Five changes
 *
 * 1. **It is a row from the shared row line.** Height, padding, gap, press
 *    fill and separator inset now come from `dashboard/internal/row-v4`, which
 *    is the file that decides them for every row in the kit — so a task row and
 *    a notification row stop being two components that happen to look similar.
 * 2. **The checkbox is `CheckboxV4`**, so its hit area, its focus ring and its
 *    checked animation match every other checkbox in the product.
 * 3. **`overdue` reaches assistive tech.** The base painted the due date red
 *    and stopped — colour alone, which is exactly what §6 forbids.
 * 4. **A done task's title is struck through *and* dimmed**, rather than only
 *    dimmed, so "done" survives a greyscale screenshot.
 * 5. **Type comes from `TextV4`** and the caption takes `mutedText`.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export function FarmTaskRowV4({
  title,
  done = false,
  due,
  priority = 'normal',
  field,
  assignee,
  icon,
  overdue = false,
  priorityLabels,
  overdueLabel = 'overdue',
  onToggle,
  onPress,
  last = false,
  style,
}: FarmTaskRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const meta = PRIORITY_META[priority];
  const label = priorityLabels?.[priority] ?? meta.label;
  const caption = metaLine([due, field, assignee]);

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: Boolean(caption) }),
        { backgroundColor: rowGround(theme, { pressed }) },
        !last ? rowEdgeStyle(theme) : null,
        style,
      ]}
    >
      {onToggle ? (
        <CheckboxV4
          checked={done}
          onCheckedChange={onToggle}
          accessibilityLabel={title}
        />
      ) : icon ? (
        <IconV4 glyph={icon} size="lg" />
      ) : null}

      <View style={rowTextStyle(theme)}>
        <TextV4
          size="base"
          weight="semibold"
          tone="onCard"
          numberOfLines={1}
          style={{
            // Struck AND dimmed: a strike survives greyscale, an opacity
            // change on its own does not read as "done" to everyone.
            textDecorationLine: done ? 'line-through' : 'none',
            opacity: done ? theme.state.disabledContent : 1,
          }}
        >
          {title}
        </TextV4>
        {caption ? (
          <TextV4
            size="xs"
            numberOfLines={1}
            style={{ color: overdue && !done ? colors.dangerText : colors.mutedText }}
          >
            {caption}
          </TextV4>
        ) : null}
      </View>

      {/* The badge carries the word, so `overdue` is never colour alone. */}
      {overdue && !done ? (
        <BadgeV4 tone="danger" variant="soft" size="sm">
          {overdueLabel}
        </BadgeV4>
      ) : (
        <BadgeV4 tone={meta.tone} variant="soft" size="sm">
          {label}
        </BadgeV4>
      )}
    </View>
  );

  if (!onPress) return content(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={[title, caption, overdue ? overdueLabel : null, label]
        .filter(Boolean)
        .join(', ')}
      accessibilityState={{ checked: done }}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}

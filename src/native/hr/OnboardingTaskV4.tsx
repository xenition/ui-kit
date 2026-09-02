import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { CheckboxV4 } from '../primitives/CheckboxV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { isAdverse } from '../../hr/workforce-v4';
import { StatusPillV4 } from './StatusPillV4';
import { TASK_STATUS_V4, metaLine, spokenLine } from './internal/tone-v4';
import type { OnboardingTaskProps } from './OnboardingTask';

export interface OnboardingTaskV4Props extends OnboardingTaskProps {
  /** What the task is waiting on. Shown when the status is `blocked`. */
  blockedReason?: string;
  /** The past-due flag's word. Default `'⚠ Overdue'`. */
  overdueLabel?: string;
}

/**
 * **V4 onboarding task** — same props as {@link OnboardingTask} plus
 * `blockedReason` and `overdueLabel`.
 *
 * ## Five changes
 *
 * 1. **The checkbox is reachable.** It sat inside the row's own `Pressable`,
 *    which is `accessible` by default and flattens its whole subtree into one
 *    leaf named "Onboarding task Sign employment contract" — so the tick, the
 *    only control on the row, was not a focus stop and a VoiceOver user could
 *    open the task and never complete it. The row is a plain `View` now and the
 *    checkbox is a sibling, which is also how the **web twin already had it**:
 *    there, the activation wraps only the title, and this brings the native
 *    twin to the same shape rather than to a third one.
 * 2. **The checkbox is a target.** A 20pt box with no wrapper is under half the
 *    44pt floor. `CheckboxV4` opens its own touch area, and the slot it sits in
 *    is `minTap` square, so the two agree.
 * 3. **A blocked task says what it is waiting on.** `blocked` was one of six
 *    adverse statuses in the module with nowhere to record a reason, and it is
 *    the one whose entire meaning is "somebody else has to do something first".
 * 4. **Overdue is inked with ink, and its word is a prop.**
 *    `toneColor(colors, 'danger')` returns the `danger` **fill** slot and the
 *    base assigned it straight to `color:`.
 * 5. **The row announces its whole state** — title, category, due date, status,
 *    overdue, the blocking reason and the assignee — instead of the title
 *    alone, with the completion state left to a checkbox nobody could reach.
 *
 * The assignee's avatar is `xs` on both twins; the web base used `sm`.
 *
 * **Renders nothing without a `title`.**
 */
export function OnboardingTaskV4({
  title,
  category,
  status = 'todo',
  dueDate,
  overdue = false,
  assignee,
  assigneeAvatarUrl,
  variant = 'default',
  blockedReason,
  overdueLabel = '⚠ Overdue',
  onToggle,
  onPress,
  testID,
  style,
}: OnboardingTaskV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const compact = variant === 'compact';
  const done = status === 'done';
  const statusMeta = TASK_STATUS_V4[status];
  /*
    A status pill that sits BESIDE the activation is hidden from the reader when
    the row is interactive — the activation's own name already carries the
    status word, and hearing "Denied" twice in a row is worse than hearing it
    once. On a static row there is no activation to carry it, so the pill speaks
    for itself and the name leaves it out. Same rule on both twins.
  */
  const interactive = onPress != null;

  const caption = metaLine([category, dueDate ? `Due ${dueDate}` : null]);
  const tap = minTap(tokens.spacing);

  const why = isAdverse(status) ? blockedReason : undefined;
  const isOverdue = overdue && !done;

  const spoken = spokenLine([
    title,
    category,
    dueDate ? `Due ${dueDate}` : null,
    interactive ? statusMeta.label : null,
    isOverdue ? overdueLabel : null,
    why,
    assignee,
  ]);

  const titleText = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        justifyContent: 'center',
        minHeight: tap,
        paddingHorizontal: tokens.spacing.xs,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <TextV4
        size="sm"
        weight="semibold"
        numberOfLines={2}
        style={{
          color: done ? colors.mutedText : colors.onCard,
          textDecorationLine: done ? 'line-through' : 'none',
        }}
      >
        {title}
      </TextV4>
    </View>
  );

  return (
    <View
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
        style,
      ]}
    >
      {/* A sibling of the title's activation, never a descendant — change 1. */}
      <View style={{ width: tap, height: tap, alignItems: 'center', justifyContent: 'center' }}>
        <CheckboxV4
          checked={done}
          onCheckedChange={(next) => onToggle?.(next)}
          accessibilityLabel={`${done ? 'Mark incomplete' : 'Mark complete'}: ${title}`}
        />
      </View>

      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        {onPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={spoken}
            onPress={onPress}
            style={{ borderRadius: tokens.radius.md }}
          >
            {({ pressed }) => titleText(pressed)}
          </Pressable>
        ) : (
          <View accessible accessibilityLabel={spoken}>
            {titleText(false)}
          </View>
        )}

        {!compact && caption ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {caption}
          </TextV4>
        ) : null}

        {/* An adverse status owes the reader a reason — see change 3. */}
        {why ? (
          <TextV4
            size="xs"
            weight="semibold"
            numberOfLines={2}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{ color: colors.dangerText }}
          >
            {why}
          </TextV4>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: tokens.spacing.xs,
          }}
        >
          <StatusPillV4 meta={statusMeta} size="sm" decorative={interactive} />
          {isOverdue ? (
            <TextV4
              size="xs"
              weight="semibold"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{ color: colors.dangerText }}
            >
              {overdueLabel}
            </TextV4>
          ) : null}
          {!compact && assignee ? (
            <View
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }}
            >
              <AvatarV4 size="xs" name={assignee} src={assigneeAvatarUrl} />
              <TextV4 size="xs" tone="mutedText">
                {assignee}
              </TextV4>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

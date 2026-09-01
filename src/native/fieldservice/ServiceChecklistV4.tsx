import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { CheckboxV4 } from '../primitives/CheckboxV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { isComplete } from '../../fieldservice/verdict-v4';
import { BADGE_V4, skeletonFill, spokenLine } from './internal/job-v4';
import type { ServiceChecklistProps } from './ServiceChecklist';

export interface ServiceChecklistV4Props extends ServiceChecklistProps {
  /** The empty state's next-step sentence. The base hard-coded one beside a prop-driven title. */
  emptyDescription?: string;
  /** The word a mandatory task wears, in place of the red asterisk. Default `'Required'`. */
  requiredLabel?: string;
  /** The progress bar's accessible name. Default `'Checklist progress'`. */
  progressLabel?: string;
}

/** How many skeleton rows stand in for the list while it loads. */
const SKELETON_ROWS = 3;

/**
 * **V4 service checklist** — same props as {@link ServiceChecklist} plus
 * `emptyDescription`, `requiredLabel` and `progressLabel`.
 *
 * ## Five changes
 *
 * 1. **Complete means complete.** The base compared a **rounded** percentage
 *    against 100 — and `clampPct` rounds — so 199 tasks of 200 turned the bar
 *    green with an item still outstanding. `isComplete(completed, total)`
 *    answers the question with counts; a percentage is for drawing.
 * 2. **Requiredness is a word.** A red asterisk is colour and punctuation, one
 *    of which a colour-blind user cannot see and the other of which a screen
 *    reader may not read at all. `requiredLabel` is a neutral chip beside the
 *    task and joins the control's spoken name.
 * 3. **The progress bar has a name.** It announced a bare percentage, so a
 *    reader heard a number with nothing attached to it.
 * 4. **The whole row toggles**, as it already did on the web twin — the base
 *    made only the 20px box hittable, on a screen used in gloves.
 * 5. **A checklist nobody can tick is not enabled.** With no `onToggle` the
 *    base still rendered live checkboxes that could be pressed forever and
 *    never changed.
 */
export function ServiceChecklistV4({
  title,
  tasks,
  onToggle,
  loading = false,
  disabled = false,
  emptyLabel = 'No checklist items',
  emptyDescription = 'Items will appear here once added.',
  requiredLabel = 'Required',
  progressLabel = 'Checklist progress',
  style,
}: ServiceChecklistV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const list = Array.isArray(tasks) ? tasks : [];
  const total = list.length;
  const completed = list.filter((task) => task.done).length;
  const complete = isComplete(completed, total);
  const interactive = Boolean(onToggle) && !disabled;
  const tap = minTap(tokens.spacing);

  if (loading) {
    return (
      <CardV4 variant="outlined" style={[{ backgroundColor: colors.card }, style]}>
        <View accessible accessibilityLabel="Loading checklist" style={{ gap: tokens.spacing.sm }}>
          {Array.from({ length: SKELETON_ROWS }, (_, i) => (
            <View
              key={i}
              style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, minHeight: tap }}
            >
              <View
                style={{
                  width: tokens.spacing.lg,
                  height: tokens.spacing.lg,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: skeletonFill(theme),
                }}
              />
              <View
                style={{
                  flex: 1,
                  height: tokens.spacing.md,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: skeletonFill(theme),
                }}
              />
            </View>
          ))}
        </View>
      </CardV4>
    );
  }

  if (total === 0) {
    return <EmptyStateV4 title={emptyLabel} description={emptyDescription} style={style} />;
  }

  return (
    <CardV4 variant="outlined" style={[{ backgroundColor: colors.card }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {title != null ? (
          <TextV4 size="base" weight="bold" tone="onCard">
            {title}
          </TextV4>
        ) : (
          <View />
        )}
        <TextV4 size="xs" weight="semibold" tone="mutedText" numeric="tabular">
          {`${completed}/${total}`}
        </TextV4>
      </View>

      {/* The name, the role and the value on one element: `ProgressV4` draws the
          bar and reports the number, but a number with no name attached is not
          a fact anybody can act on. */}
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={progressLabel}
        accessibilityValue={{ min: 0, max: total, now: completed }}
        style={{ marginTop: tokens.spacing.sm }}
      >
        <ProgressV4 value={completed} max={total} tone={complete ? 'success' : 'primary'} size="sm" />
      </View>

      <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
        {list.map((task) => {
          const name = spokenLine([task.label, task.required === true ? requiredLabel : null]);

          const body = (pressed: boolean): React.ReactElement => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                minHeight: tap,
                paddingVertical: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
              }}
            >
              {/* The row is the accessible control; the box is the mark it
                  wears, so it must not become a second stop for the reader. */}
              <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                <CheckboxV4
                  checked={task.done}
                  disabled={!interactive}
                  onCheckedChange={interactive ? (next) => onToggle?.(task.id, next) : undefined}
                />
              </View>
              <TextV4
                size="sm"
                tone={task.done ? 'mutedText' : 'onCard'}
                style={{
                  flex: 1,
                  textDecorationLine: task.done ? 'line-through' : 'none',
                }}
              >
                {task.label}
              </TextV4>
              {task.required === true ? (
                <BadgeV4 tone="neutral" {...BADGE_V4}>
                  {requiredLabel}
                </BadgeV4>
              ) : null}
            </View>
          );

          if (!interactive) {
            return (
              <View
                key={task.id}
                accessible
                accessibilityRole="checkbox"
                accessibilityLabel={name}
                accessibilityState={{ checked: task.done, disabled: true }}
              >
                {body(false)}
              </View>
            );
          }

          return (
            <Pressable
              key={task.id}
              accessibilityRole="checkbox"
              accessibilityLabel={name}
              accessibilityState={{ checked: task.done, disabled: false }}
              onPress={() => onToggle?.(task.id, !task.done)}
              style={{ borderRadius: tokens.radius.md }}
            >
              {({ pressed }) => body(pressed)}
            </Pressable>
          );
        })}
      </View>
    </CardV4>
  );
}

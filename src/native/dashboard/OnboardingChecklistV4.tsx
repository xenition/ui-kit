import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { RAIL_MIN_ROWS } from '../primitives/StepListV4';
import { pressOver } from '../primitives/internal/state-v4';
import type { IconName } from '../../primitives/icon-names';
import type { OnboardingChecklistProps, OnboardingStep } from './OnboardingChecklist';

export type { OnboardingStep };

/**
 * A step in an {@link OnboardingChecklistV4}.
 *
 * Everything {@link OnboardingStep} carries, plus the two things the V4 badge
 * needs: a **glyph** for a step that is not yet done, and a **stable key** so
 * reordering or renaming a step does not remount the row it belongs to. Both
 * optional — with neither, the badge falls back to the step number and the key
 * falls back to the index, which is what the base does today.
 */
export interface OnboardingStepV4 extends OnboardingStep {
  /** Named glyph for the badge of a step still to do. Falls back to its number. */
  icon?: IconName;
  /** Stable key. Falls back to the label and the index. */
  id?: string;
}

export interface OnboardingChecklistV4Props
  extends Omit<OnboardingChecklistProps, 'steps'> {
  steps: OnboardingStepV4[];
  /**
   * A supporting line under the heading — "three quick things and you are set
   * up". Optional, and absent by default, so nothing existing gains a line.
   */
  subtitle?: string;
  /**
   * Draw the hairline rail joining the badges.
   *
   * **Tri-state, and the default is shared.** Left undefined the rail turns
   * itself on at {@link RAIL_MIN_ROWS} rows — the same threshold, imported from
   * the same constant, that `StepListV4` uses, because this is the same list.
   * Pass `true` or `false` to overrule the count.
   */
  connector?: boolean;
  /**
   * What to render in the body when `steps` is empty.
   *
   * Defaults to an {@link EmptyStateV4}, because unlike a `StepListV4` — which
   * is a fragment of a screen and correctly renders nothing — this component IS
   * a card, and brief §4.5's rule for a container that owns its region is "an
   * empty state, never a blank bordered box".
   */
  empty?: React.ReactNode;
}

/**
 * **V4 onboarding checklist** — the native twin of the web
 * `OnboardingChecklistV4`. `StepListV4`'s anatomy, with a completion state, a
 * meter and a card around it.
 *
 * ## It is the feature row, not a fifth kind of list
 *
 * `ONBOARDING-DESIGN-SPEC.md` §8's feature row — a circular tinted badge, a
 * bold title, a muted supporting line, a hairline rail joining the badges once
 * there are three or more — already ships as `StepListV4`. A getting-started
 * checklist is that exact anatomy plus a done/not-done state, so it wears it:
 * the same `IconV4` badge at the same `lg` glyph size, the same `md` gap, the
 * same `xs` text gap, the same `md` between rows, and the rail threshold
 * **imported** from {@link RAIL_MIN_ROWS} rather than re-decided here.
 *
 * It is not a straight `StepListV4` composition for three reasons, each of
 * which would otherwise have to be pushed into that primitive:
 *
 * 1. **Completion is `success`, not `primary`** (brief §5). `StepListV4`'s
 *    `done` badge fills with the brand colour, which is right for "step 3 of 5
 *    is behind you" and wrong for "this task is finished".
 * 2. **The supporting line is `mutedText`, not `muted`** (brief §4.3).
 *    `StepListV4` sets `tone="muted"`, the decorative *fill*; a line of copy
 *    telling the user what a step involves is text and needs the contrast-
 *    corrected slot. The base checklist uses `colors.muted` for every line on
 *    the card, which is the exact bug the shadcn pass closed elsewhere.
 * 3. **The step owns its own handler.** `OnboardingStep.onPress` is per-step
 *    and pre-existing; `StepListV4` takes one list-level `onStepPress(index)`.
 *    Routing through it would silently change a documented prop's shape.
 *
 * ## Completion is never signalled by colour alone
 *
 * Three signals, and only one of them is a colour: the badge gains a **check
 * glyph** (`IconV4 name="check"` — the literal `✓` character the base ships is
 * gone), the badge **fills** where it was a wash, and the label drops to
 * `mutedText`. The accessible name says "completed" or "not completed" outright,
 * and a pressable step reports `accessibilityState={{ checked }}`.
 *
 * **The strike-through is gone**, per brief §5: struck text reads as *deleted*,
 * not as done, and it makes the one thing the user has already achieved the
 * hardest thing on the card to read.
 *
 * ## Everything else that changed
 *
 * - **The card is `card`, not `surface`** (brief §4.2). This module never
 *   adopted the shadcn card split, so every card in it currently paints the
 *   same colour as the page it floats on. `CardV4 variant="elevated"` supplies
 *   the hairline and `elevation.card`; the ground is named here because
 *   `CardV4` itself still defaults to `surface`.
 * - **The 22×22 marker is gone.** The badge is `IconV4`'s 44 disc — the HIG tap
 *   floor, so a pressable step is a real target rather than a 22px one.
 * - **The meter is `ProgressV4`**, not a hand-rolled `height: 6` bar. `size="sm"`
 *   is `spacing.xs` of track, off the scale; 6 was a literal.
 * - **Press feedback is the state layer.** `opacity: pressed ? 0.7 : 1` is
 *   deleted, not translated: dimming fades the row's own content, which is the
 *   signal M3 spends 0.38 on to mean *disabled*. `pressOver(card, onCard)` is
 *   the pressed layer flattened against the pair this card actually wears,
 *   because the row's text carries a measured contrast promise against it.
 * - **`steps: []` survives.** 0 of 0, no divide-by-zero, no meter (a progress
 *   bar with `max` 0 reports nothing), and an `EmptyStateV4` in the body.
 *
 * The web twin takes `className`, and its steps take `onClick`; every other
 * prop, name and default is identical.
 */
export function OnboardingChecklistV4({
  steps,
  title = 'Get started',
  subtitle,
  connector,
  empty,
  style,
}: OnboardingChecklistV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const total = steps.length;
  const doneCount = steps.filter((s) => s.done).length;
  // Undefined means "decide from the count" — §8's three-row threshold, shared.
  const rail = connector ?? total >= RAIL_MIN_ROWS;
  // Opaque, and named: the row's own text is contrast-checked against `card`.
  const pressed = pressOver(theme, colors.card, colors.onCard);

  return (
    <CardV4
      variant="elevated"
      radius="lg"
      padding="lg"
      /*
        Brief §4.2's headline fix: `colors.card`, not `colors.surface`. The
        split exists precisely so a raised card reads as raised in both schemes,
        and this module never adopted it — every card in it currently paints the
        same colour as the page it floats on. The style array puts this after
        `CardV4`'s own fill, so it wins.
      */
      style={[{ backgroundColor: colors.card, gap: tokens.spacing.md }, style]}
    >
      <View style={{ gap: tokens.spacing.xs }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.md,
          }}
        >
          <TextV4 accessibilityRole="header" size="lg" weight="bold" tone="onCard">
            {title}
          </TextV4>
          {/*
            Tabular figures, so the count does not reflow as it climbs from
            "9 of 12" to "10 of 12" — the one place on this card where a
            character width changing under the reader would be noticed.
          */}
          <TextV4 size="sm" tone="mutedText" numeric="tabular">
            {doneCount} of {total}
          </TextV4>
        </View>
        {subtitle ? (
          <TextV4 size="sm" tone="mutedText">
            {subtitle}
          </TextV4>
        ) : null}
        {/*
          No steps, no meter. A progressbar with `max` 0 has nothing to report
          and screen readers say so out loud; the "0 of 0" line above already
          carries the fact honestly.
        */}
        {total > 0 ? (
          <ProgressV4
            value={doneCount}
            max={total}
            size="sm"
            tone={doneCount === total ? 'success' : 'primary'}
          />
        ) : null}
      </View>

      {total === 0 ? (
        <View testID="xen-v4-checklist-empty">
          {empty ?? (
            <EmptyStateV4
              title="Nothing to set up"
              description="Steps will appear here as soon as there is something to do."
            />
          )}
        </View>
      ) : (
        <View>
          {steps.map((step, i) => {
            const last = i === total - 1;
            const done = step.done;
            const label = `${step.label}, ${done ? 'completed' : 'not completed'}`;

            const body = (
              <View
                style={{
                  flexDirection: 'row',
                  gap: tokens.spacing.md,
                  paddingBottom: last ? 0 : tokens.spacing.md,
                }}
              >
                <View style={{ alignItems: 'center' }}>
                  {/*
                    §4.7's badge, at §8's settings. Done fills with `success`
                    and carries a real `IconV4` check; still-to-do is the plain
                    wash with the step's own glyph, or its number where it has
                    none, inside a `colors.border` hairline — brief §5. The
                    literal `✓` the base ships is gone.
                  */}
                  <IconV4
                    badge={done ? 'solid' : 'soft'}
                    badgeShape="circle"
                    color={done ? 'success' : 'primary'}
                    size="lg"
                    name={done ? 'check' : step.icon}
                    glyph={!done && step.icon == null ? String(i + 1) : undefined}
                    style={{
                      borderWidth: 1,
                      borderColor: done ? 'transparent' : colors.border,
                    }}
                  />
                  {/*
                    The rail is what makes three steps read as one story rather
                    than three fragments. It stops at the last badge so the list
                    does not trail off into nothing.
                  */}
                  {rail && !last ? (
                    <View
                      testID="xen-v4-checkrail"
                      style={{ width: 1, flex: 1, backgroundColor: colors.border }}
                    />
                  ) : null}
                </View>

                <View
                  style={{
                    flex: 1,
                    minWidth: 0,
                    gap: tokens.spacing.xs,
                    paddingTop: tokens.spacing.xs,
                  }}
                >
                  <TextV4
                    size="base"
                    weight="semibold"
                    tone={done ? 'mutedText' : 'onCard'}
                  >
                    {step.label}
                  </TextV4>
                  {step.description ? (
                    <TextV4 size="sm" tone="mutedText">
                      {step.description}
                    </TextV4>
                  ) : null}
                </View>
              </View>
            );

            const key = step.id ?? `${step.label}-${i}`;
            return step.onPress ? (
              <Pressable
                key={key}
                accessibilityRole="button"
                accessibilityLabel={label}
                accessibilityState={{ checked: done }}
                onPress={step.onPress}
                /*
                  A press tints; it never lifts, and it never dims. The opacity
                  dip the base ships fades the row's own content, which is how a
                  pressed step ended up looking like a disabled one.
                */
                style={({ pressed: held }) => ({
                  borderRadius: tokens.radius.md,
                  backgroundColor: held ? pressed : 'transparent',
                })}
              >
                {body}
              </Pressable>
            ) : (
              <View key={key} accessibilityLabel={label}>
                {body}
              </View>
            );
          })}
        </View>
      )}
    </CardV4>
  );
}

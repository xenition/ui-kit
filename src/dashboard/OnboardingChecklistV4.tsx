import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { RAIL_MIN_ROWS } from '../primitives/StepListV4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { IconName } from '../primitives/icon-names';
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
 * The focus ring for a pressable step.
 *
 * The one thing here a utility class bound to a token cannot say: a
 * `:focus-visible` outline whose offset has to survive the row's own rounding.
 * The colour is `--xen-ring`, the single focus slot every other V4 control
 * uses, so tabbing across a screen never changes the shape of the signal. Same
 * rule, same selector shape as `StepListV4`'s — this is deliberately the same
 * row wearing a different label.
 */
const CHECKLIST_V4_CSS = `
[data-xen-v4-checkstep]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: 2px;
}
`;

/**
 * **V4 onboarding checklist** — the web twin of the native
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
 * same `xs` text gap, the same `pb-md` between rows, and the rail threshold
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
 *    corrected slot.
 * 3. **The step owns its own handler.** `OnboardingStep.onClick` is per-step
 *    and pre-existing; `StepListV4` takes one list-level `onStepClick(index)`.
 *    Routing through it would silently change a documented prop's shape.
 *
 * ## Completion is never signalled by colour alone
 *
 * Three signals, and only one of them is a colour: the badge gains a **check
 * glyph** (`IconV4 name="check"` — the literal `✓` character the base ships is
 * gone), the badge **fills** where it was a wash, and the label drops to
 * `mutedText`. The accessible name says "completed" or "not completed" outright,
 * and a pressable step carries `aria-pressed`.
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
 *   the hairline and `elevation.card`; the ground and the ink are named here
 *   because `CardV4` itself still defaults to `surface`.
 * - **The `w-[22px]` marker is gone.** The badge is `IconV4`'s 44 disc — the
 *   HIG tap floor, so a pressable step is a real target rather than a 22px one.
 * - **The meter is `ProgressV4`**, not a hand-rolled `h-1.5` bar with a `%`
 *   width. `size="sm"` is `spacing.xs` of track, off the scale.
 * - **Press feedback is the state layer.** `hover:opacity-80` is deleted, not
 *   translated: dimming fades the row's own content, which is the signal M3
 *   spends 0.38 on to mean *disabled*. The layer is made **opaque** against
 *   `card`/`on-card`, because the row's text carries a measured contrast
 *   promise against the fill it is drawn on.
 * - **`steps: []` survives.** 0 of 0, no divide-by-zero, no meter (a progress
 *   bar with `max` 0 reports nothing), and an `EmptyStateV4` in the body.
 *
 * The native twin takes `style`, and its steps take `onPress`; every other
 * prop, name and default is identical.
 */
export const OnboardingChecklistV4 = React.forwardRef<
  HTMLDivElement,
  OnboardingChecklistV4Props
>(function OnboardingChecklistV4(
  { steps, title = 'Get started', subtitle, connector, empty, className, ...rest },
  ref
) {
  injectStyleOnce('xen-v4-checklist-styles', CHECKLIST_V4_CSS);
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  const total = steps.length;
  const doneCount = steps.filter((s) => s.done).length;
  // Undefined means "decide from the count" — §8's three-row threshold, shared.
  const rail = connector ?? total >= RAIL_MIN_ROWS;

  return (
    <CardV4
      ref={ref}
      variant="elevated"
      radius="lg"
      padding="lg"
      /*
        Brief §4.2's headline fix. `bg-card` / `text-on-card` are later in the
        generated palette than `bg-surface` / `text-on-surface`, which is what
        `CardV4` paints by default, so they win on cascade order without a
        `!important` — and a raised card finally reads as raised in both
        schemes instead of dissolving into the page.
      */
      className={cn('flex flex-col gap-md bg-card text-on-card', className)}
      {...rest}
    >
      <div className="flex flex-col gap-xs">
        <div className="flex items-center justify-between gap-md">
          <TextV4 size="lg" weight="bold" tone="onCard">
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
        </div>
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
            data-xen-v4-checklist-meter=""
            value={doneCount}
            max={total}
            size="sm"
            tone={doneCount === total ? 'success' : 'primary'}
          />
        ) : null}
      </div>

      {total === 0 ? (
        <div data-xen-v4-checklist-empty="">
          {empty ?? (
            <EmptyStateV4
              title="Nothing to set up"
              description="Steps will appear here as soon as there is something to do."
            />
          )}
        </div>
      ) : (
        <ol className="flex flex-col">
          {steps.map((step, i) => {
            const last = i === total - 1;
            const done = step.done;
            const label = `${step.label}, ${done ? 'completed' : 'not completed'}`;

            const body = (
              <div className={cn('flex w-full gap-md text-left', last ? 'pb-0' : 'pb-md')}>
                <div className="flex flex-col items-center">
                  {/*
                    §4.7's badge, at §8's settings. Done fills with `success`
                    and carries a real `IconV4` check; still-to-do is the plain
                    wash with the step's own glyph, or its number where it has
                    none, inside a `border` hairline — brief §5's "colours.border
                    outlined when not". The literal `✓` the base ships is gone.
                  */}
                  <IconV4
                    data-xen-v4-checkbadge={done ? 'done' : 'todo'}
                    badge={done ? 'solid' : 'soft'}
                    badgeShape="circle"
                    color={done ? 'success' : 'primary'}
                    size="lg"
                    name={done ? 'check' : step.icon}
                    glyph={!done && step.icon == null ? String(i + 1) : undefined}
                    className={cn('border', done ? 'border-transparent' : 'border-border')}
                  />
                  {/*
                    The rail is what makes three steps read as one story rather
                    than three fragments. It stops at the last badge so the list
                    does not trail off into nothing.
                  */}
                  {rail && !last ? (
                    <span data-xen-v4-checkrail="" className="w-px flex-1 bg-border" />
                  ) : null}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-xs pt-xs">
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
                </div>
              </div>
            );

            return (
              <li key={step.id ?? `${step.label}-${i}`}>
                {step.onClick ? (
                  /*
                    `data-xen-v4-state` plus the opaque ground pair IS the whole
                    press and hover feedback. `hover:opacity-80` is deleted.
                  */
                  <button
                    type="button"
                    data-xen-v4-checkstep=""
                    data-xen-v4-state=""
                    aria-label={label}
                    aria-pressed={done}
                    onClick={step.onClick}
                    className="w-full rounded-[var(--xen-radius-md)] text-left"
                    style={
                      stateGroundVars(
                        'var(--xen-card)',
                        'var(--xen-on-card)'
                      ) as React.CSSProperties
                    }
                  >
                    {body}
                  </button>
                ) : (
                  <div data-xen-v4-checkstep="" aria-label={label}>
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </CardV4>
  );
});

import * as React from 'react';
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
export interface OnboardingChecklistV4Props extends Omit<OnboardingChecklistProps, 'steps'> {
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
export declare function OnboardingChecklistV4({ steps, title, subtitle, connector, empty, style, }: OnboardingChecklistV4Props): React.ReactElement;
//# sourceMappingURL=OnboardingChecklistV4.d.ts.map
import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { IconV4 } from './IconV4';
import { TextV4 } from './TextV4';
import { transitionCss } from './internal/v4-motion';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from './internal/v4-state';
import type { IconName } from './icon-names';
import type { StepListItem, StepListProps } from './StepList';

export type { StepListItem };

/**
 * A row in a {@link StepListV4}.
 *
 * Everything {@link StepListItem} carries, plus the one thing §8 of the
 * onboarding spec adds: a **glyph** for the badge. A feature row on a paywall
 * is not step 3 of 5 — it is one of several parallel reasons to say yes — so
 * the badge holds a symbol for the thing being promised rather than an ordinal
 * that implies an order the list does not have.
 *
 * The value is a name from the kit's icon set (`'bolt'`, `'star'`, `'lock'`, …),
 * typed, so a typo is a compile error. An unrecognised string still renders
 * as-is, which is the base `Icon`'s documented escape hatch for a one-off the
 * set has no name for. With no `icon` at all the badge falls back to the step
 * number, so a numbered instruction list still works and nothing existing loses
 * its markers.
 */
export interface StepListV4Item extends StepListItem {
  /** Named glyph for the badge. Falls back to the step number. */
  icon?: IconName;
}

export interface StepListV4Props extends Omit<StepListProps, 'steps' | 'connector'> {
  steps: StepListV4Item[];
  /**
   * Draw the hairline rail joining the badges.
   *
   * **Tri-state, and the default is the point.** Left undefined the rail turns
   * itself on at {@link RAIL_MIN_ROWS} rows and stays off below it — §8 of the
   * onboarding spec, verbatim: "on by default when there are three or more
   * rows, because it reads as one list rather than three fragments". Two rows
   * are already a pair and need no help; three loose badges read as three
   * unrelated marks. Pass `true` or `false` to overrule the count.
   */
  connector?: boolean;
  /**
   * What to render when `steps` is empty — §12 of the onboarding spec, "every
   * screen must survive its empty state … zero features".
   *
   * Default is **nothing at all**, deliberately. A `StepList` is a fragment of
   * a screen rather than a screen: a paywall whose feature list has not loaded
   * should show the headline and the CTA with a gap where the rows go, not an
   * empty bordered box apologising for itself. A caller that genuinely owns the
   * whole region — a settings checklist that IS the page — passes its own
   * `EmptyStateV4` here.
   */
  empty?: React.ReactNode;
}

/**
 * How many rows it takes before the rail earns its place. §8.
 *
 * Not a metric, so it is not a token: it is a count of list items, in the same
 * family as a flex factor.
 */
export const RAIL_MIN_ROWS = 3;

/**
 * The one thing here a utility class bound to a token cannot say.
 *
 * A pressable row's focus indicator has to reach `:focus-visible`, and the
 * `outline-offset` has to survive the row's own rounding. The colour is
 * `--xen-ring`, the single focus slot every other V4 control uses, so tabbing
 * across a screen never changes the shape of the signal.
 *
 * The rail itself transitions, because `connector` can flip while the list is
 * mounted (a step completing, a row arriving) and a hairline that snaps into
 * existence reads as a rendering fault. `V4_MOTION.standard` by way of
 * {@link transitionCss} — nothing here picks a duration or an easing.
 */
const STEPLIST_V4_CSS = `
[data-xen-v4-steprow]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: 2px;
}
[data-xen-v4-steprail] {
  transition: ${transitionCss(['background-color'])};
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-steprail] { transition: none; }
}
`;

/**
 * **V4 step list** — the web twin of the native `StepListV4`, the same props as
 * {@link StepList} plus a glyph per row, a different design line.
 *
 * ## This is the pattern that carries the value proposition
 *
 * §8 of the onboarding spec calls it the feature row, and it is the signature
 * anatomy of the reference screens: a soft circular tinted badge on the left, a
 * bold title, a muted description, and a hairline rail threading the badges
 * into one continuous list. The paywall is made of it; so is the welcome offer.
 *
 * What changed from the base:
 *
 * 1. **The marker became a badge, and the badge can hold a glyph.** The base
 *    draws a 32px outlined circle with an ordinal in it, which is right for a
 *    recipe method and wrong for a list of promises — nobody unlocks feature 2
 *    before feature 3. An `icon` per row replaces the number where the list is
 *    not really ordered, and the disc grows to §8's 44 so it reads as an object
 *    rather than as a bullet.
 * 2. **The badge is `IconV4`'s badge**, not a local one. §8's feature-row disc
 *    and §9's brand tile are the same object at two settings, `IconV4` already
 *    owns both, and it owns them with the contrast correction and the per-scheme
 *    ground that a hand-rolled `bg-[color-mix(…)]` here would quietly skip. §10.2
 *    — reuse the kit's primitives — and §10.5 — a V4 composite composes V4
 *    children. `badge="soft"` for a step still ahead, `badge="solid"` for one
 *    behind: the ladder is the badge's own fill, not a fourth colour.
 * 3. **Typography carries the hierarchy.** Title `base`/semibold, description
 *    `sm`/muted — §8 exactly, and one step further apart than the base's
 *    `medium`, so the title is legibly the headline of its row without a rule
 *    under it.
 * 4. **The rail turns itself on at three.** See {@link StepListV4Props.connector}.
 * 5. **The rows sit `md` apart**, not `lg`. Tighter, because the rail is doing
 *    the work of saying these belong together and the space no longer has to.
 *
 * ## Why this is not the "icon in a coloured box on every row" tell
 *
 * `design.md` §8 lists that among the marks of generic AI UI, and the objection
 * is real. Three things keep this on the right side of it. The badge is a
 * **circle**, which reads as a marker on a timeline rather than as an app icon.
 * The rail makes the badges **one object** rather than n decorated rows. And
 * the component is scoped to the one place the onboarding spec asks for it —
 * the value proposition — rather than being the kit's default list, which is
 * `ListV4`, and which has no badge at all.
 *
 * ## The state ladder
 *
 * `current` stays optional, and omitting it is the paywall case: nothing is
 * done, nothing is active, every badge is the same soft disc and the list is a
 * flat set of promises. Given a `current`, three settings and no new colour —
 * a completed step **fills** (`badge="solid"`), the current step keeps the wash
 * and gains a hairline `primary` ring, and everything ahead is the plain wash.
 * The title never mutes: unlike `Steps`, whose labels sit on a progress bar,
 * these are instructions, and the one you have not reached yet is exactly the
 * one that has to be readable.
 *
 * The native twin takes `onStepPress` and `style`; every other prop, name and
 * default is identical.
 */
export function StepListV4({
  steps,
  current,
  onStepClick,
  connector,
  empty,
  className,
}: StepListV4Props): React.ReactElement {
  injectStyleOnce('xen-v4-steplist-styles', STEPLIST_V4_CSS);
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  // §12. Nothing, unless the caller owns the region and said what belongs here.
  if (steps.length === 0) {
    return <div className={className}>{empty}</div>;
  }

  // Undefined means "decide from the count" — §8's three-row threshold.
  const rail = connector ?? steps.length >= RAIL_MIN_ROWS;

  return (
    <ol className={cn('flex flex-col', className)}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        // `current` stays optional: with no current step nothing is done and
        // nothing is active, and the list renders as a flat feature list —
        // which is what a paywall wants.
        const done = step.done === true || (current != null && i < current);
        const active = step.done !== true && current != null && i === current;

        const body = (
          <div className={cn('flex w-full gap-md text-left', last ? 'pb-0' : 'pb-md')}>
            <div className="flex flex-col items-center">
              {/*
                One badge, two contents. `name` is the row's own glyph; with no
                glyph the slot carries the ordinal instead — `glyph` is the base
                `Icon`'s documented escape hatch for a one-off mark, and a digit
                is one. Routing both through the same component is what keeps a
                numbered list and a feature list the same size, the same
                silhouette and the same wash rather than two near-misses.

                `color="primary"` is §8's word for the glyph. `IconV4` re-derives
                the ink against the ground it just composited, so a `solid` badge
                flips to the guaranteed on-pair with nothing to decide here.
              */}
              <IconV4
                badge={done ? 'solid' : 'soft'}
                badgeShape="circle"
                color="primary"
                size="lg"
                name={step.icon}
                glyph={step.icon == null ? (done ? '✓' : String(i + 1)) : undefined}
                className={cn('border', active ? 'border-primary' : 'border-transparent')}
              />
              {/*
                The rail is what makes three rows read as one story rather than
                three fragments. It runs edge to edge between the badges with no
                gap under the disc, because a line of separated segments is a
                different, busier idea than one continuous thread. It stops at
                the last badge so the list does not trail off into nothing.
              */}
              {rail && !last ? (
                <span data-xen-v4-steprail="" className="w-px flex-1 bg-border" />
              ) : null}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-xs pt-xs">
              {typeof step.title === 'string' ? (
                <TextV4 size="base" weight="semibold" tone="onSurface">
                  {step.title}
                </TextV4>
              ) : (
                step.title
              )}
              {step.description != null ? (
                typeof step.description === 'string' ? (
                  <TextV4 size="sm" tone="muted">
                    {step.description}
                  </TextV4>
                ) : (
                  step.description
                )
              ) : null}
            </div>
          </div>
        );

        return (
          <li key={step.id ?? i}>
            {onStepClick ? (
              /*
                `data-xen-v4-state` is the line's shared hover/focus/press layer
                — M3's model, the control's own ink at the M3 opacity over
                whatever is behind — rather than a local `hover:opacity-70`,
                which dims the content and so makes a hovered row look disabled.
              */
              <button
                type="button"
                data-xen-v4-steprow=""
                data-xen-v4-state=""
                aria-pressed={done}
                onClick={() => onStepClick(i)}
                className="w-full rounded-[var(--xen-radius-md)] text-left"
              >
                {body}
              </button>
            ) : (
              body
            )}
          </li>
        );
      })}
    </ol>
  );
}

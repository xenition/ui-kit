import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from './IconV4';
import { TextV4 } from './TextV4';
import { pressFill } from './internal/state-v4';
import type { IconName } from '../../primitives/icon-names';
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
 * **V4 step list** — the same props as {@link StepList} plus a glyph per row, a
 * different design line.
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
 *    draws a small outlined circle with an ordinal in it, which is right for a
 *    recipe method and wrong for a list of promises — nobody unlocks feature 2
 *    before feature 3. An `icon` per row replaces the number where the list is
 *    not really ordered, and the disc grows to §8's 44 so it reads as an object
 *    rather than as a bullet — and so a pressable row is a real target.
 * 2. **The badge is `IconV4`'s badge**, not a local one. §8's feature-row disc
 *    and §9's brand tile are the same object at two settings, `IconV4` already
 *    owns both, and it owns them with the contrast correction and the opaque
 *    per-scheme ground a local `mixToken` here would quietly skip — plus the
 *    circle drawn from its own diameter, which matters because `radius.full`
 *    compiles to 0 on a `sharp` seed and §8's badge is a circle in every brand.
 *    §10.2 — reuse the kit's primitives — and §10.5 — a V4 composite composes
 *    V4 children. `badge="soft"` for a step still ahead, `badge="solid"` for one
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
 * The web twin takes `onStepClick` and `className`; every other prop, name and
 * default is identical.
 */
export function StepListV4({
  steps,
  current,
  onStepPress,
  connector,
  empty,
  style,
}: StepListV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  // §12. Nothing, unless the caller owns the region and said what belongs here.
  if (steps.length === 0) {
    return <View style={style}>{empty}</View>;
  }

  // Undefined means "decide from the count" — §8's three-row threshold.
  const rail = connector ?? steps.length >= RAIL_MIN_ROWS;
  const pressedFill = pressFill(theme);

  return (
    <View style={[{ flexDirection: 'column' }, style]}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        // `current` stays optional: with no current step nothing is done and
        // nothing is active, and the list renders as a flat feature list —
        // which is what a paywall wants.
        const done = step.done === true || (current != null && i < current);
        const active = step.done !== true && current != null && i === current;

        const row = (
          <View
            style={{
              flexDirection: 'row',
              gap: tokens.spacing.md,
              paddingBottom: last ? 0 : tokens.spacing.md,
            }}
          >
            <View style={{ alignItems: 'center' }}>
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

                The current step's ring is a hairline, not the base's 2px: it
                only has to say "this one" against a disc that is already tinted.
              */}
              <IconV4
                badge={done ? 'solid' : 'soft'}
                badgeShape="circle"
                color="primary"
                size="lg"
                name={step.icon}
                glyph={step.icon == null ? (done ? '✓' : String(i + 1)) : undefined}
                style={{
                  borderWidth: 1,
                  borderColor: active ? colors.primary : 'transparent',
                }}
              />
              {/*
                The rail is what makes three rows read as one story rather than
                three fragments. It runs edge to edge between the badges with no
                gap under the disc, because a line of separated segments is a
                different, busier idea than one continuous thread. It stops at
                the last badge so the list does not trail off into nothing.
              */}
              {rail && !last ? (
                <View style={{ width: 1, flex: 1, backgroundColor: colors.border }} />
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
            </View>
          </View>
        );

        const key = step.id ?? String(i);
        return onStepPress ? (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityState={{ checked: done }}
            onPress={() => onStepPress(i)}
            /*
              A press tints; it never lifts. `pressFill` is M3's pressed state
              layer flattened against `surface` — the same value every other
              pressable row in the V4 line uses — rather than an opacity dip,
              which fades the row's own content and so makes a pressed row look
              disabled.
            */
            style={({ pressed }) => ({
              borderRadius: tokens.radius.md,
              backgroundColor: pressed ? pressedFill : 'transparent',
            })}
          >
            {row}
          </Pressable>
        ) : (
          <View key={key}>{row}</View>
        );
      })}
    </View>
  );
}

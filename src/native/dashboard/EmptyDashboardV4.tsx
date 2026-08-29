import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import type { IconColor } from '../../primitives/Icon';
import type { IconName } from '../../primitives/icon-names';
import type { EmptyDashboardProps } from './EmptyDashboard';

/**
 * The semantic family the badge and the action belong to.
 *
 * A subset of `IconColor` — the four *fills* that name a family — rather than
 * the full ten, because the other six are `on*` pairs and a badge tinted with
 * an on-colour is a mistake the type should not allow. `primary` by default:
 * brief §4.7, "its colour comes from the semantic family the row belongs to;
 * `primary` by default".
 */
export type EmptyDashboardV4Tone = Extract<
  IconColor,
  'primary' | 'success' | 'warn' | 'danger'
>;

export interface EmptyDashboardV4Props extends EmptyDashboardProps {
  /**
   * Named glyph for the 64 tinted circular badge — brief §4.5's illustration
   * slot, expressed as a token rather than as a caller-drawn picture.
   *
   * Optional, and ignored when `icon` is given: `icon` is the pre-existing
   * escape hatch for an illustration this kit has no name for, and the
   * additive rule says a caller who passes one keeps getting exactly it.
   */
  iconName?: IconName;
  /**
   * Semantic family of the badge. Default `'primary'`.
   *
   * The action stays the brand primary in every case — brief §3 gives a screen
   * one loud thing, and a `danger`-toned CTA on an empty dashboard would be
   * shouting about a state that is merely quiet.
   */
  tone?: EmptyDashboardV4Tone;
}

/**
 * **V4 empty dashboard** — the native twin of the web `EmptyDashboardV4`, a
 * thin opinionated wrapper over {@link EmptyStateV4} rather than a second
 * implementation of it.
 *
 * ## The whole point is that it is not its own thing
 *
 * Brief §4.5: "every empty state routes through `EmptyStateV4`". The base
 * `EmptyDashboard` hand-rolls the anatomy — its own centred column, its own
 * `xl`/700 headline, its own `colors.muted` body (a *fill*, used as a text
 * colour), its own `maxWidth: 340` literal — so an empty dashboard and an empty
 * list are two different objects that happen to look similar. V4 deletes all of
 * that and hands the three parts to the primitive. What is left here is the two
 * decisions the primitive cannot make for a *dashboard*:
 *
 * 1. **The illustration is a 64 tinted circular badge** (§4.5, §4.7), built
 *    from `IconV4` so it is the same disc the feature rows and the activity
 *    feed wear, at the one size the empty state gets.
 * 2. **The action is a full-width pill, inset from the screen edge** — HIG's
 *    "full-width buttons must be inset from the screen edge, aligned with
 *    adjacent safe areas" and the house sticky-CTA shape, which agree. The
 *    base ships a shrink-wrapped `Button` in the middle of the column.
 *
 * ## Why the CTA is a sibling of the empty state and not its `action` slot
 *
 * `EmptyStateV4` centres its column (`alignItems: 'center'`), so every child is
 * laid out at its own content width. A button inside that column cannot be
 * full-width: `alignSelf: 'stretch'` stretches it to a parent whose width Yoga
 * resolved *from* the button, and turning the root to `alignItems: 'stretch'`
 * to fix that also pushes the description's capped measure off centre. So the
 * CTA sits below the state, in this component's own `lg` gutter, which is also
 * the more literal reading of "inset from the screen edge": the inset is the
 * page gutter, and the page gutter belongs to the container, not to the copy
 * above it.
 *
 * The block above it is still `EmptyStateV4`, node for node.
 *
 * ## What is deliberately NOT overridden
 *
 * The headline and body **keep the primitive's type ramp** (`lg`/600 over
 * `sm`/`mutedText`) rather than being wrapped in a `TextV4` at brief §4.5's
 * `xl`/`base`. Overriding it here would recreate, one level up, precisely the
 * divergence §4.5 exists to remove — an empty dashboard that is a *different
 * size* from an empty list is not "the same object". If the empty-state ramp is
 * to move, it moves in `EmptyStateV4` and every empty state moves with it.
 *
 * The `maxWidth: 340` literal is gone; the measure is the primitive's, off the
 * spacing scale.
 *
 * The web twin takes `className` and `onAction`; every other prop, name and
 * default is identical.
 */
export function EmptyDashboardV4({
  title,
  message,
  actionLabel,
  onAction,
  icon,
  iconName,
  tone = 'primary',
  style,
}: EmptyDashboardV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();

  /**
   * **64** — the empty-state badge, brief §4.7: "44 × 44 (64 in an empty
   * state)".
   *
   * Composed, never typed: `2xl + md`. `IconV4` derives its own diameter as
   * `max(44, fontSize + spacing.sm * 2)`, which tops out at 46 on the `3xl`
   * step, so the empty state's larger disc has to be *stated*. It is stated by
   * overriding the badge box `IconV4` already draws — the component documents
   * that a caller's width/height override lands on exactly that box — which
   * keeps the ground, the ink and the contrast correction where they already
   * live rather than re-rolling a badge here (§10.2 / §10.5).
   */
  const badgeDiameter = tokens.spacing['2xl'] + tokens.spacing.md;

  // The caller's own node wins — the additive rule. Only when there is none
  // does `iconName` build §4.5's badge, and with neither the state renders
  // without an illustration, exactly as the base does today.
  const mark =
    icon ??
    (iconName != null ? (
      <IconV4
        badge="soft"
        badgeShape="circle"
        color={tone}
        size="2xl"
        name={iconName}
        style={{
          width: badgeDiameter,
          height: badgeDiameter,
          // Geometry, not a radius token: `radius.full` compiles to 0 on a
          // `sharp` seed and §4.7's badge is a circle in every brand. This is
          // the same derivation `IconV4` makes from its own diameter.
          borderRadius: badgeDiameter / 2,
        }}
      />
    ) : undefined);

  const cta = actionLabel != null && onAction != null;

  return (
    <View accessibilityLabel={title} style={[{ width: '100%' }, style]}>
      {/*
        §4.5, and the reason this file is short: the icon, the headline and the
        body are not drawn here. The `lg` bottom padding closes the primitive's
        own `2xl` down to the step it uses between its copy and its action, so
        the CTA below sits the same distance away it would have if it had fitted
        in the slot. Nothing else about the block changes.
      */}
      <EmptyStateV4
        icon={mark}
        title={title}
        description={message}
        style={{ width: '100%', ...(cta ? { paddingBottom: tokens.spacing.lg } : null) }}
      />
      {cta ? (
        <View
          style={{
            width: '100%',
            paddingHorizontal: tokens.spacing.lg,
            paddingBottom: tokens.spacing['2xl'],
          }}
        >
          <ButtonV4
            testID="xen-v4-empty-cta"
            onPress={onAction}
            /*
              Full width and a pill: HIG's inset full-width button and the house
              CTA shape. `radius.full` compiles to 0 on a `sharp` seed, so a
              brand that asked for square corners still gets them — the token
              knows, and there is no branch here.
            */
            style={{ alignSelf: 'stretch', borderRadius: tokens.radius.full }}
          >
            {actionLabel}
          </ButtonV4>
        </View>
      ) : null}
    </View>
  );
}

import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { GridV4 } from '../layout/GridV4';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import type { IconName } from '../primitives/icon-names';
import { MIN_TAP_CLASS } from '../primitives/internal/nav-v4';
import { shadowCss, useOptionalCompiledTheme } from '../primitives/internal/v4-depth';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { QuickAction, QuickActionsProps } from './QuickActions';

/**
 * The semantic family a tile's badge belongs to.
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.7: *"Its colour comes from the semantic
 * family the row belongs to: `primary` by default, `success` for positive
 * money, `warn` / `danger` only when the row genuinely is a warning."* Four
 * names rather than the full slot list, and every one of them is legal on both
 * twins' `IconV4` — the web `IconColor` is narrower than native's
 * `keyof SemanticColors`, and prop parity (§1.3) means the prop can only offer
 * what both accept.
 */
export type QuickActionTone = 'primary' | 'success' | 'warn' | 'danger';

export interface QuickActionV4 extends QuickAction {
  /**
   * A name from the kit's icon set, drawn inside §4.7's tinted circular badge.
   *
   * This is the badge's front door. `icon` (below, inherited) still takes an
   * arbitrary node for anything the set has no name for, and a **string**
   * `icon` — an emoji, a one-off glyph — is badged too, because a string is
   * something `IconV4` can draw. Only a full React node is passed straight
   * through unbadged: there is no way to put a caller's element inside
   * `IconV4`, and re-rolling the badge here is how two badges end up not
   * matching (§10.5 — compose the primitive).
   */
  iconName?: IconName;
  /** Which semantic family the badge takes its tint from. Defaults to `primary`. */
  tone?: QuickActionTone;
}

export interface QuickActionsV4Props extends Omit<QuickActionsProps, 'actions'> {
  actions: QuickActionV4[];
  /**
   * Narrowest a tile may get before the grid drops a column, in px. Passed
   * straight through to `GridV4`, which fits as many columns as the container
   * can hold at that width and ignores `columns` when it is set.
   *
   * §5 asks for `QuickActions` to *"stop being fixed-column on a tablet"*, and
   * this is the scoped responsive mechanism the brief settled on. Undefined by
   * default, so a phone renders `columns` tracks exactly as today (§1.4).
   */
  minItemWidth?: number;
}

/**
 * Depth cannot be said as a utility class bound to a token — `box-shadow`
 * needs a composed value and the dark scheme needs *more* of it, not less — so
 * the tile's shadow lives in a sheet, exactly as `CardV4`'s does. Both values
 * are custom properties the component computed from the compiled theme, so the
 * no-literal-colours rule (§1.1) holds; with no provider above, `none` is the
 * honest fallback rather than a guessed shadow.
 */
const QUICK_ACTIONS_V4_CSS = `
[data-xen-v4-quick-action] { box-shadow: var(--xen-v4-shadow-l, none); }
[data-theme="dark"] [data-xen-v4-quick-action] { box-shadow: var(--xen-v4-shadow-d, none); }
`;

/**
 * **V4 quick actions** — the shortcut launcher on a dashboard home, on the V4
 * design line. Same props as {@link QuickActions} plus `minItemWidth`, and two
 * additive fields on each action (`iconName`, `tone`).
 *
 * ## It is a row of soft badges, not an admin toolbar
 *
 * §3 describes what this product actually looks like — *warm, generous, airy
 * consumer mobile; white cards floating on the warm ground; glyphs sit in soft
 * tinted circular badges* — and the base component was the opposite of it: a
 * bordered box the same colour as the page, an unstyled glyph slot, and a
 * `spacing.sm` gutter that packed the tiles tight enough to read as a control
 * strip. §5 asks for the whole tile:
 *
 * - **Ground `colors.card`, not `colors.surface`.** §4.2 calls this *"the most
 *   visible bug in the dashboard module today"* — the card slot was split out
 *   in the shadcn pass so a raised surface reads as raised in both schemes,
 *   and this module never adopted it. The ink moves with it, to `onCard`.
 * - **`radius.lg`, no border, `elevation.card`.** §4.2's recipe is a hairline
 *   *or* a soft shadow, never a heavy border and a shadow together; a tile
 *   floating on the warm page takes the shadow.
 * - **The glyph moves into a 44 tinted circular badge** — `IconV4
 *   badge="soft"`, §4.7's categorical badge, which is exactly what a quick
 *   action is: a *kind of thing* you can go and do.
 * - **Gutter `spacing.md`**, up from `sm`. §4.1's grid gutter, and §3's "when
 *   in doubt, more space".
 *
 * ## Reach, state and disabled
 *
 * Every tile clears the 44 floor through `MIN_TAP` (`spacing['2xl'] -
 * spacing.xs`, composed rather than typed). Hover and press are the **state
 * layer** over the tile's own opaque `card`/`onCard` pair — the base's
 * `hover:bg-neutral-100` was a raw ramp step that only worked in one scheme by
 * accident. `disabled` takes M3's 0.38 content opacity through
 * `V4_DISABLED_CLASS`, not the base's round-number `opacity-50`.
 *
 * ## Structure
 *
 * The grid is `GridV4`, so `columns` and the new `minItemWidth` are the
 * module's one answer to how many tracks fit rather than a second
 * `gridTemplateColumns` written here. The heading is an `<h3>` wrapping a
 * `TextV4` — the same anatomy `SectionV4` and `PageHeaderV4` use, so the
 * element carries the document semantics and the type comes from the scale.
 *
 * `actions: []` renders **nothing** (§4.5). A launcher with nothing to launch
 * is not a heading over a blank box.
 */
export const QuickActionsV4 = React.forwardRef<HTMLDivElement, QuickActionsV4Props>(
  function QuickActionsV4(
    { actions, title, columns = 3, minItemWidth, className, ...rest },
    ref
  ) {
    injectStyleOnce('xen-v4-quick-actions-styles', QUICK_ACTIONS_V4_CSS);
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    const theme = useOptionalCompiledTheme();

    // §4.5 — nothing to launch, nothing to draw. Not even the heading: a title
    // over a blank box is the bordered-empty-box §4.5 rules out, with a label.
    if (actions.length === 0) return null;

    const shadowVars: Record<string, string> = {};
    if (theme !== null) {
      shadowVars['--xen-v4-shadow-l'] = shadowCss(theme.lightElevation.card);
      shadowVars['--xen-v4-shadow-d'] = shadowCss(theme.darkElevation.card);
    }

    return (
      <div ref={ref} className={cn('flex flex-col gap-md', className)} {...rest}>
        {title ? (
          // `m-0` because a bare `h3` carries a user-agent margin that would
          // fight §4.1's rhythm; the type itself comes from `TextV4`.
          <h3 className="m-0">
            <TextV4 size="lg" weight="bold" tone="onSurface">
              {title}
            </TextV4>
          </h3>
        ) : null}

        <GridV4 columns={columns} gap="md" minItemWidth={minItemWidth}>
          {actions.map((action) => {
            const glyph = typeof action.icon === 'string' ? action.icon : undefined;
            const badged = glyph !== undefined || action.iconName !== undefined;
            return (
              <button
                key={action.key}
                type="button"
                aria-label={action.label}
                disabled={action.disabled}
                data-xen-v4-quick-action=""
                data-xen-v4-state=""
                onClick={action.onClick}
                className={cn(
                  'flex h-full w-full flex-col items-center justify-center gap-sm p-md',
                  // The HIG floor, composed from the spacing scale.
                  MIN_TAP_CLASS,
                  // §4.2: the card ground, the card radius, and no border —
                  // the shadow in the sheet is the edge.
                  'rounded-[var(--xen-radius-lg)] bg-card text-on-card',
                  'focus-visible:outline-none',
                  V4_DISABLED_CLASS
                )}
                style={
                  {
                    ...shadowVars,
                    ...stateGroundVars('var(--xen-card)', 'var(--xen-on-card)'),
                  } as React.CSSProperties
                }
              >
                {badged ? (
                  <IconV4
                    glyph={glyph}
                    name={action.iconName}
                    badge="soft"
                    color={action.tone ?? 'primary'}
                  />
                ) : action.icon ? (
                  <span aria-hidden>{action.icon}</span>
                ) : null}
                <TextV4 size="sm" weight="semibold" tone="onCard" numberOfLines={1}>
                  {action.label}
                </TextV4>
              </button>
            );
          })}
        </GridV4>
      </div>
    );
  }
);

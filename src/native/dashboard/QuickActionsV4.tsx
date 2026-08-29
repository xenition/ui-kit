import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { GridV4 } from '../layout/GridV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/nav-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { elevationStyle } from '../primitives/internal/surface-v4';
import { useXenitionTheme } from '../theme';
import type { IconName } from '../../primitives/icon-names';
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
   * straight through to `GridV4`.
   *
   * §5 asks for `QuickActions` to *"stop being fixed-column on a tablet"*, and
   * this is the scoped responsive mechanism the brief settled on. React Native
   * has no CSS grid, so `GridV4` accepts it for parity and **degrades to the
   * `columns` behaviour** — the divergence is documented on `GridV4` itself
   * rather than re-argued here. Undefined by default, so a phone renders
   * `columns` tracks exactly as today (§1.4).
   */
  minItemWidth?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * **V4 quick actions** — the shortcut launcher on a dashboard home, on the V4
 * design line. Same props as {@link QuickActions} plus `minItemWidth`, two
 * additive fields on each action (`iconName`, `tone`), and the exact twin of
 * the web `QuickActionsV4`.
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
 *   floating on the warm page takes the shadow, and it is the seed's shadow —
 *   inert on a `depth: 'flat'` brand with no branch here.
 * - **The glyph moves into a 44 tinted circular badge** — `IconV4
 *   badge="soft"`, §4.7's categorical badge, which is exactly what a quick
 *   action is: a *kind of thing* you can go and do.
 * - **Gutter `spacing.md`**, up from `sm`. §4.1's grid gutter, and §3's "when
 *   in doubt, more space".
 *
 * ## Reach, state and disabled
 *
 * Every tile clears the 44 floor through {@link minTap} (`spacing['2xl'] -
 * spacing.xs`, composed rather than typed). Press is the **state layer** over
 * the tile's own opaque `card`/`onCard` pair — the base carried
 * `opacity: pressed ? 0.8 : 1`, which fades the tile's *content*, which is the
 * signal M3 spends `0.38` on to mean **disabled**, so a pressed tile and a
 * dead tile looked alike. `disabled` now takes that 0.38 from
 * `state.disabledContent` rather than the base's round-number `0.5`.
 *
 * ## Structure
 *
 * The grid is `GridV4`, so `columns` and the new `minItemWidth` are the
 * module's one answer to how many tracks fit rather than the base's
 * `flexBasis: ${Math.floor(100 / columns) - 2}%` — a magic percentage §5 calls
 * out by name in the neighbouring `KpiRow`.
 *
 * `actions: []` renders **nothing** (§4.5). A launcher with nothing to launch
 * is not a heading over a blank box.
 */
export function QuickActionsV4({
  actions,
  title,
  columns = 3,
  minItemWidth,
  style,
}: QuickActionsV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens, state, elevation } = theme;

  // §4.5 — nothing to launch, nothing to draw. Not even the heading: a title
  // over a blank box is the bordered-empty-box §4.5 rules out, with a label.
  if (actions.length === 0) return null;

  // The HIG floor, composed from the spacing scale rather than typed as 44.
  const tapFloor = minTap(tokens.spacing);
  const pressedGround = pressOver(theme, colors.card, colors.onCard);

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      {title ? (
        <TextV4 size="lg" weight="bold" tone="onSurface">
          {title}
        </TextV4>
      ) : null}

      <GridV4 columns={columns} gap="md" minItemWidth={minItemWidth}>
        {actions.map((action) => {
          const glyph = typeof action.icon === 'string' ? action.icon : undefined;
          const badged = glyph !== undefined || action.iconName !== undefined;
          return (
            <Pressable
              key={action.key}
              accessibilityRole="button"
              accessibilityLabel={action.label}
              accessibilityState={{ disabled: !!action.disabled }}
              disabled={action.disabled}
              onPress={action.onPress}
              style={({ pressed }) => [
                {
                  minHeight: tapFloor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: tokens.spacing.sm,
                  padding: tokens.spacing.md,
                  borderRadius: tokens.radius.lg,
                  backgroundColor: pressed ? pressedGround : colors.card,
                  // M3 disables CONTENT at 0.38 — the token, not a round number.
                  opacity: action.disabled ? state.disabledContent : 1,
                },
                elevationStyle(elevation.card),
              ]}
            >
              {badged ? (
                <IconV4
                  glyph={glyph}
                  name={action.iconName}
                  badge="soft"
                  color={action.tone ?? 'primary'}
                />
              ) : action.icon ? (
                <View>{action.icon}</View>
              ) : null}
              <TextV4 size="sm" weight="semibold" tone="onCard" numberOfLines={1}>
                {action.label}
              </TextV4>
            </Pressable>
          );
        })}
      </GridV4>
    </View>
  );
}

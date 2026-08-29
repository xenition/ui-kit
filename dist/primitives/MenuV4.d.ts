import * as React from 'react';
import type { MenuItem, MenuProps } from './Menu';
export type { MenuProps as MenuV4Props, MenuItem };
/**
 * **V4 menu** — the web twin of the native `MenuV4`, same props as
 * {@link Menu}, a different design line.
 *
 * ## What the depth is saying
 *
 * A menu is above the page and nothing is above it, so it takes
 * `--xen-elevation-sheet` — the same altitude as `ModalV4` and
 * `BottomSheetV4`, because a menu and a sheet are the same kind of object at
 * different sizes and a kit where they drift apart has two depth systems. The
 * base used Tailwind's `shadow-lg`, a fixed shadow that cannot know a dark page
 * needs MORE opacity, not less. The rows inside stay flat; §8's "cards inside
 * cards inside cards" is exactly what a menu becomes when every item gains its
 * own surface.
 *
 * Glass applies only when the seed asked for `depth: 'glass'`. Elevation is
 * consumed unconditionally, so a `depth: 'flat'` seed gets a flat menu with no
 * branch in this file — the compiler already zeroed the token.
 *
 * ## Reading the list
 *
 * Rows are `on-surface`, and the destructive one is `danger-text` — the
 * compiler's contrast-corrected red, not the `danger` FILL slot the base used
 * as text. That makes the destructive item **the only coloured thing in the
 * menu**, so it is unmistakable because it is different rather than because it
 * shouts (§32), and §25's friction-proportional-to-risk is paid in attention
 * rather than in an extra click.
 *
 * The hover ground is mixed from `--xen-border` instead of `bg-neutral-100`,
 * so it is a hairline's worth of contrast in both schemes rather than a fixed
 * grey that happens to invert. Every row is a 44px target composed from the
 * spacing scale.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. This mirrors the native twin,
 * where wrapping the trigger was an outright bug: on RN the deepest
 * `Pressable` wins the touch responder, so a `<Button>` trigger swallowed the
 * tap and the menu never opened. The DOM bubbles clicks, so a wrapping
 * `<span onClick>` did fire here — but it made `disabled` a lie in the other
 * direction, opening the menu from a control the user was told was dead.
 * Cloning the element and injecting `onClick` gives both platforms one rule:
 * the trigger is the only thing that handles the press, so whatever it says
 * about being disabled is what happens. A non-element trigger (a bare string)
 * has nothing to clone onto, so it keeps the transparent `<span>`.
 */
export declare function MenuV4({ trigger, items, align }: MenuProps): React.ReactElement;
//# sourceMappingURL=MenuV4.d.ts.map
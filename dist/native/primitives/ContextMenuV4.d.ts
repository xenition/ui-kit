import * as React from 'react';
import type { ContextMenuAction, ContextMenuProps } from './ContextMenu';
export type { ContextMenuProps as ContextMenuV4Props, ContextMenuAction };
/**
 * `ContextMenu`, V4 — the same props, and a long press that actually reaches
 * the thing you pressed.
 *
 * ## The child is the target
 *
 * This is the one behavioural change, and it is the same fix `Popconfirm` and
 * `Menu` already carry. On native the deepest `Pressable` under the finger wins
 * the touch responder whether or not it has a handler of its own, so the base's
 * wrapping `<Pressable onLongPress>` only ever worked while its child was
 * inert. Long-press a row that happens to be a kit `<Button>`, a `ListRow`, a
 * `Card` with an `onPress` — anything pressable, which is most of what people
 * attach a context menu to — and the child claims the responder, the wrapper
 * never fires, and the menu never opens.
 *
 * So V4 clones the child and injects `onLongPress` into it: one pressable
 * instead of two nested ones, so there is no responder to lose. A `disabled`
 * child stays disabled, because the press dies in its own `Pressable`, which is
 * what `disabled` means. Anything the child already did on long press runs
 * first. A child that cannot take the prop — a bare string, a plain `<View>` —
 * has nothing to clone onto and nothing that could steal the responder either,
 * so it keeps the wrapper it has always had.
 *
 * ## What the depth is saying
 *
 * The action list is a floating layer, so it takes `elevation.sheet` and the
 * shared `panelSkin` — the same altitude and glass rule as `MenuV4`, `ModalV4`
 * and `DrawerV4`, because all four are one kind of object at four sizes. The
 * rows inside are flat; §8's "cards inside cards inside cards" is what a menu
 * becomes when every item gains a surface.
 *
 * The scrim is the shadow colour at a fixed alpha. The base painted
 * `colors.onSurface` at 0.5, which INVERTS with the scheme and lays a white
 * veil over a dark page.
 *
 * ## Reading the list
 *
 * The destructive row is `dangerText` — the compiler's contrast-corrected red,
 * not the `danger` FILL slot the base used as text, which carries no promise
 * when it is ink. That makes it the **only** coloured thing in the menu, so it
 * is unmistakable because it is different rather than because it shouts (§32).
 *
 * Every row clears 44pt, composed from the spacing scale. Press feedback is the
 * M3 state layer at `state.pressed` rather than a fill of `colors.border` — a
 * hairline colour used as a surface. A disabled row drops to M3's 0.38 rather
 * than each component's own 0.5.
 */
export declare function ContextMenuV4({ actions, children, accessibilityLabel, }: ContextMenuProps): React.ReactElement;
//# sourceMappingURL=ContextMenuV4.d.ts.map
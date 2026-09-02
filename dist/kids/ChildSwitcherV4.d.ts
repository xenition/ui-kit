import * as React from 'react';
import type { ChildMood } from './ChildProfileCard';
/** One child in the switcher. */
export interface ChildSwitcherItem {
    /** React key and the identity handed back to `onSelect`. */
    id: string | number;
    /** The child's name, shown under the avatar and spoken as the button's name. */
    name: string;
    /** Photo URL for the avatar; falls back to initials. */
    photoUrl?: string;
    /** Today's mood, drawn as a glyph beside the name. */
    mood?: ChildMood;
}
export interface ChildSwitcherV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** The children to switch between. */
    items: ChildSwitcherItem[];
    /** Which one is currently being looked at. */
    selectedId?: string | number;
    /** Fires with the chosen child's `id`. */
    onSelect?: (id: string | number) => void;
    /** The strip's spoken name. Default `'Children'`. */
    label?: string;
    /** Loading placeholder state. */
    loading?: boolean;
    /** How many placeholder tiles a loading strip draws. Default 3. */
    skeletonCount?: number;
    /** The loading placeholder's spoken name. Default `'Loading children'`. */
    loadingLabel?: string;
    /** Headline when no children are set up. Default `'No children yet'`. */
    emptyLabel?: string;
    /** A sentence under the headline — an empty family needs a next step. */
    emptyDescription?: string;
    /** The "add a child" action's name. Rendered only with `onAdd`. */
    addLabel?: string;
    /** Fires when the add action is pressed. */
    onAdd?: () => void;
    /** The word appended to the selected child's spoken name. Default `'selected'`. */
    selectedLabel?: string;
}
/**
 * **V4 child switcher** — new in V4; there is no base component.
 *
 * ## Three changes
 *
 * 1. **A family app can say which child it is talking about.** Every component
 *    in this module takes exactly one child, and nothing in it picks that
 *    child — so the first control on every screen in a family app was one the
 *    kit did not ship, and each app drew its own.
 * 2. **The selection is `aria-current`, not a colour.** A tint on the chosen
 *    tile is invisible to a screen reader and to a colour-blind parent; the
 *    selected tile carries the state in its name as well, through
 *    `selectedLabel`.
 * 3. **Each tile is a real, 44-clearing `<button>`** with the child's name,
 *    and press is the M3 state layer rather than an opacity — 0.38 is the band
 *    M3 spends on *disabled*, so a pressed tile would read as one that cannot
 *    be chosen.
 */
export declare const ChildSwitcherV4: React.ForwardRefExoticComponent<ChildSwitcherV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChildSwitcherV4.d.ts.map
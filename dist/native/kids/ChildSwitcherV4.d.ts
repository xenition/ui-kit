import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { ChildMood } from './ChildProfileCard';
/** One child in the switcher. */
export interface ChildSwitcherItem {
    /** Stable identity, handed back to {@link ChildSwitcherV4Props.onSelect}. */
    id: string | number;
    /** The child's name — shown under the photo and spoken. */
    name: string;
    /** Photo URL; falls back to initials. */
    photoUrl?: string;
    /** Today's mood, as a glyph and a word. Never a colour. */
    mood?: ChildMood;
}
export interface ChildSwitcherV4Props {
    /** The children to switch between. `[]` is a real empty state. */
    items: ChildSwitcherItem[];
    /** Which child is showing. */
    selectedId?: string | number;
    /** Fires with the chosen child's `id`. */
    onSelect?: (id: string | number) => void;
    /** The strip's spoken name. Default `'Children'`. */
    label?: string;
    /** Draw placeholders in the shape the strip is about to be. */
    loading?: boolean;
    /** How many placeholders `loading` draws. Default `3`. */
    skeletonCount?: number;
    /** The loading region's spoken name. Default `'Loading children'`. */
    loadingLabel?: string;
    /** Headline of the empty state. Default `'No children yet'`. */
    emptyLabel?: string;
    /** The next step, under {@link ChildSwitcherV4Props.emptyLabel}. */
    emptyDescription?: string;
    /** The add control's name. Rendered only with `onAdd`. Default `'Add child'`. */
    addLabel?: string;
    /** Fires when the add control is pressed. */
    onAdd?: () => void;
    /** Appended to the selected child's spoken name. Default `'selected'`. */
    selectedLabel?: string;
    /** Layout override — margins and width, never colour. */
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 child switcher** — new in V4; there is no base component.
 *
 * ## Three changes
 *
 * 1. **A family app can finally say *which* child.** Every one of the twelve
 *    `kids` components takes exactly one child — one profile, one allowance,
 *    one growth curve — and nothing in the module chose between them, so the
 *    first control on a family screen did not exist and every app had to invent
 *    it. This is that control: one horizontal strip, one selected child, and
 *    an optional way to add another.
 * 2. **It is a real tab list, not a row of coloured chips.** Each child is a
 *    `tab` carrying `selected` state and their own name inside a `tablist`, so
 *    a reader is told which child is showing rather than being left to infer it
 *    from a tint. Selection is the `selected`/`onSelected` token pair, a ring,
 *    a bold name **and** the word `selectedLabel` — never the hue on its own.
 * 3. **The targets fit a child's thumb.** Every tile clears 44 on both axes and
 *    presses with a state layer over its own ground, so a pressed tile does not
 *    dim into M3's *disabled* band the way the rest of this module does.
 *
 * Mood rides along as a glyph and a word from the module's one mood table, so
 * the switcher and `ChildProfileCardV4` cannot disagree about what `sick`
 * looks like — and, as everywhere else here, a mood is never a tone.
 *
 * **Renders an empty state, never a blank strip** (§4.5).
 */
export declare function ChildSwitcherV4({ items, selectedId, onSelect, label, loading, skeletonCount, loadingLabel, emptyLabel, emptyDescription, addLabel, onAdd, selectedLabel, style, }: ChildSwitcherV4Props): React.ReactElement;
//# sourceMappingURL=ChildSwitcherV4.d.ts.map
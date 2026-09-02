import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ChoreCardV4Props } from './ChoreCardV4';
/**
 * One chore in the list.
 *
 * Everything {@link ChoreCardV4} takes except the three things the *list* owns:
 * `loading` is a state of the whole list, and `onPress` / `onComplete` are
 * routed through {@link ChoreListV4Props.onSelectItem} and
 * {@link ChoreListV4Props.onCompleteItem}, so a caller writes one handler
 * rather than one per row.
 */
export interface ChoreListItem extends Omit<ChoreCardV4Props, 'loading' | 'onPress' | 'onComplete' | 'id'> {
    /** React key, and the identity handed back to the list's callbacks. */
    id?: string | number;
}
export interface ChoreListV4Props {
    /** The chores to render. `[]` is a real empty state, not a blank region. */
    items: ChoreListItem[];
    /** Draw placeholder cards in the shape the list is about to be. */
    loading?: boolean;
    /** How many placeholder cards `loading` draws. Default `3`. */
    skeletonCount?: number;
    /** The loading region's spoken name. Default `'Loading chores'`. */
    loadingLabel?: string;
    /** Headline of the empty state. Default `'No chores yet'`. */
    emptyLabel?: string;
    /** The next step, under {@link ChoreListV4Props.emptyLabel}. */
    emptyDescription?: string;
    /** The list's spoken name. Default `'3 chores'`. */
    formatCount?: (count: number) => string;
    /** A chore's body was pressed. */
    onSelectItem?: (id: string | number, index: number) => void;
    /** A chore's completion action was pressed. */
    onCompleteItem?: (id: string | number, index: number) => void;
    /** Layout override — margins and width, never colour. */
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 chore list** — new in V4; there is no base component.
 *
 * ## Three changes
 *
 * 1. **A chore screen with no chores says so.** `kids` shipped twelve
 *    components and no list container, so every screen that rendered chores
 *    mapped an array straight to `ChoreCard` — and an empty array rendered
 *    **nothing at all**: a blank region with no explanation and no next step,
 *    which reads as a broken screen rather than as a fresh start.
 * 2. **Loading is a shape, not a spinner.** `loading` lived on the card, so the
 *    only way to show a *list* loading was to invent a placeholder array at
 *    every call site — and nobody did. The list draws ghost cards in the shape
 *    the real ones are about to take, so the layout does not jump when the data
 *    lands, and the region says what it is waiting for.
 * 3. **The list is a region a reader can recognise**, with the `list` role and
 *    a count — and deliberately no `accessible` of its own, which would flatten
 *    every card under it into a single leaf. That is the same flattening the
 *    sibling rule exists to prevent inside a card, one level up.
 *
 * Deliberately a plain `View` rather than a `FlatList`: a chore list is short
 * and nearly always sits inside a screen's own `ScrollView`, where a nested
 * virtualised list is a known scrolling defect.
 */
export declare function ChoreListV4({ items, loading, skeletonCount, loadingLabel, emptyLabel, emptyDescription, formatCount, onSelectItem, onCompleteItem, style, }: ChoreListV4Props): React.ReactElement;
//# sourceMappingURL=ChoreListV4.d.ts.map
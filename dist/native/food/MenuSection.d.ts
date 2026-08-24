import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface MenuSectionProps {
    /** Section heading (e.g. "Starters", "Mains"). */
    title: string;
    /** Optional supporting line under the heading. */
    description?: string;
    /** Right-aligned slot next to the title (e.g. item count, a chip). */
    aside?: React.ReactNode;
    /** Section body — typically a list of `DishCard`s. */
    children?: React.ReactNode;
    /** Message shown when the section has no items (default `No items yet`). */
    emptyLabel?: string;
    /** Slot rendered instead of `emptyLabel` when empty (illustration/action). */
    emptyState?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * A titled group of menu items — heading, optional description and `aside`
 * slot, then its `children` (usually `DishCard`s) stacked with token spacing.
 * When it has no children it renders a muted empty message (or a custom
 * `emptyState`) so an empty category still reads clearly. Token-only.
 */
export declare function MenuSection({ title, description, aside, children, emptyLabel, emptyState, style, }: MenuSectionProps): React.ReactElement;
//# sourceMappingURL=MenuSection.d.ts.map
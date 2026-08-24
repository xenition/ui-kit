import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Priority of a shot-list entry. */
export type ShotPriority = 'must' | 'nice' | 'optional';
export interface ShotListItemProps {
    /** The shot description (e.g. "Bride & groom first look"). */
    title: string;
    /** Notes / setup line (pose, lens, lighting). */
    notes?: string;
    /** Whether the shot has been captured. */
    done?: boolean;
    /** Priority tag (shown as a labelled badge). */
    priority?: ShotPriority;
    /** Toggles the captured state when the row is pressed. */
    onToggle?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A shot-list checklist row — a check affordance, the shot title (struck when
 * `done`), an optional notes line, and a priority `Badge`. The whole row is a
 * `checkbox` when `onToggle` is provided: its captured state is announced via
 * the accessibility `checked` state and a ✓ glyph, never color alone. Composes
 * `Icon` and `Badge`. Token-only colors.
 */
export declare function ShotListItem({ title, notes, done, priority, onToggle, style, }: ShotListItemProps): React.ReactElement;
//# sourceMappingURL=ShotListItem.d.ts.map
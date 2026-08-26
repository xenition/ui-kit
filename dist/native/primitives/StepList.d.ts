import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface StepListItem {
    /** Stable key for list rendering. Falls back to the index. */
    id?: string;
    /** The instruction headline — `'Sear the onions'`. */
    title: React.ReactNode;
    /**
     * The instruction itself — the paragraph the number is numbering. This is
     * the half `Steps` has nowhere to put; here it is the point of the component.
     */
    description?: React.ReactNode;
    /**
     * Force this step complete regardless of `current`. For checklists that are
     * not strictly linear (a setup guide where two boxes are already ticked).
     */
    done?: boolean;
}
export interface StepListProps {
    steps: StepListItem[];
    /**
     * Zero-based index of the step in progress; everything before it reads as
     * done. Omit entirely for a plain numbered instruction list with no state —
     * a recipe method is not a wizard.
     */
    current?: number;
    /** Fires with the index when a step is pressed. Rows are inert without it. */
    onStepPress?: (index: number) => void;
    /** Draw the rail joining the markers. Default `true`. */
    connector?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Vertical, content-bearing instruction list — a recipe method, an onboarding
 * checklist body, a setup guide. Numbered markers down the left, joined by a
 * rail, each carrying a title and as much body copy as the step needs.
 *
 * **Not to be confused with its sibling {@link Steps}, and the difference is
 * the whole reason this exists.** `Steps` is a *progress indicator*: one
 * `flex: 1` marker per step laid out horizontally, correct for a 3-step
 * checkout where the titles are one word each. Hand it eight recipe steps and
 * every title collapses to nothing — a real app hit exactly that and ended up
 * rendering its method as `ListRow`s beside a title-less `Steps`.
 *
 * So: **`Steps` for "where am I in this flow", `StepList` for "here are the
 * instructions".** `StepList` grows downward, so it reads the same at eight
 * items as at three, and it is the only one of the two with room for a body.
 *
 * Every color, size and space comes from the compiled tokens. No literal
 * colors.
 */
export declare function StepList({ steps, current, onStepPress, connector, style, }: StepListProps): React.ReactElement;
//# sourceMappingURL=StepList.d.ts.map
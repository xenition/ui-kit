import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { Job } from './types';
import { type ApplyButtonProps } from './ApplyButton';
export interface JobCardProps {
    /** The posting to render. */
    job: Job;
    /** Bookmark state; when set, a save toggle is shown. */
    saved?: boolean;
    /** Fired when the save/bookmark toggle is pressed. */
    onSave?: (job: Job) => void;
    /** Apply CTA state; when set (or `onApply` given) the button renders. */
    applyState?: ApplyButtonProps['state'];
    /** Fired when the apply CTA is pressed. */
    onApply?: (job: Job) => void;
    /** Fired to withdraw when `applyState === 'applied'`. */
    onWithdraw?: (job: Job) => void;
    /** Whether the apply CTA shows a spinner. */
    applyLoading?: boolean;
    /** Fired when the card body is pressed (open detail). */
    onPress?: (job: Job) => void;
    /** Render a skeleton placeholder instead of content. */
    loading?: boolean;
    /** Cap the number of skill chips shown; the rest collapse to `+N`. */
    maxSkills?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * A job-posting card — the module's headline component. Variant-rich via the
 * job's `type` (`full-time` / `part-time` / `contract` / `remote`), each mapped
 * to a token `Badge` tone. Composes `Avatar` (company logo), `SalaryRange`,
 * `SkillTag`s, and an `ApplyButton`, plus an optional save/bookmark toggle.
 * Data + callbacks only; supports a `loading` skeleton. All colors are tokens.
 */
export declare function JobCard({ job, saved, onSave, applyState, onApply, onWithdraw, applyLoading, onPress, loading, maxSkills, style, }: JobCardProps): React.ReactElement;
//# sourceMappingURL=JobCard.d.ts.map
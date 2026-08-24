import * as React from 'react';
import { type AvatarSize } from '../primitives';
export interface Assignee {
    name?: string;
    src?: string;
}
export interface AssigneeGroupProps {
    /** People assigned; an empty array shows the unassigned state. */
    assignees: Assignee[];
    /** Max avatars before collapsing into +N (default 3). */
    max?: number;
    size?: AvatarSize;
    /** Copy for the empty (unassigned) state. */
    emptyLabel?: string;
    className?: string;
}
/**
 * Overlapping avatar stack of task assignees — a thin wrapper over the primitive
 * {@link AvatarGroup} that adds a muted "Unassigned" empty state and guards a
 * missing array. Web parity of the native `AssigneeGroup`. Colors come from the
 * theme tokens. No literal colors.
 */
export declare function AssigneeGroup({ assignees, max, size, emptyLabel, className, }: AssigneeGroupProps): React.ReactElement;
//# sourceMappingURL=AssigneeGroup.d.ts.map
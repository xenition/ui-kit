import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    style?: StyleProp<ViewStyle>;
}
/**
 * Overlapping avatar stack of task assignees — a thin wrapper over the primitive
 * {@link AvatarGroup} that adds a muted "Unassigned" empty state and guards a
 * missing array. Colors come from the theme tokens. No literal colors.
 */
export declare function AssigneeGroup({ assignees, max, size, emptyLabel, style, }: AssigneeGroupProps): React.ReactElement;
//# sourceMappingURL=AssigneeGroup.d.ts.map
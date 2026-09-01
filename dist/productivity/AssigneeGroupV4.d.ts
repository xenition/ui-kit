import * as React from 'react';
import type { AssigneeGroupProps } from './AssigneeGroup';
/** Drop-in for {@link AssigneeGroupProps} — same props, the V4 "flow" design. */
export type AssigneeGroupV4Props = AssigneeGroupProps;
/**
 * AssigneeGroup — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on assignees: an overlapping stack of **bigger, softly
 * rounded** avatars each carrying a surface ring so they read cleanly against the
 * workspace, capped by a **soft-primary "+N"** overflow chip. Preserves the base
 * `max` / overflow and the muted "Unassigned" empty state. Same props/behavior
 * as {@link AssigneeGroupProps}; all colors from `--xen-*` token classes (no
 * literals).
 */
export declare function AssigneeGroupV4({ assignees, max, size, emptyLabel, className, }: AssigneeGroupV4Props): React.ReactElement;
//# sourceMappingURL=AssigneeGroupV4.d.ts.map
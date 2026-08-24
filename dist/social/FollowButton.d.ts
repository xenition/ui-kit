import * as React from 'react';
import { type ButtonSize } from '../primitives/Button';
export type FollowState = 'follow' | 'following' | 'requested';
export interface FollowButtonProps {
    /** Relationship state driving the label + variant. */
    state?: FollowState;
    size?: ButtonSize;
    /** Block clicks and show a spinner (optimistic toggle in flight). */
    loading?: boolean;
    disabled?: boolean;
    /** Fires with the *current* state so the caller can compute the next one. */
    onClick?: (state: FollowState) => void;
    /** Override the three default labels. */
    labels?: Partial<Record<FollowState, string>>;
    className?: string;
}
/**
 * Follow / Following / Requested toggle built on the primitive `Button`. The
 * three states cover public follow, an already-following relationship, and a
 * pending request to a private account. Stateless — the parent owns `state`
 * and flips it in `onClick`. Web parity of the native `FollowButton`; token-only
 * via `Button`. `aria-pressed` marks the connected/pending states.
 */
export declare const FollowButton: React.ForwardRefExoticComponent<FollowButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=FollowButton.d.ts.map
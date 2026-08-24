import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ButtonSize } from '../primitives/Button';
export type FollowState = 'follow' | 'following' | 'requested';
export interface FollowButtonProps {
    /** Relationship state driving the label + variant. */
    state?: FollowState;
    size?: ButtonSize;
    /** Block presses and show a spinner (optimistic toggle in flight). */
    loading?: boolean;
    disabled?: boolean;
    /** Fires with the *current* state so the caller can compute the next one. */
    onPress?: (state: FollowState) => void;
    /** Override the three default labels. */
    labels?: Partial<Record<FollowState, string>>;
    style?: StyleProp<ViewStyle>;
}
/**
 * Follow / Following / Requested toggle built on the primitive `Button`. The
 * three states cover public follow, an already-following relationship, and a
 * pending request to a private account. Stateless — the parent owns `state`
 * and flips it in `onPress`. Token-only via `Button`.
 */
export declare function FollowButton({ state, size, loading, disabled, onPress, labels, style, }: FollowButtonProps): React.ReactElement;
//# sourceMappingURL=FollowButton.d.ts.map
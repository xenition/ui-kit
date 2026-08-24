import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** State of a smart lock. */
export type LockState = 'locked' | 'unlocked' | 'jammed' | 'offline';
export interface LockControlProps {
    /** Lock display name (e.g. "Front Door"). */
    name: string;
    /** Current lock state. */
    state?: LockState;
    /** Battery percentage 0–100. Shows a low-battery hint under 20%. */
    batteryPct?: number;
    /** Fires with the requested locked value when the action button is pressed. */
    onToggle?: (next: boolean) => void;
    /** Show a spinner and block the action (command in flight). */
    busy?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Smart-lock control — a state glyph + a status {@link Badge} over a single
 * lock/unlock {@link Button}. `state` selects the accent slot and a text label
 * (`locked`→success, `unlocked`→warn, `jammed`→danger, `offline`→muted) so the
 * status reads without color; the action button flips between "Lock"/"Unlock",
 * is danger-toned when unlocking, and is disabled when `offline`/`jammed` or
 * `busy` (which also shows a spinner). Optional `batteryPct` surfaces a low
 * hint under 20%. No literal colors.
 */
export declare function LockControl({ name, state, batteryPct, onToggle, busy, style, }: LockControlProps): React.ReactElement;
//# sourceMappingURL=LockControl.d.ts.map
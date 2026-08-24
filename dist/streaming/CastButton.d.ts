import * as React from 'react';
export type CastButtonVariant = 'icon' | 'labeled';
export type CastButtonSize = 'sm' | 'md' | 'lg';
export interface CastButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
    /** Whether a cast/AirPlay target is currently connected (controlled). */
    connected?: boolean;
    /** Name of the connected device, shown in the `labeled` variant. */
    deviceName?: string;
    /**
     * - `icon`    — a single clickable cast glyph (default).
     * - `labeled` — glyph + "Cast" / device-name text.
     */
    variant?: CastButtonVariant;
    size?: CastButtonSize;
}
/**
 * A cast / AirPlay toggle (web) — a `<button>` shell that reports clicks via
 * `onClick` and reflects the current `connected` state in its color and
 * accessible label ("Cast to a device" vs. "Casting to <device>. Disconnect").
 * No native cast dependency; wire an app's cast framework to `onClick`.
 * Token-only: the active (connected) tint is `primary`, idle is `on-surface`.
 */
export declare const CastButton: React.ForwardRefExoticComponent<CastButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=CastButton.d.ts.map
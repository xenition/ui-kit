import * as React from 'react';
/** Presentation density for a {@link DriverCard}. */
export type DriverCardVariant = 'default' | 'compact' | 'assigned';
export interface DriverCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Driver display name. */
    name: string;
    /** Optional driver avatar URL. */
    avatarUrl?: string;
    /** Driver star rating (0–5). */
    rating?: number;
    /** Number of completed trips. */
    tripCount?: number;
    /** Vehicle description, e.g. `'Toyota Prius · White'`. */
    vehicle?: string;
    /** License plate, shown as a token-chip. */
    plate?: string;
    /** ETA to pickup, pre-formatted (e.g. `'4 min'`). */
    etaLabel?: string;
    /** Whether the driver is currently online/available. */
    online?: boolean;
    /** Presentation variant. `assigned` foregrounds the ETA. */
    variant?: DriverCardVariant;
    /** Fires when the message action is pressed. */
    onMessage?: () => void;
    /** Fires when the call action is pressed. */
    onCall?: () => void;
    /** Fires when the whole card is pressed (profile). */
    onClick?: () => void;
    /** Placeholder skeleton while the driver loads. */
    loading?: boolean;
}
/**
 * A driver identity block — avatar, name, star rating, trip count, the assigned
 * vehicle and plate, an online/offline state, and an optional ETA. Availability
 * is conveyed by a text-labelled badge (not color alone). Data +
 * `onMessage`/`onCall`/`onClick` callbacks only; nothing fetches. Colors come
 * from `--xen-*` token classes — no literal colors. When `onClick` is set the
 * card becomes a keyboard-operable `role="button"`; the nested actions are real
 * buttons that stop propagation. `variant="assigned"` highlights the ETA;
 * `variant="compact"` tightens it. Web parity of the native `DriverCard`.
 */
export declare const DriverCard: React.ForwardRefExoticComponent<DriverCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DriverCard.d.ts.map
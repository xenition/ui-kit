import * as React from 'react';
import type { IconColor } from '../primitives/Icon';
/** Connection health of the network. */
export type NetworkStatus = 'connected' | 'congested' | 'disconnected';
export type NetworkBadgeSize = 'sm' | 'md';
export interface NetworkBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Chain / network name (e.g. `Ethereum`, `Polygon`, `Arbitrum`). */
    name: string;
    /**
     * Connection health. Drives the health-dot color AND a text label so the
     * status is never conveyed by color alone.
     */
    status?: NetworkStatus;
    /**
     * Accent slot for the identity dot (default `primary`). Independent of
     * `status`, which only colors the health indicator.
     */
    tone?: IconColor;
    /** Leading glyph/emoji for the chain (e.g. `'⟠'`). */
    glyph?: string;
    size?: NetworkBadgeSize;
}
/**
 * Compact chain identifier pill — a dot (accented by `tone`) or leading glyph
 * plus the network name, and, when `status` is set, a second health dot with a
 * text label so the connection state is read, not just colored. Token-bound
 * throughout; no literal colors. Web parity of the native `NetworkBadge`.
 */
export declare const NetworkBadge: React.ForwardRefExoticComponent<NetworkBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=NetworkBadge.d.ts.map
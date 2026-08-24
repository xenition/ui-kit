import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
/** Connection health of the network. */
export type NetworkStatus = 'connected' | 'congested' | 'disconnected';
export type NetworkBadgeSize = 'sm' | 'md';
export interface NetworkBadgeProps {
    /** Chain / network name (e.g. `Ethereum`, `Polygon`, `Arbitrum`). */
    name: string;
    /**
     * Connection health. Drives the dot color AND a text/label hint so the
     * status is never conveyed by color alone.
     */
    status?: NetworkStatus;
    /**
     * Accent slot for the identity dot (default `primary`). Independent of
     * `status`, which only colors the health indicator.
     */
    tone?: keyof SemanticColors;
    /** Leading glyph/emoji for the chain (e.g. `'⟠'`). */
    glyph?: string;
    size?: NetworkBadgeSize;
    style?: StyleProp<ViewStyle>;
}
/**
 * Compact chain identifier pill — a dot (accented by `tone`) plus the network
 * name, and, when `status` is set, a second health dot with an accessible
 * label so the connection state is announced, not just colored. Token-bound;
 * the accent dot uses a subtle ramp-tinted background. No literal colors.
 */
export declare function NetworkBadge({ name, status, tone, glyph, size, style, }: NetworkBadgeProps): React.ReactElement;
//# sourceMappingURL=NetworkBadge.d.ts.map
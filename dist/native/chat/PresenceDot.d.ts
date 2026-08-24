import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Presence states a user can be in. */
export type Presence = 'online' | 'away' | 'busy' | 'offline';
export interface PresenceDotProps {
    /** Current presence state (default `offline`). */
    status?: Presence;
    /** Dot diameter in px (default 10). */
    size?: number;
    /**
     * Draw a contrasting ring around the dot so it reads when overlaid on an
     * avatar (default true).
     */
    ring?: boolean;
    /**
     * Accessible name. When omitted a sensible default is derived from `status`
     * (e.g. "Online"). Pass an empty string to make it decorative.
     */
    label?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Small presence indicator for avatars and headers. Online pulses (reusing the
 * primitive `StatusDot` echo); the other states render a solid token-colored
 * dot. A `ring` in the surface color separates it from a busy avatar. No literal
 * colors — every color traces to a semantic token.
 */
export declare function PresenceDot({ status, size, ring, label, style, }: PresenceDotProps): React.ReactElement;
//# sourceMappingURL=PresenceDot.d.ts.map
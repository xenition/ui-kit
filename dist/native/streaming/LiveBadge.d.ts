import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type LiveBadgeVariant = 'solid' | 'outline' | 'dot';
export interface LiveBadgeProps {
    /**
     * - `solid`   — filled `danger` pill with white-on-danger text (default).
     * - `outline` — `danger` border + text on a transparent surface.
     * - `dot`     — just the pulsing dot + label, no pill chrome.
     */
    variant?: LiveBadgeVariant;
    /** Label text (default `'LIVE'`). */
    label?: string;
    /** Optional concurrent viewer count, appended after the label when set. */
    viewers?: number;
    /** Announced label; defaults to the visible text + viewers. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A "LIVE" indicator for streams — a `danger`-toned pill with a leading dot.
 * Three variants (`solid` / `outline` / `dot`) and an optional viewer count.
 * Presentational only; every color resolves from `SemanticColors` (`danger` /
 * `onDanger` / `muted`) — no literal hex.
 */
export declare function LiveBadge({ variant, label, viewers, accessibilityLabel, style, }: LiveBadgeProps): React.ReactElement;
//# sourceMappingURL=LiveBadge.d.ts.map
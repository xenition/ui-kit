import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface PrecipSlot {
    /** Period label (e.g. `'9a'`, `'Mon'`). */
    label: string;
    /** Chance of precipitation, 0–100. */
    chance: number;
    /** Optional accumulation caption (e.g. `'0.2"'`). */
    amount?: string;
}
export interface PrecipBarProps {
    /** Per-period precipitation chances, rendered as a bar column each. */
    slots: PrecipSlot[];
    /** Bar column height in px. Default `96`. */
    height?: number;
    /** Show the numeric % above each bar. Default `false`. */
    showValues?: boolean;
    /** Message shown when `slots` is empty. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Precipitation-probability bars: one token-filled column per period, its height
 * proportional to the chance (0–100). The fill uses a `primary` token tint plus
 * a droplet glyph header, so the metric reads without color alone. Values are
 * guarded/clamped to 0–100. Renders a muted empty state when `slots` is empty.
 * All colors/sizes come from the compiled theme tokens via `useXenitionTheme()`
 * — no literal colors, no chart deps.
 */
export declare function PrecipBar({ slots, height, showValues, emptyLabel, style, }: PrecipBarProps): React.ReactElement;
//# sourceMappingURL=PrecipBar.d.ts.map
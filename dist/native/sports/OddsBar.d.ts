import * as React from 'react';
import { type ViewStyle } from 'react-native';
/** The three outcomes an {@link OddsBar} splits across. */
export type OddsPick = 'home' | 'draw' | 'away';
export interface OddsBarProps {
    /** Home-win odds as a **decimal price** (e.g. `1.85`). Lower = more likely. */
    home: number;
    /** Draw odds as a **decimal price** (e.g. `3.40`). Lower = more likely. */
    draw: number;
    /** Away-win odds as a **decimal price** (e.g. `4.20`). Lower = more likely. */
    away: number;
    /** Caption under the home price. Default `"Home"`. */
    homeLabel?: string;
    /** Caption under the draw price. Default `"Draw"`. */
    drawLabel?: string;
    /** Caption under the away price. Default `"Away"`. */
    awayLabel?: string;
    /**
     * Optional select handler; receives the chosen outcome. When supplied each
     * segment becomes a ≥44px pressable button; when omitted the bar is
     * presentational.
     */
    onSelect?: (pick: OddsPick) => void;
    /** The currently selected outcome, highlighted in primary. */
    selected?: OddsPick;
    /** Optional style override merged onto the bar container. */
    style?: ViewStyle;
}
/**
 * OddsBar — **V4** "broadcast" design. A three-segment odds split (home / draw /
 * away) as an elevated, evenly-divided bar. Each segment stacks a big price
 * numeral over a caption. Odds are **decimal prices**, so the **favourite is the
 * lowest price**: it is emphasized in the single `primary` accent. A `selected`
 * pick is filled in primary; when `onSelect` is given each segment is an
 * accessible ≥44px button reflecting its pressed state. Token-only colors via
 * `useXenitionTheme()`; dark-mode safe.
 */
export declare function OddsBar({ home, draw, away, homeLabel, drawLabel, awayLabel, onSelect, selected, style, }: OddsBarProps): React.ReactElement;
//# sourceMappingURL=OddsBar.d.ts.map
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** A player token placed on the pitch by fractional coordinates. */
export interface LineupPlayer {
    /** Stable key / player id. */
    id: string;
    /** Short name / surname shown under the token. */
    name: string;
    /** Shirt number shown inside the token. */
    number?: number;
    /** Left position, 0–1 of pitch width. */
    x: number;
    /** Top position, 0–1 of pitch height. */
    y: number;
    /** Side — tints the token from the primary (home) / accent (away) slot. */
    side?: 'home' | 'away';
}
export interface LineupFieldProps {
    /** Player tokens to place. Empty renders a labelled placeholder pitch. */
    players?: LineupPlayer[];
    /** Formation caption (e.g. `4-3-3`). */
    formation?: string;
    /** Pitch height in px. Default 320. */
    height?: number;
    /** Fires with the tapped player. */
    onSelectPlayer?: (player: LineupPlayer) => void;
    /** Empty-state label. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A starting-XI pitch — a STATIC, dependency-free placeholder built entirely
 * from styled `View`s: a token-bordered field with a halfway line + center
 * circle, and player tokens positioned by fractional (x, y) coordinates. No
 * image / SVG / native dependency; it renders anywhere. Home/away tint from the
 * primary/accent slots, reinforced by the shirt number + name label so a token
 * is identifiable without color. Empty `players` shows a labelled empty pitch.
 * Token-only colors.
 */
export declare function LineupField({ players, formation, height, onSelectPlayer, emptyLabel, style, }: LineupFieldProps): React.ReactElement;
//# sourceMappingURL=LineupField.d.ts.map
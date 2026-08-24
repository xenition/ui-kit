import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Herd / flock health — colors the count and pairs with a text chip. */
export type LivestockHealth = 'healthy' | 'monitor' | 'sick';
export interface LivestockRowProps {
    /** Species / group name (e.g. "Dairy Cows", "Layer Hens"). */
    species: string;
    /** Head count for the group. Guarded; shown as "—" when omitted. */
    count?: number;
    /** Leading glyph/emoji. Default `'🐄'`. */
    icon?: string;
    /** Pen / paddock / barn location (e.g. "Barn 2"). */
    location?: string;
    /** Herd health — colors the count and shows a text status chip. */
    health?: LivestockHealth;
    /** Optional secondary metric line (e.g. "avg 640 kg"). */
    detail?: string;
    /** Hide the bottom divider (last row in a list). */
    last?: boolean;
    /** Fires when the row is tapped. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A livestock group row — species glyph, name, head count (emphasized), and an
 * optional location, closed by a health {@link Badge}. Health colors the count
 * but is always paired with a text chip so an at-risk group reads without
 * color. `count` is guarded (renders "—" when absent). A hairline divider
 * separates rows unless `last`. Tappable via `onPress`. Token-bound throughout.
 */
export declare function LivestockRow({ species, count, icon, location, health, detail, last, onPress, style, }: LivestockRowProps): React.ReactElement;
//# sourceMappingURL=LivestockRow.d.ts.map
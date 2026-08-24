import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface Sticker {
    id?: string | number;
    /** The sticker emoji/glyph. */
    glyph: string;
    /** Optional caption under the sticker. */
    label?: string;
    /** Whether the child has earned/unlocked it. */
    earned?: boolean;
}
export interface StickerRewardProps {
    /** Stickers to display in the grid. */
    stickers: Sticker[];
    /** Section title. */
    title?: string;
    /** Columns in the grid. */
    columns?: number;
    /** Loading placeholder state. */
    loading?: boolean;
    /** Copy shown when there are no stickers. */
    emptyLabel?: string;
    /** Fires with the tapped sticker's index (e.g. to collect / redeem it). */
    onCollect?: (index: number) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A sticker-collection reward board: a grid of earned + locked stickers with an
 * earned/total summary. Locked stickers are dimmed and marked with a lock glyph
 * (state, not color alone). Tapping a sticker fires `onCollect(index)`. Renders
 * an explicit empty state. Token-only colors.
 */
export declare function StickerReward({ stickers, title, columns, loading, emptyLabel, onCollect, style, }: StickerRewardProps): React.ReactElement;
//# sourceMappingURL=StickerReward.d.ts.map
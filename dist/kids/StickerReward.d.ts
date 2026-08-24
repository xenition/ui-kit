import * as React from 'react';
export interface Sticker {
    id?: string | number;
    /** The sticker emoji/glyph. */
    glyph: string;
    /** Optional caption under the sticker. */
    label?: string;
    /** Whether the child has earned/unlocked it. */
    earned?: boolean;
}
export interface StickerRewardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
}
/**
 * A sticker-collection reward board: a grid of earned + locked stickers with an
 * earned/total summary. Locked stickers are dimmed and marked with a lock glyph
 * (state, not color alone). Tapping a sticker fires `onCollect(index)`. Renders
 * the shared {@link EmptyState} when there are none. Token-bound throughout — no
 * literal colors.
 */
export declare const StickerReward: React.ForwardRefExoticComponent<StickerRewardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StickerReward.d.ts.map
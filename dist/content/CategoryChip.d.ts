import * as React from 'react';
export type CategoryChipVariant = 'solid' | 'soft' | 'outline';
export interface CategoryChipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
    /** Category / section label. */
    label: string;
    /**
     * Visual weight:
     * - `solid`  — filled accent chip (default), for a hero/eyebrow.
     * - `soft`   — subtle surface chip with accent text.
     * - `outline`— bordered, transparent fill.
     */
    variant?: CategoryChipVariant;
    /** Makes the chip pressable (e.g. to open a section) — the web mirror of native `onPress`. */
    onClick?: () => void;
    /** Marks the chip as the active filter (adds an accent ring in `soft`/`outline`). */
    active?: boolean;
}
/**
 * A small category / section label for news & blog UIs — the "Technology",
 * "Opinion", "Sport" tag above a headline. Web (React DOM) mirror of the native
 * `CategoryChip`. Three token-bound variants (`solid`/`soft`/`outline`); an
 * optional `onClick` turns it into a section filter (rendered with
 * `role="button"` + keyboard activation). All colors from `--xen-*` tokens.
 */
export declare const CategoryChip: React.ForwardRefExoticComponent<CategoryChipProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=CategoryChip.d.ts.map
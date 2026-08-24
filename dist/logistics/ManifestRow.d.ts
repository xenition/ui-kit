import * as React from 'react';
export type ManifestState = 'pending' | 'checked' | 'missing';
export interface ManifestRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Line-item name / description (headline). */
    item: string;
    /** SKU / part number sub-line. */
    sku?: string;
    /** Ordered / expected quantity. */
    quantity?: number;
    /** Scanned / verified quantity so far. */
    scanned?: number;
    /** Verification state — glyph + word, never color alone. */
    state?: ManifestState;
    /** Fires with the next state when the check control is pressed. */
    onToggle?: (next: ManifestState) => void;
}
/**
 * A single manifest / checklist line for goods-in or load verification: item +
 * SKU, a `scanned / quantity` counter, and a clickable check control. State is
 * carried by a glyph + word (checkmark/cross/circle) and `aria-checked`, never
 * color alone. Pressing the control cycles pending → checked and fires
 * `onToggle`. All colors are theme tokens. Web parity of the native
 * `ManifestRow`.
 */
export declare const ManifestRow: React.ForwardRefExoticComponent<ManifestRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ManifestRow.d.ts.map
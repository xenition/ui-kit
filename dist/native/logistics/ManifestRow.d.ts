import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ManifestState = 'pending' | 'checked' | 'missing';
export interface ManifestRowProps {
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
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single manifest / checklist line for goods-in or load verification: item +
 * SKU, a `scanned / quantity` counter, and a tappable check control. State is
 * carried by a glyph + word (checkmark/cross/circle) and an
 * `accessibilityState.checked`, never color alone. Pressing the control cycles
 * pending → checked and fires `onToggle`. All colors are theme tokens.
 */
export declare function ManifestRow({ item, sku, quantity, scanned, state, onToggle, testID, style, }: ManifestRowProps): React.ReactElement;
//# sourceMappingURL=ManifestRow.d.ts.map
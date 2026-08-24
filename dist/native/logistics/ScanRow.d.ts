import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ScanKind } from './internal';
export interface ScanRowProps {
    /** The scanned code / barcode value (headline, monospace-ish). */
    code: string;
    /** Scan kind — glyph + word, never color alone. */
    kind: ScanKind;
    /** Location / station where the scan happened. */
    location?: string;
    /** Human timestamp (e.g. `10:42:07`). */
    time?: string;
    /** Operator / device that produced the scan. */
    operator?: string;
    /** Makes the row tappable (drill into the scan). */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single scan event row. The kit ships no barcode renderer, so the code is
 * shown as text beside a **token-bar placeholder** that evokes a barcode
 * (alternating neutral-ramp bars, purely decorative and hidden from a11y). The
 * scan kind is carried by a glyph + word chip. Tappable when `onPress` is set.
 * All colors are theme tokens — no literal colors, no scan/barcode dependency.
 */
export declare function ScanRow({ code, kind, location, time, operator, onPress, testID, style, }: ScanRowProps): React.ReactElement;
//# sourceMappingURL=ScanRow.d.ts.map
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Asset condition — text + glyph + color (never color-alone). */
export type EquipmentStatus = 'operational' | 'maintenance' | 'down' | 'retired';
export interface EquipmentRowProps {
    /** Equipment / asset name (e.g. "Bobcat S650"). */
    name: string;
    /** Asset tag / serial (e.g. "AST-3391"). */
    assetTag: string;
    /** Operating condition — text + glyph + color. */
    status: EquipmentStatus;
    /** Leading glyph for the asset disc (emoji or symbol). */
    glyph?: string;
    /** Localized next-service date, shown as a meta line. */
    nextService?: string;
    /** Current site / location, shown as a meta line. */
    location?: string;
    /** Fires on row press (e.g. open the asset detail). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One line in an equipment / asset register: a tinted status glyph disc, a
 * name/tag stack, meta (location, next service), and a status pill. The status
 * is conveyed redundantly (glyph + label + a color that traces to a
 * `SemanticColors` slot: operational → success, down → danger) so it is never
 * color-alone. Becomes a button only when `onPress` is supplied. No literals.
 */
export declare function EquipmentRow({ name, assetTag, status, glyph, nextService, location, onPress, style, }: EquipmentRowProps): React.ReactElement;
//# sourceMappingURL=EquipmentRow.d.ts.map
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ShipmentStatus } from './internal';
export interface PackageRowProps {
    /** Package / parcel id (headline). */
    packageId: string;
    /** Human contents description or SKU. */
    contents?: string;
    /** Weight amount in the given `weightUnit`. */
    weight?: number;
    /** Weight unit (default `kg`). */
    weightUnit?: 'kg' | 'lb' | 'g' | 'oz';
    /** Dimensions string (e.g. `30×20×15 cm`). */
    dimensions?: string;
    /** Lifecycle status — glyph + word badge, never color alone. */
    status?: ShipmentStatus;
    /** Selection state (adds a leading accent border). */
    selected?: boolean;
    /** Makes the row tappable. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Dense list row for a single package: id headline, contents/SKU sub-line, a
 * weight + dimensions metric column, and an optional glyph + word status badge.
 * Tappable when `onPress` is given (button role + descriptive label). Selection
 * is shown by a primary border, not by color alone (the status still carries a
 * word). All colors are theme tokens.
 */
export declare function PackageRow({ packageId, contents, weight, weightUnit, dimensions, status, selected, onPress, testID, style, }: PackageRowProps): React.ReactElement;
//# sourceMappingURL=PackageRow.d.ts.map
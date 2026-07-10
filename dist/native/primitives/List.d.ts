import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ListItemData {
    title: React.ReactNode;
    description?: React.ReactNode;
    /** Leading slot (e.g. an Avatar or icon). */
    leading?: React.ReactNode;
    /** Trailing slot (e.g. a Badge, Button, or chevron). */
    trailing?: React.ReactNode;
    /** Makes the row pressable. */
    onPress?: () => void;
}
export interface ListProps {
    items: ListItemData[];
    style?: StyleProp<ViewStyle>;
}
/**
 * Vertical list of leading/title/description/trailing rows — the native mirror
 * of the web `List` (`onClick`→`onPress`). Token-bound surface, border and
 * divider. No literal colors.
 */
export declare function List({ items, style }: ListProps): React.ReactElement;
//# sourceMappingURL=List.d.ts.map
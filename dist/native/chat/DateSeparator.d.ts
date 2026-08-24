import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface DateSeparatorProps {
    /** The date/label to show centered in the pill (e.g. "Today", "12 Aug"). */
    label: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Centered date chip that breaks a message stream into day sections. Announced
 * as a header for screen-reader navigation. No literal colors — the pill fill
 * and text come from semantic tokens.
 */
export declare function DateSeparator({ label, style }: DateSeparatorProps): React.ReactElement;
//# sourceMappingURL=DateSeparator.d.ts.map
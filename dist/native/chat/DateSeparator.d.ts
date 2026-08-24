import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
export interface DateSeparatorProps {
    /** The date/label to show centered in the pill (e.g. "Today", "12 Aug"). */
    label: string;
    /**
     * Visual treatment for the pill surface (diversity system). Defaults to
     * `classic` — the historical surface fill with a hairline border.
     */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * Centered date chip that breaks a message stream into day sections. Announced
 * as a header for screen-reader navigation. No literal colors — the pill fill
 * and text come from semantic tokens.
 */
export declare function DateSeparator({ label, appearance, style, }: DateSeparatorProps): React.ReactElement;
//# sourceMappingURL=DateSeparator.d.ts.map
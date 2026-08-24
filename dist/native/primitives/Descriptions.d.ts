import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface DescriptionItem {
    label: React.ReactNode;
    value: React.ReactNode;
}
export interface DescriptionsProps {
    items: DescriptionItem[];
    columns?: 1 | 2;
    style?: StyleProp<ViewStyle>;
}
/**
 * Key/value detail grid — the native mirror of the web `Descriptions`. Renders
 * a token-bound label/value pair per item, laid out in 1 or 2 columns via a
 * flex-wrap grid. For record/detail views. No literal colors.
 */
export declare function Descriptions({ items, columns, style }: DescriptionsProps): React.ReactElement;
//# sourceMappingURL=Descriptions.d.ts.map
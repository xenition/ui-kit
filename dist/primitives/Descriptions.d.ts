import * as React from 'react';
export interface DescriptionItem {
    label: React.ReactNode;
    value: React.ReactNode;
}
export interface DescriptionsProps {
    items: DescriptionItem[];
    columns?: 1 | 2;
    className?: string;
}
/** Key/value detail grid bound to the theme tokens — for record/detail views. */
export declare function Descriptions({ items, columns, className }: DescriptionsProps): React.ReactElement;
//# sourceMappingURL=Descriptions.d.ts.map
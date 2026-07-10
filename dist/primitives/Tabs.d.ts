import * as React from 'react';
export interface TabItem {
    value: string;
    label: React.ReactNode;
}
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    items: TabItem[];
    value: string;
    onValueChange: (value: string) => void;
}
/** Themed tab bar (controlled). Render the active panel yourself based on `value`. */
export declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Tabs.d.ts.map
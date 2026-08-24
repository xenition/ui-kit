import * as React from 'react';
export interface ScrollableTabItem {
    value: string;
    label: React.ReactNode;
    /** Optional count/notification chip shown after the label. */
    badge?: React.ReactNode;
}
export interface ScrollableTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    items: ScrollableTabItem[];
    value: string;
    onValueChange: (value: string) => void;
}
/**
 * Web parity of the native `ScrollableTabs`: a horizontally scrollable tab bar
 * for when there are more tabs than fit the viewport (the base `Tabs` is a fixed
 * non-scrolling row). Each tab has a token-bound active underline and an optional
 * trailing badge. Uses the ARIA `tablist`/`tab` roles. All colors/spacing come
 * from the `--xen-*` tokens via Tailwind classes — no literal colors.
 */
export declare const ScrollableTabs: React.ForwardRefExoticComponent<ScrollableTabsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScrollableTabs.d.ts.map
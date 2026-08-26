import * as React from 'react';
export interface TabItem {
    value: string;
    label: React.ReactNode;
}
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    items: TabItem[];
    value: string;
    /**
     * Fires with the value of the tab that was clicked. Prefer `onChange` — that
     * is the kit's one canonical name for "the value changed". `onValueChange` is
     * this component's original spelling, kept so existing callers keep working;
     * if both are passed this one wins. One of the two is required in practice —
     * both are optional in the type so either spelling satisfies it on its own.
     */
    onValueChange?: (value: string) => void;
    /** Canonical spelling of `onValueChange` (see it for the precedence rule). */
    onChange?: (value: string) => void;
}
/** Themed tab bar (controlled). Render the active panel yourself based on `value`. */
export declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Tabs.d.ts.map
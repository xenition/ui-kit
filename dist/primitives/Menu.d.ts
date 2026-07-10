import * as React from 'react';
export interface MenuItem {
    label: React.ReactNode;
    onSelect?: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
    /** Renders the item in the danger tone (e.g. Delete). */
    danger?: boolean;
}
export interface MenuProps {
    /** Clickable trigger (e.g. a Button or icon). */
    trigger: React.ReactNode;
    items: MenuItem[];
    align?: 'start' | 'end';
}
/** Dropdown action menu bound to the theme tokens. Closes on select / outside click / Escape. */
export declare function Menu({ trigger, items, align }: MenuProps): React.ReactElement;
//# sourceMappingURL=Menu.d.ts.map
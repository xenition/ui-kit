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
    /**
     * The control that opens the menu — normally a kit `<Button>` or an icon
     * button. Menu clones the element and injects its own `onClick` rather than
     * wrapping it in a click-catching `<span>` (see the note below), so the
     * trigger stays the real button: its `disabled` state still blocks the menu,
     * and any `onClick` it already carries still runs. A trigger that cannot take
     * an `onClick` — a bare string, or a component that drops the prop — should
     * be wrapped by the caller in an element that can.
     */
    trigger: React.ReactNode;
    items: MenuItem[];
    align?: 'start' | 'end';
}
/** Dropdown action menu bound to the theme tokens. Closes on select / outside click / Escape. */
export declare function Menu({ trigger, items, align }: MenuProps): React.ReactElement;
//# sourceMappingURL=Menu.d.ts.map
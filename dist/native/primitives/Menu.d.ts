import * as React from 'react';
export interface MenuItem {
    label: React.ReactNode;
    /** Fires on select; the menu closes afterwards (`onClick`→`onSelect`). */
    onSelect?: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
    /** Renders the item in the danger tone (e.g. Delete). */
    danger?: boolean;
}
export interface MenuProps {
    /**
     * The control that opens the menu — normally a kit `<Button>` or an icon
     * button. Menu does not wrap it in a second pressable; it clones the element
     * and injects its own `onPress` (see the note below), so the trigger stays
     * the real button: its `disabled` state still blocks the menu, and any
     * `onPress` it already carries still runs. A trigger that cannot take an
     * `onPress` — a bare string, or a component that drops the prop — should be
     * wrapped by the caller in a `<Pressable>`, which can.
     */
    trigger: React.ReactNode;
    items: MenuItem[];
    align?: 'start' | 'end';
}
/**
 * Themed dropdown menu — the native mirror of the web `Menu`. RN has no
 * anchored DOM portal, so the items open in a `Modal` sheet over a translucent
 * backdrop rather than floating next to the trigger; `align` shifts the sheet
 * left / right within the overlay (native simplification). Selecting an item
 * fires `onSelect` and closes the menu. No literal colors.
 */
export declare function Menu({ trigger, items, align }: MenuProps): React.ReactElement;
//# sourceMappingURL=Menu.d.ts.map
import * as React from 'react';
export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    checked?: boolean;
    /**
     * Fires with the requested checked state. Prefer `onChange` — that is the
     * kit's one canonical name for "the value changed". `onCheckedChange` is this
     * component's original spelling, kept so existing callers keep working; if
     * both are passed this one wins. (The DOM `onChange` is already omitted from
     * the inherited button props, so the name carries the kit meaning here, not
     * the React form-event one.)
     */
    onCheckedChange?: (checked: boolean) => void;
    /** Canonical spelling of `onCheckedChange` (see it for the precedence rule). */
    onChange?: (checked: boolean) => void;
}
/** Themed on/off switch (`role="switch"`) for boolean settings/filters. */
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Switch.d.ts.map
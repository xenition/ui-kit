import * as React from 'react';
export interface YesNoToggleProps {
    /** Current answer. `null`/`undefined` → nothing selected. */
    value?: boolean | null;
    /** Fires with the chosen answer. */
    onChange: (value: boolean) => void;
    /** Label for the affirmative side. Default `'Yes'`. */
    yesLabel?: string;
    /** Label for the negative side. Default `'No'`. */
    noLabel?: string;
    /** Accessible name for the group. Default `'Yes or no'`. */
    'aria-label'?: string;
    /** Non-interactive + dimmed when `true`. Default `false`. */
    disabled?: boolean;
    /** Extra classes on the root. */
    className?: string;
}
/**
 * YesNoToggle — **V4** "clean form / focus" binary segmented control. Two big
 * (≥44px) side-by-side buttons on a calm neutral surface: the selected side
 * fills with the single signature accent — solid `primary` with `on-primary`
 * text — while the other stays `surface` + `border`. No gradients. Exposed as a
 * `radiogroup` of two `radio`s so the choice is announced. Controlled via
 * `value` + `onChange`. All colors come from `--xen-*` token classes.
 */
export declare const YesNoToggle: React.ForwardRefExoticComponent<YesNoToggleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=YesNoToggle.d.ts.map
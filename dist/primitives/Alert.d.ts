import * as React from 'react';
export type AlertTone = 'info' | 'success' | 'warn' | 'danger';
export type AlertVariant = 'subtle' | 'solid' | 'outline';
export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    tone?: AlertTone;
    /** Surface treatment. `subtle` (default) is the bordered left-rule card. */
    variant?: AlertVariant;
    /** Bold heading above the body. */
    title?: React.ReactNode;
    /** Renders a dismiss (×) button that calls this. */
    onClose?: () => void;
    /** Optional leading icon/glyph. */
    icon?: React.ReactNode;
    /** Optional trailing action (e.g. a button/link) rendered under the body. */
    action?: React.ReactNode;
}
/**
 * Inline, optionally dismissible alert bound to the theme tokens —
 * info/success/warn/danger. The default (`subtle`) renders exactly as before;
 * `solid` (filled) and `outline` (full ring) variants and an optional trailing
 * `action` are additive opt-ins mirroring the native `Alert`. No literal colors.
 */
export declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Alert.d.ts.map
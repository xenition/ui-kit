import * as React from 'react';
export type AlertTone = 'info' | 'success' | 'warn' | 'danger';
export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    tone?: AlertTone;
    /** Bold heading above the body. */
    title?: React.ReactNode;
    /** Renders a dismiss (×) button that calls this. */
    onClose?: () => void;
    /** Optional leading icon/glyph. */
    icon?: React.ReactNode;
}
/** Inline, optionally dismissible alert bound to the theme tokens — info/success/warn/danger. */
export declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Alert.d.ts.map
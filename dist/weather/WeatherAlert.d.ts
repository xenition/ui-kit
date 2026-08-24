import * as React from 'react';
/** Severity of a weather advisory, low → high. */
export type WeatherAlertSeverity = 'advisory' | 'watch' | 'warning' | 'emergency';
export interface WeatherAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'aria-label'> {
    /** Alert headline (e.g. `'Flash Flood Warning'`). */
    title: string;
    /** Longer description / instructions. */
    description?: string;
    /** Severity → tone + glyph. Default `'advisory'`. */
    severity?: WeatherAlertSeverity;
    /** Effective-through caption. */
    until?: string;
    /** Fired when the dismiss affordance is pressed; omit to hide it. */
    onDismiss?: () => void;
}
/**
 * Banner for a weather advisory (web parity of the native `WeatherAlert`). The
 * severity drives the token tone (warn for advisory/watch, danger for
 * warning/emergency) but is ALSO spelled out with a glyph + a text severity
 * `Badge`, so it never relies on color alone. The surface is a token tint with a
 * matching left rail. Pass `onClick` to make the banner tappable
 * (keyboard-activatable) and `onDismiss` to render a separate dismiss button.
 * All colors come from the `--xen-*` tokens via Tailwind classes.
 */
export declare const WeatherAlert: React.ForwardRefExoticComponent<WeatherAlertProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WeatherAlert.d.ts.map
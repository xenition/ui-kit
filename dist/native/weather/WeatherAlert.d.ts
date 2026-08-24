import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Severity of a weather advisory, low → high. */
export type WeatherAlertSeverity = 'advisory' | 'watch' | 'warning' | 'emergency';
export interface WeatherAlertProps {
    /** Alert headline (e.g. `'Flash Flood Warning'`). */
    title: string;
    /** Longer description / instructions. */
    description?: string;
    /** Severity → tone + glyph. Default `'advisory'`. */
    severity?: WeatherAlertSeverity;
    /** Effective-through caption. */
    until?: string;
    /** Fired when the alert is tapped (open detail). */
    onPress?: () => void;
    /** Fired when the dismiss affordance is pressed; omit to hide it. */
    onDismiss?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Banner for a weather advisory. The severity drives the token tone
 * (warn for advisory/watch, danger for warning/emergency) but is ALSO spelled
 * out with a glyph and a text severity label, so it never relies on color
 * alone. The surface is a `warn`/`danger` token tint with a matching left rail.
 * Optional tap + dismiss callbacks. All colors/sizes come from the compiled
 * theme tokens via `useXenitionTheme()` — no literal colors.
 */
export declare function WeatherAlert({ title, description, severity, until, onPress, onDismiss, style, }: WeatherAlertProps): React.ReactElement;
//# sourceMappingURL=WeatherAlert.d.ts.map
import * as React from 'react';
import type { WeatherAlertProps } from './WeatherAlert';
/** Drop-in for {@link WeatherAlertProps} — same props, a different design. */
export type WeatherAlertV4Props = WeatherAlertProps;
/**
 * WeatherAlert — **filled tone banner** design (v4). A bold, gradient-filled
 * severity banner: warn (advisory/watch) or danger (warning/emergency) as the
 * ground, with the severity ALSO spelled out by a glyph and a text label — never
 * color alone. A big icon sits in a translucent chip, a severity pill and title
 * lead, and the copy + "until" line follow — all in the contrast-guaranteed
 * on-tone ink. Optional tap + dismiss. The gradient is the tone token stepped
 * with `withAlpha`; every color traces to a token — no literals. Same props as
 * {@link WeatherAlertProps}.
 */
export declare function WeatherAlertV4({ title, description, severity, until, onPress, onDismiss, style, }: WeatherAlertV4Props): React.ReactElement;
//# sourceMappingURL=WeatherAlertV4.d.ts.map
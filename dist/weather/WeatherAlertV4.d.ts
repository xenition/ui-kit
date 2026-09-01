import * as React from 'react';
import type { WeatherAlertProps } from './WeatherAlert';
export type WeatherAlertV4Props = WeatherAlertProps;
/**
 * WeatherAlert — **filled tone banner** design (v4), web parity of the native
 * `WeatherAlertV4`. A bold, filled severity banner: warn (advisory/watch) or
 * danger (warning/emergency) as the ground, with the severity ALSO spelled out by
 * a glyph in a white chip and a text pill — never color alone. Title, copy and
 * "until" line ride in the contrast-guaranteed on-tone ink. Pass `onClick` to
 * make it tappable (keyboard-activatable) and `onDismiss` for a dismiss button.
 * All colors flow through Tailwind token classes. Same props as
 * {@link WeatherAlertProps}.
 */
export declare const WeatherAlertV4: React.ForwardRefExoticComponent<WeatherAlertProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WeatherAlertV4.d.ts.map
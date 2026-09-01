import * as React from 'react';
import type { DeliveryEstimateProps } from './DeliveryEstimate';
export interface DeliveryEstimateV4Props extends DeliveryEstimateProps {
    /** Copy shown in place of the window while the ETA resolves. Default `'Estimating'`. */
    estimatingLabel?: string;
    /** The window's unit. Default `'min'`. */
    unit?: string;
}
/**
 * **V4 delivery estimate** — the web twin of the native `DeliveryEstimateV4`,
 * same props as {@link DeliveryEstimate} plus `estimatingLabel` and `unit`.
 *
 * ## Four changes
 *
 * 1. **A transposed window is still a window.** The base tested
 *    `maxMinutes > minMinutes` and silently dropped the max otherwise, so
 *    `min={35} max={20}` rendered a confident "35 min" and the other end of
 *    the estimate vanished. `deliveryWindow()` reads the pair the way round a
 *    human would.
 * 2. **The name it computes is no longer thrown away.** `aria-label` sat on a
 *    role-less `div`, where a name is simply ignored — so the caption, the
 *    only thing saying whether this is delivery or pickup, never reached the
 *    reader in the `badge` variant that does not draw it.
 * 3. **Loading says a word instead of an em-dash.** "—" is not readable copy,
 *    and it announced as nothing at all; `estimatingLabel` is the word, and
 *    the readout is polite-live so the real figure is announced when it lands.
 * 4. **`unit` is a prop, and the pill is a token.** "min" was compiled in
 *    English into the component, and the badge painted `bg-neutral-100` — a
 *    light-oriented ramp step that inverts under `[data-theme="dark"]`. It now
 *    takes the module's one badge shape.
 */
export declare const DeliveryEstimateV4: React.ForwardRefExoticComponent<DeliveryEstimateV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DeliveryEstimateV4.d.ts.map
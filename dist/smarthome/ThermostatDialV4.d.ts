import * as React from 'react';
import type { ThermostatDialProps } from './ThermostatDial';
/** Drop-in for {@link ThermostatDialProps} — same props, the V4 "ambient" design. */
export type ThermostatDialV4Props = ThermostatDialProps;
/**
 * ThermostatDial — **V4** "ambient" design (web parity of the native V4). A calm
 * climate dial: the big target numeral sits centered over an optional ambient
 * reading inside a token-bound, dependency-free inline `<svg>` dial. A 270° track
 * (`var(--xen-border)`) carries a value arc filled in the mode accent
 * (`heat`→warn, `cool`→primary, `auto`→accent, `off`→muted); when running, the
 * dial disc lights with a soft accent wash so the active mode glows. Framing
 * `+`/`−` buttons step the target within `[min,max]`, and a text label announces
 * the mode (never color alone). `span` guards the fraction math against
 * divide-by-zero. `offline` dims the dial and blocks changes. Same props/behavior
 * as {@link ThermostatDialProps}; all colors from `--xen-*` tokens (no literals).
 */
export declare const ThermostatDialV4: React.ForwardRefExoticComponent<ThermostatDialProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ThermostatDialV4.d.ts.map
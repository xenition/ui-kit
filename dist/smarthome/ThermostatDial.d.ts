import * as React from 'react';
/** Operating mode of a thermostat — selects the accent color slot. */
export type ThermostatMode = 'heat' | 'cool' | 'auto' | 'off';
export interface ThermostatDialProps {
    /** Current target setpoint (in `unit`). */
    target: number;
    /** Live ambient reading, shown under the setpoint when provided. */
    ambient?: number;
    /** Minimum settable setpoint. Default 10. */
    min?: number;
    /** Maximum settable setpoint. Default 30. */
    max?: number;
    /** Increment applied by the +/- controls. Default 0.5. */
    step?: number;
    /** Operating mode — drives the arc accent (`heat`→danger, `cool`→primary, `auto`→accent, `off`→muted). */
    mode?: ThermostatMode;
    /** Temperature unit label. Default `'°'`. */
    unit?: string;
    /** Diameter of the dial in px. Default 200. */
    size?: number;
    /** Fires with the new setpoint when +/- is pressed (clamped to `[min,max]`). */
    onTargetChange?: (next: number) => void;
    /** Device is unreachable — dims the dial and disables controls. */
    offline?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * Circular thermostat control — a token-bound, dependency-free inline `<svg>`
 * dial. A 270° track (`var(--xen-border)`) carries a value arc filled in the
 * mode accent (`heat`→danger, `cool`→primary, `auto`→accent, `off`→muted), the
 * setpoint sits large in the center over an optional ambient reading, and framing
 * `+`/`−` buttons step the target within `[min,max]`. The mode is announced by a
 * text label (never color alone). `span` guards the fraction math against
 * divide-by-zero. `offline` dims the dial and blocks changes. No literal colors.
 */
export declare const ThermostatDial: React.ForwardRefExoticComponent<ThermostatDialProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ThermostatDial.d.ts.map
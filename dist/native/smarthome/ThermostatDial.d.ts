import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    style?: StyleProp<ViewStyle>;
}
/**
 * Circular thermostat control — a token-bound SVG dial (drawn with the available
 * `react-native-svg` peer). A 270° track (`border`) carries a value arc filled in
 * the mode accent (`heat`→danger, `cool`→primary, `auto`→accent, `off`→muted), the
 * setpoint sits large in the center over an optional ambient reading, and framing
 * `+`/`−` `Pressable`s step the target within `[min,max]`. The mode is announced
 * by a text label (never color alone). `offline` dims the dial and blocks changes.
 * `max`/`min` guard the fraction math against divide-by-zero. No literal colors.
 */
export declare function ThermostatDial({ target, ambient, min, max, step, mode, unit, size, onTargetChange, offline, style, }: ThermostatDialProps): React.ReactElement;
//# sourceMappingURL=ThermostatDial.d.ts.map
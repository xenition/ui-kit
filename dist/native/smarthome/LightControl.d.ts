import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface LightControlProps {
    /** Light display name (e.g. "Kitchen Ceiling"). */
    name: string;
    /** Whether the light is on. Controls slider availability. */
    on?: boolean;
    /** Brightness 0–100. */
    brightness?: number;
    /** Color temperature 0–100 (0 = warm, 100 = cool). Omit to hide the row. */
    colorTemp?: number;
    /** Device is unreachable — disables all controls. */
    offline?: boolean;
    /** Fires with the requested on/off value. */
    onToggle?: (next: boolean) => void;
    /** Fires with the new brightness (0–100). */
    onBrightnessChange?: (value: number) => void;
    /** Fires with the new color temperature (0–100). */
    onColorTempChange?: (value: number) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Light controller — an on/off {@link Switch} over brightness and (optional)
 * color-temperature {@link Slider}s. The tinted bulb glyph uses the `warn` slot
 * when lit and `muted` when dark (a text `On`/`Off`/`Offline` label carries the
 * state so it never rests on color alone). Sliders are disabled when the light is
 * off or `offline`, and a warm→cool hint sits under the color-temp track using
 * `tokens.ramps.accent` tints (token-derived, not literal hex). Guards keep the
 * brightness readout in `[0,100]`. No literal colors.
 */
export declare function LightControl({ name, on, brightness, colorTemp, offline, onToggle, onBrightnessChange, onColorTempChange, style, }: LightControlProps): React.ReactElement;
//# sourceMappingURL=LightControl.d.ts.map
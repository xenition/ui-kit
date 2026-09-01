import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Visual tone for the security/status pill. */
export type HomeStatusTone = 'success' | 'warn' | 'danger';
export interface HomeHeaderProps {
    /** The home's display name — the hero headline (e.g. "Willow House"). */
    homeName: string;
    /** Optional time-of-day greeting above the name (e.g. "Good evening"). */
    greeting?: string;
    /** Optional at-a-glance security/status label (e.g. "All secure"). */
    statusLabel?: string;
    /** Semantic tone for the status pill; meaning is never carried by color alone. Default `'success'`. */
    statusTone?: HomeStatusTone;
    /** Optional weather glance shown as a frosted tile. */
    weather?: {
        /** Temperature string, already formatted (e.g. "72°"). */
        temp: string;
        /** Optional emoji/glyph for the condition (e.g. "☀️"). */
        glyph?: string;
        /** Optional condition label (e.g. "Clear"). */
        condition?: string;
    };
    /** Optional at-a-glance metrics rendered as frosted tiles (e.g. "Devices on 4"). */
    metrics?: readonly {
        label: string;
        value: string;
    }[];
    /** Optional quick-scene chips (e.g. "Movie", "Away"). */
    scenes?: readonly {
        id: string;
        label: string;
        glyph?: string;
    }[];
    /** Fires with the scene `id` when a quick-scene chip is activated. */
    onScene?: (id: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * HomeHeader — the smart-home dashboard **hero** and the module's peak moment.
 * A brand-gradient ground carries a near-white greeting + home name, a frosted
 * security/status pill (tone + glyph, never color alone), a weather glance and a
 * run of metric tiles, then an optional row of quick-scene chips. Every color
 * derives from the compiled brand ramp via `ambient*` + `GradientSurface` — the
 * light ramp steps act as near-white "ink" on the saturated ground for any hue —
 * token-only, no literals, light + dark. Presentational: shaped data +
 * callbacks, nothing fetches.
 */
export declare function HomeHeader({ homeName, greeting, statusLabel, statusTone, weather, metrics, scenes, onScene, style, }: HomeHeaderProps): React.ReactElement;
//# sourceMappingURL=HomeHeader.d.ts.map
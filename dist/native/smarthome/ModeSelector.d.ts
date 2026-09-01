import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** One selectable home mode — id, label + an optional glyph. */
export interface ModeOption {
    /** Stable identity, emitted to `onChange` (e.g. `'home'`). */
    id: string;
    /** Human-readable label shown under the glyph (e.g. `'Home'`). */
    label: string;
    /** Leading glyph/emoji for the mode tile (e.g. `'🏠'`). */
    glyph?: string;
}
/** The four canonical home modes when no custom `modes` are supplied. */
export type HomeMode = 'home' | 'away' | 'night' | 'vacation';
/** The default Home / Away / Night / Vacation mode set. */
export declare const DEFAULT_MODES: readonly ModeOption[];
export interface ModeSelectorProps {
    /**
     * The id of the currently selected mode (matches a `modes[].id`; defaults to
     * one of {@link HomeMode} when `modes` is omitted). Drives the solid-`primary`
     * selected tile.
     */
    value: HomeMode | string;
    /** Fires with the chosen mode id when a tile is activated. */
    onChange?: (mode: string) => void;
    /**
     * Custom mode tiles, in display order. Defaults to {@link DEFAULT_MODES}
     * (Home / Away / Night / Vacation).
     */
    modes?: readonly ModeOption[];
    /** Accessible label for the radiogroup. Defaults to `'Home mode'`. */
    label?: string;
    /** Disables every tile (e.g. while a mode change is in flight). */
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * ModeSelector — **V4** "ambient" home-mode switch. A calm control-panel
 * `radiogroup` of big (≥44px) mode tiles: the **selected** mode is a solid
 * `primary` fill with `on-primary` glyph + label, while the rest stay on a calm
 * surface with a soft tint — one accent, nothing shouting. Each tile is a
 * `radio` with its selected state announced, and the meaning is carried by glyph
 * + label (never color alone). Presentational only: `value` in, `onChange` out.
 * Token-only colors via `useXenitionTheme()`; dark-mode safe.
 */
export declare function ModeSelector({ value, onChange, modes, label, disabled, style, }: ModeSelectorProps): React.ReactElement;
//# sourceMappingURL=ModeSelector.d.ts.map
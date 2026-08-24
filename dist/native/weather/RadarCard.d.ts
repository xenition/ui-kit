import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface RadarCardProps {
    /** Card title. Default `'Radar'`. */
    title?: string;
    /** Caption under the title (e.g. `'Live · 2 min ago'`). */
    caption?: string;
    /** Height of the static radar canvas in px. Default `180`. */
    height?: number;
    /** Fired when the placeholder is tapped (e.g. open full-screen radar). */
    onPress?: () => void;
    /** Overlay label shown centred on the canvas. Default `'Radar preview'`. */
    placeholderLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Static radar map placeholder — INTENTIONALLY dependency-free: no maps SDK, no
 * SVG, no image. The "canvas" is built purely from `View`s: a token-tinted
 * backdrop, three concentric range rings, a crosshair, and a labelled centre. It
 * gives weather layouts a radar slot to render before (or without) a real tile
 * provider is wired. Optional `onPress` to open a full view. All colors/sizes
 * come from the compiled theme tokens via `useXenitionTheme()` — no literal
 * colors, no external dependencies.
 */
export declare function RadarCard({ title, caption, height, onPress, placeholderLabel, style, }: RadarCardProps): React.ReactElement;
//# sourceMappingURL=RadarCard.d.ts.map
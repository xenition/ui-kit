import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** UV exposure band. */
export type UvBand = 'low' | 'moderate' | 'high' | 'very-high' | 'extreme';
export interface UVIndexCardProps {
    /** UV index value (0–11+). */
    uv?: number;
    /** Short protection guidance. */
    advice?: string;
    /** Message shown when `uv` is absent. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * UV index card: the numeric UV value, its exposure band shown as a glyph + text
 * label (never color alone), a token-tinted 0–11 scale track with a marker, and
 * an optional protection tip. Band severity maps to success/warn/danger tokens.
 * Renders a muted empty state when `uv` is absent. All colors/sizes come from
 * the compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
export declare function UVIndexCard({ uv, advice, emptyLabel, style, }: UVIndexCardProps): React.ReactElement;
//# sourceMappingURL=UVIndexCard.d.ts.map
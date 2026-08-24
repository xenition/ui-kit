import * as React from 'react';
/** UV exposure band. */
export type UvBand = 'low' | 'moderate' | 'high' | 'very-high' | 'extreme';
export interface UVIndexCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label'> {
    /** UV index value (0–11+). */
    uv?: number;
    /** Short protection guidance. */
    advice?: string;
    /** Message shown when `uv` is absent. */
    emptyLabel?: string;
}
/**
 * UV index card (web parity of the native `UVIndexCard`): the numeric UV value,
 * its exposure band shown as a `Badge` glyph + text label (never color alone), a
 * token 0–11 scale track with a marker, and an optional protection tip. Band
 * severity maps to success/warn/danger token tones. Renders a muted empty state
 * when `uv` is absent. All colors come from the `--xen-*` tokens via Tailwind
 * classes — no literal colors.
 */
export declare const UVIndexCard: React.ForwardRefExoticComponent<UVIndexCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=UVIndexCard.d.ts.map
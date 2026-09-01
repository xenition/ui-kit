import * as React from 'react';
import type { UVIndexCardProps } from './UVIndexCard';
/** Drop-in for {@link UVIndexCardProps} — same props, a different design. */
export type UVIndexCardV4Props = UVIndexCardProps;
/**
 * UVIndexCard — **elevated card** design (v4). A polished white card sitting on
 * the page: an oversized UV numeral, its exposure band as a solid pill (glyph +
 * text — never color alone), a token-tinted 0–11 scale track with a marker, and
 * an optional protection tip. Band severity maps to success/warn/danger tokens,
 * every color/size traces to the compiled theme via `useXenitionTheme()` — no
 * literal colors. Renders a muted empty state when `uv` is absent. Same props as
 * {@link UVIndexCardProps}.
 */
export declare function UVIndexCardV4({ uv, advice, emptyLabel, style, }: UVIndexCardV4Props): React.ReactElement;
//# sourceMappingURL=UVIndexCardV4.d.ts.map
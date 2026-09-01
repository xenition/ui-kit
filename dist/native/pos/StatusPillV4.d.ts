import * as React from 'react';
import type { StatusPillProps } from './StatusPill';
/** Drop-in for {@link StatusPillProps} — same props, the V4 "register" design. */
export type StatusPillV4Props = StatusPillProps;
/**
 * StatusPill — **V4** "register" design. A refined, tactile status chip: the same
 * **glyph + word** contract (state never by color alone), rendered as a crisp
 * soft-tint rounded pill with a touch more presence — bolder label, a hair more
 * padding for legibility at the counter. Color always resolves from a compiled
 * token via {@link toneColor} (or a token-tinted `withAlpha`) for the base's
 * tone, never a literal. `inline` drops the pill chrome for dense rows; `solid`
 * fills. Same props/behavior as {@link StatusPillProps} (tones + sizes
 * preserved); token-only tints via `useXenitionTheme()`.
 */
export declare function StatusPillV4({ meta, variant, size, style, }: StatusPillV4Props): React.ReactElement;
//# sourceMappingURL=StatusPillV4.d.ts.map
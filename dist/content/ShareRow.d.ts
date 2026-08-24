import * as React from 'react';
import type { ShareTarget } from './types';
export type ShareRowVariant = 'icons' | 'labeled';
/** A sensible default set of share destinations (glyphs, no icon font needed). */
export declare const DEFAULT_SHARE_TARGETS: ShareTarget[];
export interface ShareRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Called with the clicked target's id. */
    onShare: (id: string) => void;
    /** Destinations to render. Defaults to {@link DEFAULT_SHARE_TARGETS}. */
    targets?: ShareTarget[];
    /**
     * - `icons`   — round glyph buttons (default).
     * - `labeled` — glyph + label pills.
     */
    variant?: ShareRowVariant;
    /** Optional leading label, e.g. `'Share'`. Pass `null` to hide. */
    heading?: string | null;
}
/**
 * A row of share actions for an article — X, Facebook, copy-link, email, etc.
 * Web (React DOM) mirror of the native `ShareRow`. Data-driven via `targets`
 * (each supplies a glyph + accessible label) and a single `onShare(id)`
 * callback; the parent decides what each id does. Two variants: round `icons` or
 * `labeled` pills. Colors come only from `--xen-*` token classes.
 */
export declare const ShareRow: React.ForwardRefExoticComponent<ShareRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ShareRow.d.ts.map
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { ShareTarget } from './types';
export type ShareRowVariant = 'icons' | 'labeled';
/** A sensible default set of share destinations (glyphs, no icon font needed). */
export declare const DEFAULT_SHARE_TARGETS: ShareTarget[];
export interface ShareRowProps {
    /** Called with the pressed target's id. */
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A row of share actions for an article — X, Facebook, copy-link, email, etc.
 * Data-driven via `targets` (each supplies a glyph + accessible label) and a
 * single `onShare(id)` callback; the parent decides what each id does. Two
 * variants: round `icons` or `labeled` pills. Colors come only from
 * `SemanticColors`; no literal hex.
 */
export declare function ShareRow({ onShare, targets, variant, heading, style, }: ShareRowProps): React.ReactElement;
//# sourceMappingURL=ShareRow.d.ts.map
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SeedPhraseGridProps {
    /** The ordered recovery words (typically 12 or 24). */
    words: string[];
    /** Columns in the grid (default `3`). */
    columns?: number;
    /**
     * Controlled reveal state. When provided the component is controlled and
     * `onToggleReveal` drives it; otherwise it manages its own state and starts
     * HIDDEN — a seed phrase is never shown by default.
     */
    revealed?: boolean;
    /** Fires with the next reveal state when the reveal control is pressed. */
    onToggleReveal?: (revealed: boolean) => void;
    /** Reveal-button label when hidden (default `Reveal`). */
    revealLabel?: string;
    /** Reveal-button label when shown (default `Hide`). */
    hideLabel?: string;
    /** Sensitive-warning line shown above the grid. */
    warning?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A recovery-phrase grid that is **hidden by default** — the words are masked
 * with dots and the tiles are marked inaccessible to screen readers until the
 * holder explicitly reveals them (uncontrolled: internal state starts hidden;
 * controlled: pass `revealed` + `onToggleReveal`). Each tile shows its 1-based
 * index. A `warning` line reinforces the sensitivity. Token-bound; no literal
 * colors. Indexing into `words` is guarded.
 */
export declare function SeedPhraseGrid({ words, columns, revealed, onToggleReveal, revealLabel, hideLabel, warning, style, }: SeedPhraseGridProps): React.ReactElement;
//# sourceMappingURL=SeedPhraseGrid.d.ts.map
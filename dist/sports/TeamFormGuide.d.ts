import * as React from 'react';
/** One recent result — a Win, Draw or Loss. */
export type TeamFormResult = 'W' | 'D' | 'L';
export interface TeamFormGuideProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'results'> {
    /**
     * Recent results as a row of `'W' | 'D' | 'L'` letters. Ordered
     * **most-recent-first** (index `0` is the latest match). Rendered left→right
     * in that order.
     */
    results: readonly TeamFormResult[];
    /** Optional leading caption for the row (e.g. `"Last 5"`). Omit for pills only. */
    label?: string;
    /**
     * Optional press handler for a single result pill; receives the pill's index
     * in {@link results}. When supplied each pill becomes a keyboard-focusable
     * button; when omitted the row is purely presentational.
     */
    onResultPress?: (index: number) => void;
}
/**
 * TeamFormGuide — **V4** "broadcast" design. A compact form line: an optional
 * caption followed by a row of small circular soft-tint pills, one per recent
 * result, ordered most-recent-first. Each pill shows its letter (W / D / L) and
 * carries a semantic tint — win→success, draw→warn, loss→danger — so the result
 * reads from letter + color together, never color alone. When `onResultPress`
 * is given each pill is an accessible ≥44px button. All colors from `--xen-*`
 * token classes (no literals); dark-mode safe.
 */
export declare const TeamFormGuide: React.ForwardRefExoticComponent<TeamFormGuideProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TeamFormGuide.d.ts.map
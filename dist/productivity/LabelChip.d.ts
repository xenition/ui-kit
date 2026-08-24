import * as React from 'react';
/** Color-coded label tone (folders, categories, tags). */
export type LabelTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';
export interface LabelChipProps {
    /** Chip text. */
    label: string;
    /** Semantic tone for the leading dot. */
    tone?: LabelTone;
    /** Renders a remove (×) button that calls this. */
    onRemove?: () => void;
    /** Makes the whole chip clickable (e.g. to filter). */
    onClick?: () => void;
    className?: string;
}
/**
 * Outlined, color-coded label chip — a token-bound accent dot plus text on a
 * surface background, with optional click + remove affordances. Web parity of the
 * native `LabelChip` (`onPress` → `onClick`). The dot tone traces to an `--xen-*`
 * token class. No literal colors.
 */
export declare const LabelChip: React.ForwardRefExoticComponent<LabelChipProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LabelChip.d.ts.map
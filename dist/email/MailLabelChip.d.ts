import * as React from 'react';
export type MailLabelTone = 'neutral' | 'primary' | 'accent' | 'success' | 'warn' | 'danger';
export type MailLabelVariant = 'soft' | 'solid' | 'outline';
export interface MailLabelChipProps {
    /** Label text (e.g. "Work", "Receipts"). */
    label: string;
    /** Color tone. Default `'neutral'`. */
    tone?: MailLabelTone;
    /** Fill treatment. Default `'soft'`. */
    variant?: MailLabelVariant;
    /** Optional leading glyph (emoji / symbol). */
    glyph?: string;
    /** When provided, renders a removable "×" affordance (a real `<button>`). */
    onRemove?: () => void;
    /** Clicking the chip (e.g. filter by label). */
    onClick?: () => void;
    className?: string;
}
/**
 * A colored label / category chip for mail (Gmail-style labels). `tone` selects
 * a semantic slot and `variant` picks a fill: `soft` tints the tone, `solid`
 * fills it, `outline` rings it — every color resolved from a `--xen-*` token
 * class. Optionally removable via `onRemove` (a real button); the whole chip is
 * clickable via `onClick`. No literal colors.
 */
export declare const MailLabelChip: React.ForwardRefExoticComponent<MailLabelChipProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=MailLabelChip.d.ts.map
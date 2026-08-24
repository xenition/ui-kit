import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    /** When provided, renders a removable "×" affordance. */
    onRemove?: () => void;
    /** Tapping the chip (e.g. filter by label). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A colored label / category chip for mail (Gmail-style labels). `tone` selects
 * a semantic slot and `variant` picks a fill: `soft` tints the tone, `solid`
 * fills it, `outline` rings it — every color resolved from a token (soft fills
 * use a token-derived alpha). Optionally removable via `onRemove`. No literal
 * colors.
 */
export declare function MailLabelChip({ label, tone, variant, glyph, onRemove, onPress, style, }: MailLabelChipProps): React.ReactElement;
//# sourceMappingURL=MailLabelChip.d.ts.map
import * as React from 'react';
export type SplitButtonVariant = 'primary' | 'secondary';
export interface SplitButtonAction {
    key: string;
    label: React.ReactNode;
    /** Click handler (web parity of the native `onPress`). */
    onClick?: () => void;
    disabled?: boolean;
    /** Tint the label with the `danger` token. */
    destructive?: boolean;
}
export interface SplitButtonProps {
    /** Label for the primary (left) action. */
    label: React.ReactNode;
    /** Primary action click handler (web parity of the native `onPress`). */
    onClick?: () => void;
    /** Secondary actions revealed by the caret. */
    actions: SplitButtonAction[];
    variant?: SplitButtonVariant;
    disabled?: boolean;
    className?: string;
}
/**
 * Web parity of the native `SplitButton`: a primary action fused to a caret that
 * toggles a dropdown of secondary actions. `primary` fills with the `primary`
 * token; `secondary` is outlined. All colors/radii/spacing come from the
 * `--xen-*` tokens via Tailwind classes — no literal colors.
 */
export declare function SplitButton({ label, onClick, actions, variant, disabled, className, }: SplitButtonProps): React.ReactElement;
//# sourceMappingURL=SplitButton.d.ts.map
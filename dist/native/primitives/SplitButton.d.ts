import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type SplitButtonVariant = 'primary' | 'secondary';
export interface SplitButtonAction {
    key: string;
    label: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    /** Tint the label with `colors.danger`. */
    destructive?: boolean;
}
export interface SplitButtonProps {
    /** Label for the primary (left) action. */
    label: React.ReactNode;
    /** Primary action press handler. */
    onPress?: () => void;
    /** Secondary actions revealed by the caret. */
    actions: SplitButtonAction[];
    variant?: SplitButtonVariant;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A primary action fused to a caret that toggles an inline menu of secondary
 * actions. `primary` fills with `colors.primary`; `secondary` is outlined. The
 * menu drops in below the button (no portal/modal). All colors, radii and
 * spacing come from the compiled theme tokens via `useXenitionTheme()` — no
 * literal colors.
 */
export declare function SplitButton({ label, onPress, actions, variant, disabled, style, }: SplitButtonProps): React.ReactElement;
//# sourceMappingURL=SplitButton.d.ts.map
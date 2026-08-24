import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface PricingToggleOption {
    /** Visible label ("Monthly", "Yearly", …). */
    label: string;
    /** Value reported via `onChange` when selected. */
    value: string;
    /** Optional small "save %" (or any) badge shown beside the label. */
    badge?: string;
}
export interface PricingToggleProps {
    /** Segments to switch between (2+ supported). */
    options: PricingToggleOption[];
    /** Currently active option value (controlled). */
    value: string;
    /** Fires with the newly selected value. */
    onChange: (value: string) => void;
    /** Accessible label for the switch group. */
    label?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Monthly/yearly (or N-option) segmented switch — the native mirror of the web
 * `PricingToggle`. Reports the active key via `value`/`onChange` and keeps the
 * per-option "save %" `badge` slot. Built as a token-styled pill track (the base
 * `Segmented` primitive has no badge slot), matching the web pill-toggle look.
 * Token-only.
 */
export declare function PricingToggle({ options, value, onChange, label, style, }: PricingToggleProps): React.ReactElement;
//# sourceMappingURL=PricingToggle.d.ts.map
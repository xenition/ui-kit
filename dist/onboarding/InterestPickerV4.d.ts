import * as React from 'react';
import { type OnboardingFlowV4Props } from './internal/flow-v4';
import type { InterestPickerProps } from './InterestPicker';
export interface InterestPickerV4Props extends InterestPickerProps, OnboardingFlowV4Props {
    /**
     * Render as a whole screen — the shared shell, with the header fixed, the
     * chips scrolling and the CTA pinned above the safe-area inset.
     *
     * Default `false`, which is the base's rendering: a block the caller places.
     * `PermissionPrompt` already draws this distinction with the same prop name.
     */
    fullScreen?: boolean;
    /**
     * Build the "n of m selected" counter. Default `'3 of 5 selected'`; return
     * an empty string to hide it.
     *
     * It exists because `maxSelections` was **silently** enforced: at the cap,
     * clicking an unselected chip did nothing, with no message and no visible
     * reason. A control that refuses an interaction has to say why.
     */
    formatSelectionCount?: (selected: number, max: number) => string;
}
/**
 * **V4 interest picker** — the web twin of the native `InterestPickerV4`: the
 * base's props plus `fullScreen`, `formatSelectionCount` and the line's
 * `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The cap explains itself.** A live counter under the chips, and the
 *    blocked chips carry `aria-disabled` with the counter as their description.
 * 2. **Chips have hover and press states**, through the shared chrome layers.
 * 3. **Unselected chips sit on `card`.** On `surface` they were the page colour
 *    with a hairline around them, so a dark page read as a field of outlines.
 * 4. **Selected chips answer in the configured accent.**
 * 5. **`fullScreen`** — the shared shell, which is where the scroll, the pinned
 *    CTA and the inset come from.
 *
 * An empty `options` renders `emptyMessage`, never a bare gap. Selection stays
 * fully controlled.
 */
export declare const InterestPickerV4: React.ForwardRefExoticComponent<InterestPickerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=InterestPickerV4.d.ts.map
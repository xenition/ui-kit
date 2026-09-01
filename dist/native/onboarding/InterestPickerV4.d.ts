import * as React from 'react';
import { type OnboardingFlowV4Props } from './internal/flow-v4';
import type { InterestPickerProps } from './InterestPicker';
export interface InterestPickerV4Props extends InterestPickerProps, OnboardingFlowV4Props {
    /**
     * Render as a whole screen — the shared shell, with the header pinned, the
     * chips scrolling and the CTA fixed above the safe-area inset.
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
     * tapping an unselected chip did nothing, with no message and no visible
     * reason. A control that refuses a tap has to say why.
     */
    formatSelectionCount?: (selected: number, max: number) => string;
}
/**
 * **V4 interest picker** — the base's props plus `fullScreen`,
 * `formatSelectionCount` and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The cap explains itself.** With `maxSelections` set, a live counter sits
 *    under the chips and the chips that can no longer be chosen say so through
 *    `accessibilityState` as well as opacity. The base just stopped responding.
 * 2. **Chips press.** An M3 state layer over the chip's own fill. The base had
 *    no pressed state at all, so on a slow render a tap looked ignored.
 * 3. **Unselected chips sit on `card`.** On `surface` they were the page
 *    colour with a hairline around them — the border was doing all the work,
 *    and on a dark seed the row read as a field of outlines.
 * 4. **Selected chips answer in the configured accent**, so two apps on one
 *    seed do not have identical chip rows.
 * 5. **`fullScreen`** — the shared shell, which is where the scroll, the
 *    pinned CTA and the safe-area inset come from.
 *
 * An empty `options` renders `emptyMessage`, never a bare gap. Selection stays
 * fully controlled: the component computes nothing it does not display.
 */
export declare function InterestPickerV4({ options, selectedIds, onChange, title, helper, maxSelections, accessibilityLabel, subtitle, illustration, logoGlyph, progress, onBack, onDismiss, error, ctaLabel, onContinue, loading, secondaryLabel, onSecondary, emptyMessage, fullScreen, formatSelectionCount, ground, accent, style, }: InterestPickerV4Props): React.ReactElement;
//# sourceMappingURL=InterestPickerV4.d.ts.map
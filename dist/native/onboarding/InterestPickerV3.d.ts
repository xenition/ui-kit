import * as React from 'react';
import type { InterestPickerProps } from './InterestPicker';
/** Drop-in for {@link InterestPicker} — identical props, different design. */
export type InterestPickerV3Props = InterestPickerProps;
/**
 * Interest chips — V3, the compact line. No hero panel at all: a small badge
 * sits beside the headline on one row, the copy is left-aligned, and the chip
 * field is denser (a smaller type step, tighter padding) so the whole step fits
 * a sheet or a short screen without scrolling.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put
 * a hero, and silently squeezing one in is how a "compact" screen stops being
 * compact. `logoGlyph` still drives the small leading badge.
 *
 * §7 survives the density: the chips still **wrap** and are never clipped. A
 * denser row is not a licence to hide the last option.
 *
 * Same props as {@link InterestPicker}. Token-pure.
 */
export declare function InterestPickerV3({ options, selectedIds, onChange, title, helper, maxSelections, accessibilityLabel, subtitle, logoGlyph, progress, onBack, onDismiss, error, ctaLabel, onContinue, loading, secondaryLabel, onSecondary, emptyMessage, style, }: InterestPickerV3Props): React.ReactElement;
//# sourceMappingURL=InterestPickerV3.d.ts.map
import * as React from 'react';
import type { InterestPickerProps } from './InterestPicker';
/** Drop-in for {@link InterestPicker} — identical props, different design. */
export type InterestPickerV2Props = InterestPickerProps;
/**
 * Interest chips — V2, the editorial line. The hero runs full-bleed to the top
 * edge with no radius and no inset, and the content rises over it on a sheet
 * whose top corners are rounded and which overlaps the seam. The chips
 * themselves keep §7 exactly: they **wrap**, they never scroll sideways, and no
 * option is ever clipped out of reach.
 *
 * Same props as {@link InterestPicker}. Token-pure.
 */
export declare function InterestPickerV2({ options, selectedIds, onChange, title, helper, maxSelections, accessibilityLabel, subtitle, illustration, logoGlyph, progress, onBack, onDismiss, error, ctaLabel, onContinue, loading, secondaryLabel, onSecondary, emptyMessage, style, }: InterestPickerV2Props): React.ReactElement;
//# sourceMappingURL=InterestPickerV2.d.ts.map
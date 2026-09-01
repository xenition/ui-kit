import * as React from 'react';
import type { SymptomSelectorProps } from './SymptomSelector';
/** Drop-in for {@link SymptomSelectorProps} — same props, the V4 "clinic" design. */
export type SymptomSelectorV4Props = SymptomSelectorProps;
/**
 * SymptomSelector — **V4** "clinic" design. A multi-select symptom chip grid
 * for intake / triage flows, presented inside a calm, elevated rounded card
 * with a soft shadow. Tap a pill to toggle a symptom; fully controlled via
 * `value` + `onChange`. A selected chip reads with a soft-primary → primary
 * fill **and** a ✓ marker, so selection never relies on color alone. Each chip
 * is a `role="checkbox"` (≥44px tap target). Renders an empty note when there
 * are no options. Identical props/behavior to {@link SymptomSelectorProps}.
 * Token-only colors via `useXenitionTheme()`. Informational UI only — not a
 * medical device.
 */
export declare function SymptomSelectorV4({ options, value, onChange, title, emptyLabel, style, }: SymptomSelectorV4Props): React.ReactElement;
//# sourceMappingURL=SymptomSelectorV4.d.ts.map
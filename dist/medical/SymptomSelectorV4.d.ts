import * as React from 'react';
import type { SymptomSelectorProps } from './SymptomSelector';
/** Drop-in for {@link SymptomSelectorProps} — same props, the V4 "clinic" design. */
export type SymptomSelectorV4Props = SymptomSelectorProps;
/**
 * SymptomSelector — **V4** "clinic" design (web parity of the native V4). A
 * multi-select symptom chip grid for intake / triage flows, presented inside a
 * calm, elevated rounded card with a soft shadow. Tap a pill to toggle a
 * symptom; fully controlled via `value` + `onChange`. A selected chip reads
 * with a soft-primary → primary fill **and** a ✓ marker, so selection never
 * relies on color alone. Each chip is a `role="checkbox"` button (keyboard +
 * `aria-checked`, ≥44px tap target). Renders an empty note when there are no
 * options. Identical props/behavior to {@link SymptomSelectorProps}. All colors
 * from `--xen-*` token classes (no literals). Informational UI only — not a
 * medical device.
 */
export declare const SymptomSelectorV4: React.ForwardRefExoticComponent<SymptomSelectorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SymptomSelectorV4.d.ts.map
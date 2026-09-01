import * as React from 'react';
import type { PetHealthLogProps } from './PetHealthLog';
/** Drop-in for {@link PetHealthLogProps} — same props, the V4 "companion" design. */
export type PetHealthLogV4Props = PetHealthLogProps;
/**
 * PetHealthLog — **V4** "companion" design (native parity of the web V4). The
 * warm, friendly take on a pet-health log: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface) wrapping a list of entry rows. Each entry
 * is a soft-primary tinted well holding the kind glyph, a labelled kind Badge, the
 * text, and a muted timestamp. Kind is conveyed by glyph + labelled Badge (never
 * color alone). Preserves the `loading` skeleton and the explicit empty state.
 * Same props/behavior as {@link PetHealthLogProps}. Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function PetHealthLogV4({ entries, title, loading, emptyLabel, style, }: PetHealthLogV4Props): React.ReactElement;
//# sourceMappingURL=PetHealthLogV4.d.ts.map
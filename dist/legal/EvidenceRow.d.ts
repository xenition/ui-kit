import * as React from 'react';
import { type EvidenceKind, type EvidenceStatus } from './internal';
export type EvidenceRowVariant = 'default' | 'compact';
export interface EvidenceRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Exhibit label / number (e.g. "Exhibit A-12"). */
    exhibit?: string;
    /** Description of the evidence item. */
    title: string;
    /** Kind of evidence — drives the leading glyph. */
    kind?: EvidenceKind;
    /** Admissibility / evidentiary status — glyph + word pill, never color alone. */
    status?: EvidenceStatus;
    /** Chain-of-custody / source label. */
    source?: string;
    /** Pre-formatted date collected / logged. */
    date?: string;
    /** Whether custody is verified (adds a "Chain verified" marker). */
    custodyVerified?: boolean;
    /** Density. */
    variant?: EvidenceRowVariant;
    /** Click handler (open the exhibit). */
    onClick?: () => void;
    testID?: string;
}
/**
 * One evidence exhibit in a matter: exhibit label, description, kind glyph, and
 * an admissibility pill (glyph + word so status never rests on color alone),
 * plus optional chain-of-custody source / date. A verified custody marker is a
 * glyph + word, not a bare color. When `onClick` is set the row is an accessible
 * `role="button"`. All colors are `--xen-*` token classes — no literals.
 */
export declare const EvidenceRow: React.ForwardRefExoticComponent<EvidenceRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EvidenceRow.d.ts.map
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type EvidenceKind, type EvidenceStatus } from './internal';
export type EvidenceRowVariant = 'default' | 'compact';
export interface EvidenceRowProps {
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
    /** Tap handler (open the exhibit). */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * One evidence exhibit in a matter: exhibit label, description, kind glyph, and
 * an admissibility pill (glyph + word so status never rests on color alone),
 * plus optional chain-of-custody source / date. A verified custody marker is a
 * glyph + word, not a bare color. All colors are theme tokens — no literals.
 */
export declare function EvidenceRow({ exhibit, title, kind, status, source, date, custodyVerified, variant, onPress, testID, style, }: EvidenceRowProps): React.ReactElement;
//# sourceMappingURL=EvidenceRow.d.ts.map
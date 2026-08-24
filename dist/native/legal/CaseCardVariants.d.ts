import * as React from 'react';
import type { CaseCardProps } from './CaseCard';
/** Alternate design — identical Props to {@link CaseCard}, drop-in swap. */
export type CaseCardV2Props = CaseCardProps;
/** Alternate design — identical Props to {@link CaseCard}, drop-in swap. */
export type CaseCardV3Props = CaseCardProps;
/**
 * CaseCard, design v2 — an **elevated** card led by a practice-area glyph tile,
 * with the status pill and priority pinned to the header. Same Props as
 * {@link CaseCard}; visually a floating, tile-anchored card rather than the flat
 * bordered original. Token-pure; status stays a glyph + word, never color alone.
 */
export declare function CaseCardV2({ caseNumber, title, client, practiceArea, status, priority, leadAttorney, nextEvent, variant, loading, onPress, onOpen, testID, style, }: CaseCardV2Props): React.ReactElement;
/**
 * CaseCard, design v3 — a **minimal single line** anchored by a status dot, for
 * the densest lists. Same Props as {@link CaseCard}; no card chrome, just a
 * pressable row with a hairline divider. The dot is decorative — the status is
 * still carried by the trailing glyph + word pill, never color alone.
 */
export declare function CaseCardV3({ caseNumber, title, client, status, priority, loading, onPress, onOpen, testID, style, }: CaseCardV3Props): React.ReactElement;
//# sourceMappingURL=CaseCardVariants.d.ts.map
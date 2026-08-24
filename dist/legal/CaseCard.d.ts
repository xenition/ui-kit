import * as React from 'react';
import { type CasePriority, type CaseStatus, type PracticeArea } from './internal';
export type CaseCardVariant = 'default' | 'compact' | 'detailed';
export interface CaseCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Case / docket number (e.g. "2026-CV-01184"). */
    caseNumber: string;
    /** Case caption / title. */
    title: string;
    /** Client name. */
    client?: string;
    /** Area of practice — glyph + word chip. */
    practiceArea?: PracticeArea;
    /** Lifecycle state — glyph + word chip, never color alone. */
    status?: CaseStatus;
    /** Priority — glyph + word chip. */
    priority?: CasePriority;
    /** Lead attorney of record (detailed variant). */
    leadAttorney?: string;
    /** Pre-formatted next-event label (detailed variant). */
    nextEvent?: string;
    /** Visual density / emphasis. */
    variant?: CaseCardVariant;
    /** Render a placeholder skeleton instead of content. */
    loading?: boolean;
    /** Click handler for the whole card (open the case). */
    onClick?: () => void;
    /** Explicit "Open case" affordance; renders a footer button when provided. */
    onOpen?: () => void;
    testID?: string;
}
/**
 * Summary card for a single case / matter file: docket number, caption, client,
 * and practice-area / status / priority chips (each a glyph + word so state
 * never rests on color alone). `compact` trims to a header row for lists;
 * `detailed` adds lead attorney and the next scheduled event. An optional
 * `onOpen` renders an explicit "Open case" button. Renders a `loading` skeleton
 * on demand. When `onClick` is set the card is an accessible `role="button"`
 * (keyboard-activable). All colors are `--xen-*` token classes — no literals.
 */
export declare const CaseCard: React.ForwardRefExoticComponent<CaseCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CaseCard.d.ts.map
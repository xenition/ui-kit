import * as React from 'react';
import { type CourtEventType, type CourtUrgency } from './internal';
export type CourtDateCardVariant = 'default' | 'compact';
export interface CourtDateCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Kind of court event — glyph + word chip. */
    type: CourtEventType;
    /** Pre-formatted date label (e.g. "Sep 14, 2026"). */
    date: string;
    /** Pre-formatted time label. */
    time?: string;
    /** Court / venue name. */
    court?: string;
    /** Judge / hearing officer. */
    judge?: string;
    /** Associated case number. */
    caseNumber?: string;
    /** Time-relative urgency — glyph + word pill (today/soon/upcoming/past). */
    urgency?: CourtUrgency;
    /** Optional countdown label (e.g. "in 3 days"). */
    countdown?: string;
    /** Density. */
    variant?: CourtDateCardVariant;
    /** Click handler. */
    onClick?: () => void;
    testID?: string;
}
/**
 * A court date / filing deadline card: a leading urgency-tinted date block, the
 * event type and urgency pills (each glyph + word so nothing rests on color
 * alone), and venue / judge / case metadata. A `today` or `soon` urgency tints
 * the date block and countdown for at-a-glance triage. When `onClick` is set the
 * card is an accessible `role="button"`. All colors are `--xen-*` token classes.
 */
export declare const CourtDateCard: React.ForwardRefExoticComponent<CourtDateCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CourtDateCard.d.ts.map
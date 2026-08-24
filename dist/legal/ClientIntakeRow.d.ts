import * as React from 'react';
import { type ConflictCheck, type IntakeStatus, type PracticeArea } from './internal';
export type ClientIntakeRowVariant = 'default' | 'compact';
export interface ClientIntakeRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Prospective client name. */
    name: string;
    /** Matter type / practice area of the inquiry. */
    practiceArea?: PracticeArea;
    /** Intake stage — glyph + word pill, never color alone. */
    status?: IntakeStatus;
    /** Conflict-check outcome — glyph + word pill. */
    conflict?: ConflictCheck;
    /** Pre-formatted inquiry date / source label. */
    source?: string;
    /** Short summary of the matter. */
    summary?: string;
    /** Avatar image URL (initials fallback otherwise). */
    avatarUrl?: string;
    /** Density. */
    variant?: ClientIntakeRowVariant;
    /** Render the accept/decline action row. */
    actionable?: boolean;
    /** Accept / retain the prospective client. */
    onAccept?: () => void;
    /** Decline the inquiry. */
    onDecline?: () => void;
    /** Click handler for the whole row. */
    onClick?: () => void;
    testID?: string;
}
/**
 * A prospective-client intake row: name, matter type, intake stage and
 * conflict-check pills (each a glyph + word so state never rests on color
 * alone). When `actionable` and still open, an accept/decline row of real
 * `<button>`s is shown (Accept is disabled on a hard conflict). When `onClick`
 * is set the row is an accessible `role="button"`. All colors are `--xen-*`
 * token classes — no literals.
 */
export declare const ClientIntakeRow: React.ForwardRefExoticComponent<ClientIntakeRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ClientIntakeRow.d.ts.map
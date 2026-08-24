import * as React from 'react';
/** Layout of a {@link SpeakerCard}. */
export type SpeakerCardVariant = 'row' | 'stacked';
export interface SpeakerCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Speaker name. */
    name: string;
    /** Role / title, e.g. `Principal Engineer`. */
    role?: string;
    /** Company / organisation. */
    company?: string;
    /** Avatar image URL (initials fallback when absent). */
    avatarUrl?: string;
    /** Short bio (clamped to 3 lines in `stacked`, 2 in `row`). */
    bio?: string;
    /** Optional 0–5 rating shown as stars. */
    rating?: number;
    /** Topic / track tags. */
    tags?: string[];
    /** `row` (horizontal, list-friendly) or `stacked` (centered profile). */
    variant?: SpeakerCardVariant;
}
/**
 * Speaker profile card built on the `Avatar` and `Rating` primitives. `row`
 * lays the avatar beside the details for lists; `stacked` centers a larger
 * avatar for a profile header. Role and company collapse gracefully when
 * absent. Passing `onClick` makes the whole card an accessible button. Colors
 * come from the `--xen-*` tokens; no literal colors.
 */
export declare const SpeakerCard: React.ForwardRefExoticComponent<SpeakerCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SpeakerCard.d.ts.map
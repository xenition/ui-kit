import * as React from 'react';
export type LostPetStatus = 'lost' | 'sighted' | 'found' | 'reunited';
export interface LostPetAlertProps {
    /** Pet's name. */
    name: string;
    /** Alert status; drives the banner tint, chip, and icon. */
    status: LostPetStatus;
    /** Last-seen location description. */
    lastSeen?: string;
    /** When last seen (already formatted). */
    lastSeenAt?: string;
    /** Reward label, e.g. "$500". */
    reward?: string;
    /** Short description / distinguishing marks. */
    description?: string;
    /** Contact phone / handle. */
    contact?: string;
    /** Whether to render the static map placeholder. */
    showMap?: boolean;
    /** Report-sighting action label; hidden when reunited/found or no handler. */
    reportLabel?: string;
    onReportSighting?: () => void;
    onShare?: () => void;
    /** Extra classes on the root. */
    className?: string;
}
/**
 * A high-visibility lost-pet alert banner: status chip + icon, pet name, last-
 * seen location/time, reward, and a dependency-free static map placeholder.
 * Exposes report-sighting + share actions for active alerts. Uses `role="alert"`
 * and conveys status by icon + label, not color alone. The tint is a token color
 * at reduced alpha (`bg-<slot>/10`) — no literal colors.
 */
export declare const LostPetAlert: React.ForwardRefExoticComponent<LostPetAlertProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LostPetAlert.d.ts.map
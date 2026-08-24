import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    /** Report-sighting action label; hidden when reunited or no handler. */
    reportLabel?: string;
    onReportSighting?: () => void;
    onShare?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A high-visibility lost-pet alert banner: status chip + icon, pet name, last-
 * seen location/time, reward, and a static map placeholder (a real map needs a
 * native maps dep this kit doesn't bundle). Exposes report-sighting + share
 * actions for active alerts. Uses `alert` a11y role and conveys status by icon +
 * label, not color alone. Tint is a token color at reduced alpha — no literals.
 */
export declare function LostPetAlert({ name, status, lastSeen, lastSeenAt, reward, description, contact, showMap, reportLabel, onReportSighting, onShare, style, }: LostPetAlertProps): React.ReactElement;
//# sourceMappingURL=LostPetAlert.d.ts.map
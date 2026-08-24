import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Presentation density for a {@link DriverCard}. */
export type DriverCardVariant = 'default' | 'compact' | 'assigned';
export interface DriverCardProps {
    /** Driver display name. */
    name: string;
    /** Optional driver avatar URL. */
    avatarUrl?: string;
    /** Driver star rating (0–5). */
    rating?: number;
    /** Number of completed trips. */
    tripCount?: number;
    /** Vehicle description, e.g. `'Toyota Prius · White'`. */
    vehicle?: string;
    /** License plate, shown as a token-chip. */
    plate?: string;
    /** ETA to pickup, pre-formatted (e.g. `'4 min'`). */
    etaLabel?: string;
    /** Whether the driver is currently online/available. */
    online?: boolean;
    /** Presentation variant. `assigned` foregrounds the ETA. */
    variant?: DriverCardVariant;
    /** Fires when the message action is pressed. */
    onMessage?: () => void;
    /** Fires when the call action is pressed. */
    onCall?: () => void;
    /** Fires when the whole card is pressed (profile). */
    onPress?: () => void;
    /** Placeholder skeleton while the driver loads. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A driver identity block — avatar, name, star rating, trip count, the assigned
 * vehicle and plate, an online/offline state, and an optional ETA. Availability
 * is conveyed by a text-labelled badge (not color alone). Data +
 * `onMessage`/`onCall`/`onPress` callbacks only; nothing fetches. Colors come
 * from semantic tokens and `withAlpha` tints — no literal colors.
 * `variant="assigned"` highlights the ETA; `variant="compact"` tightens it.
 */
export declare function DriverCard({ name, avatarUrl, rating, tripCount, vehicle, plate, etaLabel, online, variant, onMessage, onCall, onPress, loading, style, }: DriverCardProps): React.ReactElement;
//# sourceMappingURL=DriverCard.d.ts.map
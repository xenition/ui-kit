import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ShipmentStatus, type CarrierCode } from './internal';
export type ShipmentCardVariant = 'default' | 'compact';
export interface ShipmentCardProps {
    /** Tracking number / shipment id (rendered as the headline). */
    trackingNumber: string;
    /** Human recipient / customer name. */
    recipient?: string;
    /** Origin location label. */
    origin?: string;
    /** Destination location label. */
    destination?: string;
    /** Lifecycle status — carried by glyph + word, never color alone. */
    status: ShipmentStatus;
    /** Carrier code for the inline `CarrierBadge`. */
    carrier?: CarrierCode;
    /** Carrier service level (e.g. `Ground`, `2-Day`). */
    service?: string;
    /** Human ETA line (e.g. `Tomorrow by 8 PM`). */
    eta?: string;
    /** Package count for a multi-piece shipment. */
    pieces?: number;
    /** Layout density. `compact` drops the origin→destination row. */
    variant?: ShipmentCardVariant;
    /** Loading skeleton (no data yet). */
    loading?: boolean;
    /** Makes the whole card tappable. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Summary card for one shipment: tracking number headline, a glyph + word
 * status badge, an inline `CarrierBadge`, origin→destination, ETA and piece
 * count. Status meaning is text-first (badge label + glyph), with tone as
 * reinforcement only. Tappable when `onPress` is set (button role + label);
 * otherwise a static summary. Loading renders a muted skeleton. All colors are
 * theme tokens.
 */
export declare function ShipmentCard({ trackingNumber, recipient, origin, destination, status, carrier, service, eta, pieces, variant, loading, onPress, testID, style, }: ShipmentCardProps): React.ReactElement;
//# sourceMappingURL=ShipmentCard.d.ts.map
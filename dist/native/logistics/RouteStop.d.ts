import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type StopStatus } from './internal';
export interface RouteStopProps {
    /** 1-based stop sequence number shown in the marker. */
    sequence: number;
    /** Address / place name (headline). */
    address: string;
    /** Recipient / customer or note sub-line. */
    recipient?: string;
    /** Stop status — glyph + word, never color alone. */
    status: StopStatus;
    /** Human ETA / window (e.g. `9:00–9:30 AM`). */
    eta?: string;
    /** Number of packages to drop at this stop. */
    packages?: number;
    /** Draws the connector line down to the next stop (false for the last). */
    connected?: boolean;
    /** Makes the stop tappable. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * One stop on a delivery route: a numbered sequence marker joined by a
 * connector rail, the address + recipient, an ETA/window and a package count.
 * The stop status is carried by a glyph + word chip (tone as reinforcement),
 * and the marker fills with the status tone once the stop is completed. All
 * colors are theme tokens.
 */
export declare function RouteStop({ sequence, address, recipient, status, eta, packages, connected, onPress, testID, style, }: RouteStopProps): React.ReactElement;
//# sourceMappingURL=RouteStop.d.ts.map
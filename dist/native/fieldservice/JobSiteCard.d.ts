import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Site activity state — text + glyph + color (never color-alone). */
export type JobSiteStatus = 'active' | 'scheduled' | 'completed' | 'blocked';
export interface JobSiteCardProps {
    /** Site / customer name (e.g. "Riverside Plaza"). */
    name: string;
    /** Street address, already formatted by the caller. */
    address: string;
    /** Activity status. */
    status: JobSiteStatus;
    /** Number of crew currently assigned to the site. */
    crewCount?: number;
    /** Count of open work orders at the site. */
    openOrders?: number;
    /** Localized distance string (e.g. "3.2 mi"). */
    distance?: string;
    /** Leading glyph for the site disc (emoji or symbol). */
    glyph?: string;
    /** Fires when the navigate/directions action is pressed. */
    onNavigate?: () => void;
    /** Fires on card press; the card is only a button when supplied. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A summary card for a job site. A tinted leading glyph disc, name/address
 * stack, a status pill (text + glyph + a color that traces to a
 * `SemanticColors` slot — never color alone), crew / open-order / distance
 * meta, and an optional "Directions" action. Becomes a pressable button only
 * when `onPress` is supplied. Every color traces to a token or a tint — no
 * literals.
 */
export declare function JobSiteCard({ name, address, status, crewCount, openOrders, distance, glyph, onNavigate, onPress, style, }: JobSiteCardProps): React.ReactElement;
//# sourceMappingURL=JobSiteCard.d.ts.map
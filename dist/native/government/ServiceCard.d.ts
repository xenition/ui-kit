import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Category of a public / civic service — drives the leading glyph + label. */
export type ServiceCategory = 'license' | 'permit' | 'tax' | 'records' | 'benefit' | 'health' | 'utility' | 'other';
/** How the service is delivered — a non-color-alone availability hint. */
export type ServiceChannel = 'online' | 'in-person' | 'phone' | 'unavailable';
export interface ServiceCardProps {
    /** Service category — picks the tinted leading glyph + category label. */
    category: ServiceCategory;
    /** Service title (e.g. "Renew driver license"). */
    title: string;
    /** Optional one-line description of what the service does. */
    description?: string;
    /** Delivery channel — rendered as a text+glyph availability badge. */
    channel?: ServiceChannel;
    /** Typical processing / turnaround time (already localized). */
    estimatedTime?: string;
    /** Label for the primary action button (only shown with `onStart`). */
    actionLabel?: string;
    /** Fires when the action button is pressed (e.g. begin the service). */
    onStart?: () => void;
    /** Fires when the whole card is pressed; card is a button only when set. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single public-service tile for a civic app home / directory. The `category`
 * selects a tinted leading glyph disc; a `channel` badge conveys availability by
 * **text + glyph + color** (never color alone). An optional primary `Button`
 * fires `onStart`, and the whole card becomes a button only when `onPress` is
 * supplied. Every color traces to a `SemanticColors` slot or a token-derived
 * tint — no literals.
 */
export declare function ServiceCard({ category, title, description, channel, estimatedTime, actionLabel, onStart, onPress, style, }: ServiceCardProps): React.ReactElement;
//# sourceMappingURL=ServiceCard.d.ts.map
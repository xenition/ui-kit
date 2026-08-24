import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Category of a public notice / announcement. */
export type NoticeCategory = 'hearing' | 'meeting' | 'roadwork' | 'election' | 'ordinance' | 'bid' | 'general';
export interface PublicNoticeCardProps {
    /** Notice category — drives the leading glyph + a category badge. */
    category: NoticeCategory;
    /** Notice headline. */
    title: string;
    /** Body / summary text (truncated by the caller as needed). */
    body?: string;
    /** Issuing agency / department. */
    agency?: string;
    /** Localized posted / effective date. */
    date?: string;
    /** Location the notice concerns (address, venue, ward). */
    location?: string;
    /** Marks the notice as new / unread (a text+glyph pill, not color alone). */
    isNew?: boolean;
    /** Fires on card press (open full notice); card is a button only when set. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A public-notice / civic-announcement card for a notices feed. The `category`
 * selects a tinted leading glyph and a labelled badge (text + glyph + color,
 * never color alone), with optional agency / date / location metadata and a
 * "New" flag. Becomes a button only when `onPress` is supplied. Every color
 * traces to a `SemanticColors` slot or a token-derived tint — no literals.
 */
export declare function PublicNoticeCard({ category, title, body, agency, date, location, isNew, onPress, style, }: PublicNoticeCardProps): React.ReactElement;
//# sourceMappingURL=PublicNoticeCard.d.ts.map
import * as React from 'react';
/** Category of a public notice / announcement. */
export type NoticeCategory = 'hearing' | 'meeting' | 'roadwork' | 'election' | 'ordinance' | 'bid' | 'general';
export interface PublicNoticeCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
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
    /** Fires on card click (open full notice); card is a button only when set. */
    onClick?: () => void;
}
/**
 * A public-notice / civic-announcement card for a notices feed. The `category`
 * selects a tinted leading glyph and a labelled badge (text + glyph + color,
 * never color alone), with optional agency / date / location metadata and a
 * "New" flag. Becomes a keyboard-operable button only when `onClick` is
 * supplied. Token-bound throughout — no literal colors. Web parity of the native
 * `PublicNoticeCard`.
 */
export declare const PublicNoticeCard: React.ForwardRefExoticComponent<PublicNoticeCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PublicNoticeCard.d.ts.map
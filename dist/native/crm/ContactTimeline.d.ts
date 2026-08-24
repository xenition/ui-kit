import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ActivityKind } from './internal';
export interface TimelineItem {
    id: string;
    /** Activity kind — drives the node glyph + tone. */
    kind: ActivityKind;
    /** Headline for the event. */
    title: string;
    /** Optional detail line. */
    detail?: string;
    /** Who did it. */
    actor?: string;
    /** Pre-formatted timestamp. */
    timestamp?: string;
}
export interface ContactTimelineProps {
    /** Chronological events (caller controls ordering). */
    items: TimelineItem[];
    /** Fired when an event is tapped. */
    onItemPress?: (item: TimelineItem) => void;
    /** Show a skeleton instead of content. */
    loading?: boolean;
    /** Placeholder when there are no events. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Vertical activity timeline for a contact / deal: each event is a glyph node
 * (kind → glyph + tone, matching {@link ActivityLogRow}) on a connector rail,
 * with title, detail and an actor · timestamp meta line. The connector is
 * suppressed on the last node via guarded indexing. Renders a `loading`
 * skeleton and an `emptyLabel` placeholder. All colors are theme tokens; node
 * tints use `withAlpha` over a token.
 */
export declare function ContactTimeline({ items, onItemPress, loading, emptyLabel, style, }: ContactTimelineProps): React.ReactElement;
//# sourceMappingURL=ContactTimeline.d.ts.map
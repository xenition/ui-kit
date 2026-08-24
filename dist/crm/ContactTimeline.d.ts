import * as React from 'react';
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
export interface ContactTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Chronological events (caller controls ordering). */
    items: TimelineItem[];
    /** Fired when an event is activated. */
    onItemClick?: (item: TimelineItem) => void;
    /** Show a skeleton instead of content. */
    loading?: boolean;
    /** Placeholder when there are no events. */
    emptyLabel?: string;
}
/**
 * Vertical activity timeline for a contact / deal: each event is a glyph node
 * (kind → glyph + tone, matching {@link ACTIVITY_META}) on a connector rail,
 * with title, detail and an actor · timestamp meta line. The connector is
 * suppressed on the last node via guarded indexing. Renders a `loading` skeleton
 * and an `emptyLabel` placeholder. All colors are `--xen-*` token classes; node
 * glyphs are tone-colored over a `bg-neutral-100` chip.
 */
export declare const ContactTimeline: React.ForwardRefExoticComponent<ContactTimelineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ContactTimeline.d.ts.map
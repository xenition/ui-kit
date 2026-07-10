import * as React from 'react';
export type TimelineTone = 'primary' | 'success' | 'warn' | 'danger' | 'neutral';
export interface TimelineItemData {
    title: React.ReactNode;
    description?: React.ReactNode;
    time?: React.ReactNode;
    tone?: TimelineTone;
}
export interface TimelineProps {
    items: TimelineItemData[];
    className?: string;
}
/** Vertical activity timeline bound to the theme tokens. */
export declare function Timeline({ items, className }: TimelineProps): React.ReactElement;
//# sourceMappingURL=Timeline.d.ts.map
import * as React from 'react';
export interface DaySegmentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Segment labels, rendered left→right. */
    options: string[];
    /** Index of the currently selected segment. */
    selectedIndex: number;
    /** Fired with the tapped segment index. */
    onSelect: (index: number) => void;
}
/**
 * DaySegment — a segmented pill selector on the page surface (web parity of the
 * native `DaySegment`). An inline pill-shaped, bordered `surface` track holding
 * one `role="tab"` button per option; the selected tab fills with `primary` and
 * flips its text to `on-primary`, the rest read as `on-surface`. Every color
 * comes from `--xen-*` Tailwind classes, no literals.
 */
export declare const DaySegment: React.ForwardRefExoticComponent<DaySegmentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DaySegment.d.ts.map
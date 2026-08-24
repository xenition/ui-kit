import * as React from 'react';
import { type CrmTone } from './internal';
export interface FilterTag {
    /** Stable key (returned by `onToggle`). */
    key: string;
    /** Visible label. */
    label: string;
    /** Optional count shown after the label. */
    count?: number;
}
export interface TagFilterBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
    /** Available filter chips. */
    tags: FilterTag[];
    /** Keys currently selected (controlled). */
    selected: string[];
    /** Fired with the toggled key. */
    onToggle: (key: string) => void;
    /** When set, shows a "Clear" chip while any filter is active. */
    onClear?: () => void;
    /** Selected-chip tone (default `primary`). */
    tone?: CrmTone;
    /** Placeholder when there are no tags. */
    emptyLabel?: string;
}
/**
 * Horizontally scrolling filter bar of toggleable chips (segments, tags,
 * sources). Selection state is conveyed by a filled tone **and** the chip's
 * `aria-pressed` state plus a leading ✓ glyph (not color alone). Controlled via
 * `selected` + a per-key `onToggle`; an optional `onClear` chip appears while any
 * filter is active. Guards an empty `tags` array. All colors are `--xen-*` token
 * classes.
 */
export declare const TagFilterBar: React.ForwardRefExoticComponent<TagFilterBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TagFilterBar.d.ts.map
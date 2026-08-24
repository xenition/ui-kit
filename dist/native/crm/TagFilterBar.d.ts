import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { CrmTone } from './internal';
export interface FilterTag {
    /** Stable key (returned by `onToggle`). */
    key: string;
    /** Visible label. */
    label: string;
    /** Optional count shown after the label. */
    count?: number;
}
export interface TagFilterBarProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * Horizontally scrolling filter bar of toggleable chips (segments, tags,
 * sources). Selection state is conveyed by a filled tone **and** the chip's
 * `selected` a11y state (not color alone). Controlled via `selected` + a
 * per-key `onToggle`; an optional `onClear` chip appears while any filter is
 * active. Guards an empty `tags` array. Colors are theme tokens; the idle chip
 * fill uses `withAlpha` over a token.
 */
export declare function TagFilterBar({ tags, selected, onToggle, onClear, tone, emptyLabel, style, }: TagFilterBarProps): React.ReactElement;
//# sourceMappingURL=TagFilterBar.d.ts.map
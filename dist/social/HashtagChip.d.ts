import * as React from 'react';
export type HashtagChipSize = 'sm' | 'md';
export interface HashtagChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    /** Tag text — a leading `#` is added automatically if missing. */
    tag: string;
    /** Filled/primary appearance when the tag is selected/active. */
    active?: boolean;
    /** Optional post count shown after the tag (e.g. `1.2k`). */
    count?: string | number;
    size?: HashtagChipSize;
    /** Fires with the bare tag (no `#`). */
    onClick?: (tag: string) => void;
}
/**
 * A clickable hashtag pill. Idle chips read primary-on-surface with a border;
 * `active` chips fill with the primary color. Composes into topic bars,
 * trending lists, and post footers. Token-only; `aria-pressed` encodes the
 * active state (not color alone).
 */
export declare const HashtagChip: React.ForwardRefExoticComponent<HashtagChipProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=HashtagChip.d.ts.map
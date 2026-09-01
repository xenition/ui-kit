import * as React from 'react';
import type { HashtagChipProps } from './HashtagChip';
/** Drop-in for {@link HashtagChipProps} — same props, the V4 "feed" design. */
export type HashtagChipV4Props = HashtagChipProps;
/**
 * HashtagChip — **V4** "feed" design (web parity of the native V4). A rounded
 * soft-primary chip: `#tag` rendered in primary on a `bg-primary/10` tint,
 * tappable. When `active` it fills with the primary color. Same props/behavior
 * as {@link HashtagChipProps}; all colors from `--xen-*` token classes (no
 * literals). `aria-pressed` encodes the active state (not color alone).
 */
export declare const HashtagChipV4: React.ForwardRefExoticComponent<HashtagChipProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=HashtagChipV4.d.ts.map
import * as React from 'react';
import type { HashtagChipProps } from './HashtagChip';
/** Drop-in for {@link HashtagChipProps} — same props, the V4 "feed" design. */
export type HashtagChipV4Props = HashtagChipProps;
/**
 * HashtagChip — **V4** "feed" design. A rounded soft-primary chip: `#tag`
 * rendered in primary on a soft-primary tint, tappable with a ≥44px target.
 * When `active` it fills with the primary color. Same props/behavior as
 * {@link HashtagChipProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`, `link` a11y role.
 */
export declare function HashtagChipV4({ tag, active, count, size, onPress, style, }: HashtagChipV4Props): React.ReactElement;
//# sourceMappingURL=HashtagChipV4.d.ts.map
import * as React from 'react';
import type { AuthorBylineProps } from './AuthorByline';
/** Drop-in replacement for {@link AuthorByline} — identical props. */
export type AuthorBylineV3Props = AuthorBylineProps;
/**
 * AuthorByline — **centered stacked** alternate design.
 *
 * A vertically centered credit: the avatar sits on top, the name below it, then
 * the role, then a middot-joined date/read-time line — the layout you see under
 * a centered article title or at the end of a feature. Same props as
 * {@link AuthorByline}, so it is a drop-in swap.
 *
 * Token-pure: name is `colors.onSurface`, role/meta are `colors.muted`. No
 * literal colors.
 */
export declare function AuthorBylineV3({ author, date, readingTime, variant, style, }: AuthorBylineV3Props): React.ReactElement;
//# sourceMappingURL=AuthorBylineV3.d.ts.map
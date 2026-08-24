import * as React from 'react';
import type { AuthorBylineProps } from './AuthorByline';
/** Drop-in replacement for {@link AuthorByline} — identical props. */
export type AuthorBylineV3Props = AuthorBylineProps;
/**
 * AuthorByline — **centered stacked** alternate design (web / React DOM).
 *
 * A vertically centered credit: the avatar sits on top, the name below it, then
 * the role, then a middot-joined date/read-time line — the layout you see under
 * a centered article title or at the end of a feature. Same props as
 * {@link AuthorByline}, so it is a drop-in swap.
 *
 * Token-pure: name is `text-on-surface`, role/meta are `text-muted`. No literal
 * colors.
 */
export declare const AuthorBylineV3: React.ForwardRefExoticComponent<AuthorBylineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AuthorBylineV3.d.ts.map
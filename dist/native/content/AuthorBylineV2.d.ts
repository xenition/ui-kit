import * as React from 'react';
import type { AuthorBylineProps } from './AuthorByline';
/** Drop-in replacement for {@link AuthorByline} — identical props. */
export type AuthorBylineV2Props = AuthorBylineProps;
/**
 * AuthorByline — **enclosed author chip** alternate design.
 *
 * The credit sits inside a soft primary-tinted rounded card: avatar, then a
 * "Written by" label over the name, with role and date/read-time on a meta line.
 * A contained attribution block versus the v1 bare row. Same props as
 * {@link AuthorByline}, so it is a drop-in swap.
 *
 * Token-pure: the fill/border are `withAlpha(colors.primary, …)`, the label is
 * `colors.primaryText`. No literal colors.
 */
export declare function AuthorBylineV2({ author, date, readingTime, variant, style, }: AuthorBylineV2Props): React.ReactElement;
//# sourceMappingURL=AuthorBylineV2.d.ts.map
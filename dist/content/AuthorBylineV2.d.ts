import * as React from 'react';
import type { AuthorBylineProps } from './AuthorByline';
/** Drop-in replacement for {@link AuthorByline} — identical props. */
export type AuthorBylineV2Props = AuthorBylineProps;
/**
 * AuthorByline — **enclosed author chip** alternate design (web / React DOM).
 *
 * The credit sits inside a soft primary-tinted rounded card: avatar, then a
 * "Written by" label over the name, with role and date/read-time on a meta line.
 * A contained attribution block versus the base bare row. Same props as
 * {@link AuthorByline}, so it is a drop-in swap.
 *
 * Token-pure: the fill/border are `bg-primary/10` / `border-primary/20`, the
 * label is `text-primary`. No literal colors.
 */
export declare const AuthorBylineV2: React.ForwardRefExoticComponent<AuthorBylineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AuthorBylineV2.d.ts.map
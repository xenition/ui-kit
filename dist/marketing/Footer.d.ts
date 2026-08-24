import * as React from 'react';
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
    /** Brand slot rendered as the first (wider) column. */
    logo?: React.ReactNode;
    /** Bottom bar content (copyright, social icons, …). */
    bottom?: React.ReactNode;
}
/**
 * Multi-column marketing footer. `children` are `FooterColumn`s; `bottom`
 * renders in a bordered bar under the columns.
 */
export declare const Footer: React.ForwardRefExoticComponent<FooterProps & React.RefAttributes<HTMLElement>>;
export interface FooterColumnProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Column heading. */
    title: React.ReactNode;
}
/** One link group in the footer (children are the links). */
export declare const FooterColumn: React.ForwardRefExoticComponent<FooterColumnProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Footer.d.ts.map
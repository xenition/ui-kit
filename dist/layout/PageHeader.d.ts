import * as React from 'react';
export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
    subtitle?: string;
    /** Trailing action node(s) (e.g. buttons) rendered opposite the title. */
    actions?: React.ReactNode;
}
/**
 * Screen header: a prominent `title` with optional `subtitle` on the left and an
 * `actions` slot on the right, laid out over a token bottom border. Type sizes,
 * colors, and spacing trace to the theme tokens; no literal colors.
 */
export declare const PageHeader: React.ForwardRefExoticComponent<PageHeaderProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=PageHeader.d.ts.map
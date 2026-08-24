import * as React from 'react';
export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Optional page title rendered at the top. */
    title?: string;
    /** Optional subtitle under the title. */
    subtitle?: string;
    /** Trailing header slot next to the title (e.g. a primary action). */
    headerAction?: React.ReactNode;
    children: React.ReactNode;
}
/**
 * The outer wrapper for a page/screen: fills with the `surface` token and
 * applies consistent padding. Renders an optional title/subtitle header with a
 * trailing action. Token-only.
 */
export declare const PageContainer: React.ForwardRefExoticComponent<PageContainerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PageContainer.d.ts.map
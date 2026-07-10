import * as React from 'react';
export interface BreadcrumbItem {
    label: React.ReactNode;
    href?: string;
    onClick?: () => void;
}
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    className?: string;
}
/** Breadcrumb trail bound to the theme tokens. The last item is the current page. */
export declare function Breadcrumb({ items, separator, className }: BreadcrumbProps): React.ReactElement;
//# sourceMappingURL=Breadcrumb.d.ts.map
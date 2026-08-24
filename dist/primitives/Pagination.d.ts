import * as React from 'react';
export interface PaginationProps {
    /** Current 1-based page. */
    page: number;
    /** Total number of pages. */
    pageCount: number;
    onPageChange: (page: number) => void;
    /** How many pages to show either side of the current one (default 1). */
    siblingCount?: number;
    className?: string;
}
/** Page navigation bound to the theme tokens, with ellipsis truncation. */
export declare function Pagination({ page, pageCount, onPageChange, siblingCount, className, }: PaginationProps): React.ReactElement | null;
//# sourceMappingURL=Pagination.d.ts.map
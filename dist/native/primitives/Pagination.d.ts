import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface PaginationProps {
    /** Current 1-based page. */
    page: number;
    /** Total number of pages. */
    pageCount: number;
    onPageChange: (page: number) => void;
    /** How many pages to show either side of the current one (default 1). */
    siblingCount?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Page navigation — the native mirror of the web `Pagination`, with the same
 * ellipsis truncation. Prev/next arrows plus numbered page buttons, all
 * token-bound. Returns null when there is a single page. No literal colors.
 */
export declare function Pagination({ page, pageCount, onPageChange, siblingCount, style, }: PaginationProps): React.ReactElement | null;
//# sourceMappingURL=Pagination.d.ts.map
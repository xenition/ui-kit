import * as React from 'react';
export type ResultStatus = 'success' | 'error' | 'empty' | '404';
export interface ResultProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    status?: ResultStatus;
    title: React.ReactNode;
    description?: React.ReactNode;
    /** Primary action button label. */
    actionLabel?: string;
    onAction?: () => void;
    /** Override the default status glyph. */
    icon?: React.ReactNode;
}
/**
 * Full-page result state — a centered status glyph, title, description, and
 * optional primary action for success / error / empty / 404 outcomes. The glyph
 * tone maps to a semantic token (`success`→success, `error`→danger, `empty` and
 * `404`→muted); title is `on-surface`, description `muted`. The action reuses
 * the primary/`on-primary` button convention. No literal colors.
 */
export declare const Result: React.ForwardRefExoticComponent<ResultProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Result.d.ts.map
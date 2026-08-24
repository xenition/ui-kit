import * as React from 'react';
export interface EmptyDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Headline, e.g. "Nothing here yet". */
    title: string;
    /** One or two lines explaining what to do next. */
    message?: string;
    /** Label for the single dominant action button. */
    actionLabel?: string;
    onAction?: () => void;
    /** Optional decorative slot above the title (illustration-less by default). */
    icon?: React.ReactNode;
}
/**
 * A first-run / empty dashboard state (design.md §15): a centered headline, a
 * short guiding message, and exactly one dominant action. Illustration-less by
 * default. Token-only.
 */
export declare const EmptyDashboard: React.ForwardRefExoticComponent<EmptyDashboardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EmptyDashboard.d.ts.map
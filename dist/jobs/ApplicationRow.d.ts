import * as React from 'react';
import type { Application } from './types';
export interface ApplicationRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The application to render. */
    application: Application;
    /** Fired when the row is pressed (open application detail). `onPress` → `onClick`. */
    onClick?: (application: Application) => void;
    /** Trailing accessory (e.g. a chevron or action button). */
    accessory?: React.ReactNode;
}
/**
 * A single row in the "my applications" list: company avatar, job title,
 * applied age, and a compact {@link StatusPipeline} showing where it sits in the
 * funnel (with rejection called out as text). Data + `onClick` only; tokens only.
 */
export declare const ApplicationRow: React.ForwardRefExoticComponent<ApplicationRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ApplicationRow.d.ts.map
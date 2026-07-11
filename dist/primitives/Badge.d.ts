import * as React from 'react';
export type BadgeTone = 'neutral' | 'muted' | 'primary' | 'success' | 'warn' | 'danger';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: BadgeTone;
}
/** Small status/label pill bound to the theme tokens — for statuses, tags, counts. */
export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=Badge.d.ts.map
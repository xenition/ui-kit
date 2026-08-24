import * as React from 'react';
export type CalloutTone = 'info' | 'success' | 'warn' | 'danger' | 'neutral';
export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    tone?: CalloutTone;
    /** Leading icon node (e.g. an `<Icon glyph="💡" />`). */
    icon?: React.ReactNode;
    /** Bold heading above the body. */
    title?: React.ReactNode;
}
/**
 * Callout — a lightweight boxed emphasis block for asides and tips, lighter
 * than `Banner` (no solid fill). A `surface` card with a full 1px border tinted
 * to the tone token and a tone-tinted title, plus an optional leading icon.
 * Body copy stays `on-surface`. No literal colors.
 */
export declare const Callout: React.ForwardRefExoticComponent<CalloutProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Callout.d.ts.map
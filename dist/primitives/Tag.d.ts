import * as React from 'react';
export type TagTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';
export type TagVariant = 'solid' | 'soft' | 'outline';
export type TagSize = 'sm' | 'md';
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: TagTone;
    /** `solid` (default) is the historical fill; `soft` tints it; `outline` rings it. */
    variant?: TagVariant;
    /** Size scale. Defaults to the historical `md`. */
    size?: TagSize;
    /** Force the remove (×) affordance even without `onRemove`. */
    removable?: boolean;
    /** Leading status dot. */
    dot?: boolean;
    /** Renders a remove (×) button that calls this. */
    onRemove?: () => void;
}
/**
 * Removable chip/tag bound to the theme tokens — for filters, keywords,
 * multi-select values. The default (`neutral`, `solid`, `md`) renders exactly
 * as before; the `accent` tone, `soft`/`outline` variants, `sm` size, a leading
 * `dot`, and a `removable` flag (× also shows whenever `onRemove` is set) are
 * additive opt-ins mirroring the native `Tag`. No literal colors.
 */
export declare const Tag: React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=Tag.d.ts.map
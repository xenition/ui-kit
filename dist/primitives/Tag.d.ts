import * as React from 'react';
export type TagTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: TagTone;
    /** Renders a remove (×) button that calls this. */
    onRemove?: () => void;
}
/** Removable chip/tag bound to the theme tokens — for filters, keywords, multi-select values. */
export declare const Tag: React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=Tag.d.ts.map
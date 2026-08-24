import * as React from 'react';
/** Task priority levels, low → urgent. */
export type PriorityLevel = 'low' | 'med' | 'high' | 'urgent';
export interface PriorityTagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** Priority level to render. */
    level: PriorityLevel;
    /** Custom label; defaults to a capitalized level name. */
    label?: string;
    /** Dot-only mode (no text) — for dense rows. */
    dotOnly?: boolean;
}
/**
 * Small priority pill — a token-bound background/foreground per level, with a
 * `dotOnly` mode that collapses to a colored dot for dense task rows. Every color
 * traces to an `--xen-*` token class. Web parity of the native `PriorityTag`
 * (`onPress` → n/a). No literal colors.
 */
export declare const PriorityTag: React.ForwardRefExoticComponent<PriorityTagProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=PriorityTag.d.ts.map
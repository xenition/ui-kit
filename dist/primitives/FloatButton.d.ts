import * as React from 'react';
export type FloatButtonPlacement = 'bottom-right' | 'bottom-left' | 'bottom-center';
export interface FloatButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** Leading glyph/icon node (e.g. an `<Icon glyph="+" />`). */
    icon?: React.ReactNode;
    /** Optional text — when present the FAB expands into a pill. */
    label?: string;
    /** Where the FAB anchors over the viewport (default `bottom-right`). */
    placement?: FloatButtonPlacement;
}
/**
 * Floating action button — a circular (or pill, when `label` is set) primary
 * affordance `fixed` to a viewport corner. Background is the `primary` token,
 * content the `on-primary` token. Anchored by `placement`; override via
 * `className`. No literal colors.
 */
export declare const FloatButton: React.ForwardRefExoticComponent<FloatButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=FloatButton.d.ts.map
import * as React from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /**
     * When set, the button renders as an anchor (`<a href>`) styled identically
     * via the same variant/size classes — for navigation CTAs (external links,
     * or wrap this in a router `<Link>`). The `type` prop is ignored in this
     * form. Existing `<Button onClick>` usage is unaffected.
     */
    href?: string;
    /** Anchor `target` (only applied when `href` is set), e.g. `_blank`. */
    target?: React.HTMLAttributeAnchorTarget;
    /** Anchor `rel` (only applied when `href` is set), e.g. `noreferrer`. */
    rel?: string;
}
/**
 * Themed button. All colors/radii come from the `--xen-*` tokens via the
 * Tailwind preset — no literal colors (kit lint rule).
 *
 * Pass `href` to render a styled `<a>` instead of a `<button>` (navigation
 * CTAs); everything else — variants, sizes, ref forwarding — is identical.
 */
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
//# sourceMappingURL=Button.d.ts.map
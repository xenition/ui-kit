import * as React from 'react';
export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
    /** Brand slot (logo image, wordmark, …). */
    logo?: React.ReactNode;
    /** Right-side slot (sign-in button, theme toggle, …). */
    actions?: React.ReactNode;
    /** Scroll distance in px after which the blur/border chrome appears. */
    scrollThreshold?: number;
    /** Accessible label for the mobile menu button. */
    menuLabel?: string;
}
/**
 * Sticky marketing navbar: transparent at the top of the page, gaining a
 * translucent backdrop-blur bar once scrolled (toggled by a passive scroll
 * listener). `children` are the nav links (hidden behind a disclosure menu
 * on small screens). The translucent background uses `color-mix` over the
 * surface token — no literal colors.
 */
export declare const Navbar: React.ForwardRefExoticComponent<NavbarProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=Navbar.d.ts.map
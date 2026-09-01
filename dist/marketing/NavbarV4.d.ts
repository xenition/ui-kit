import * as React from 'react';
import type { NavbarProps } from './Navbar';
/** Drop-in for {@link NavbarProps} — same props, the V4 "showcase" design. */
export type NavbarV4Props = NavbarProps;
/**
 * Navbar — **V4** "showcase" design (web parity of the native V4). NOT a
 * gradient surface: a crisp, refined marketing bar on a solid `surface` ground
 * with a clean bottom border, a bolder brand slot, and clear medium-weight
 * links. Sticky behavior + the passive scroll listener are preserved — once
 * scrolled past `scrollThreshold` the bar keeps its border and gains a subtle
 * backdrop blur. `children` are the nav links (collapsing behind a disclosure
 * menu on small screens). Honors every prop of {@link NavbarProps}
 * (`logo`/`actions`/`scrollThreshold`/`menuLabel`); token-only colors, no
 * literals.
 */
export declare const NavbarV4: React.ForwardRefExoticComponent<NavbarProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=NavbarV4.d.ts.map
import * as React from 'react';
import type { NavbarProps } from './Navbar';
/** Drop-in for {@link NavbarProps} — same props, the V4 "showcase" design. */
export type NavbarV4Props = NavbarProps;
/**
 * Navbar — **V4** "showcase" design (native mirror of the web V4). NOT a
 * gradient surface: a crisp, refined marketing bar on a solid `surface` ground
 * with a clean bottom border, a bolder brand slot, and clear links. Web link
 * `children` become the `links` data array (`href` → `onPress`); on narrow
 * layouts they collapse behind a disclosure toggle. Honors every prop of
 * {@link NavbarProps} (`logo`/`links`/`actions`/`menuLabel`); ≥44px tap
 * targets; token-only colors, no literals.
 */
export declare function NavbarV4({ logo, links, actions, menuLabel, style, }: NavbarV4Props): React.ReactElement;
//# sourceMappingURL=NavbarV4.d.ts.map
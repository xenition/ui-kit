import * as React from 'react';
import type { FooterProps, FooterColumnProps } from './Footer';
/** Drop-in for {@link FooterProps} — same props, the V4 "showcase" design. */
export type FooterV4Props = FooterProps;
/** Drop-in for {@link FooterColumnProps} — same props, the V4 "showcase" design. */
export type FooterColumnV4Props = FooterColumnProps;
/**
 * Footer — **V4** "showcase" design (web parity of the native V4). A refined
 * multi-column marketing footer on `bg-surface` opened by a top hairline: a
 * wider brand/`logo` column beside `FooterColumnV4` link groups, then a
 * bordered bottom bar carrying the legal line + social/`bottom` row. A content
 * section, so NOT a gradient surface. `logo` and `bottom` are node slots. Same
 * props/behavior as {@link FooterProps}; token-only colors, no literals.
 */
export declare const FooterV4: React.ForwardRefExoticComponent<FooterProps & React.RefAttributes<HTMLElement>>;
/**
 * FooterColumn — **V4** "showcase" design (web parity of the native V4). One
 * refined link group: a bold, uppercase, wide-tracked `title` heading over a
 * column of muted links that brighten to `text-primary` on hover, each link a
 * `≥44px` tap target. `title` honored exactly. Same props/behavior as
 * {@link FooterColumnProps}; token-only colors, no literals.
 */
export declare const FooterColumnV4: React.ForwardRefExoticComponent<FooterColumnProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FooterV4.d.ts.map
import * as React from 'react';
import type { FooterProps, FooterColumn } from './Footer';
/** Drop-in for {@link FooterProps} — same props, the V4 "showcase" design. */
export type FooterV4Props = FooterProps;
/**
 * Drop-in for the base `FooterColumn` — the native base `Footer` has no separate
 * column sub-component (columns are supplied as the `columns` data array), so
 * `FooterColumnV4Props` aliases the base column type rather than a distinct
 * component's props.
 */
export type FooterColumnV4Props = FooterColumn;
/**
 * Footer — **V4** "showcase" design (native mirror of the web V4). A refined
 * multi-column marketing footer on `colors.surface` opened by a top hairline:
 * the `logo` brand slot above a wrapping row of link groups (`columns`, each
 * `{ title, links }`), then a bordered bottom bar carrying the legal line +
 * social/`bottom` row. NOT a gradient surface. Column headings are bold,
 * uppercase, wide-tracked; links are muted and each a `≥44px` tap target that
 * dims on press. `logo` and `bottom` are node slots. Honors every prop —
 * `logo`, `columns` (`title`/`links` with `label`/`onPress`), `bottom`. Same
 * props/behavior as {@link FooterProps}; token-only colors, no literals.
 */
export declare function FooterV4({ logo, columns, bottom, style, }: FooterV4Props): React.ReactElement;
//# sourceMappingURL=FooterV4.d.ts.map
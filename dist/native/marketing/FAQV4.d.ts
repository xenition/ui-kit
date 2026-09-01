import * as React from 'react';
import type { FAQProps, FAQItemData } from './FAQ';
/** Drop-in for {@link FAQProps} — same props, the V4 "showcase" design. */
export type FAQV4Props = FAQProps;
/**
 * Drop-in for the base `FAQItemData` — the native base `FAQ` has no separate
 * item sub-component (it takes an `items` data array), so `FAQItemV4Props`
 * aliases the base item type rather than a distinct component's props.
 */
export type FAQItemV4Props = FAQItemData;
/**
 * FAQ — **V4** "showcase" design (native mirror of the web V4). An elegant
 * accordion: each `items` entry a clean rounded row with an extra-bold
 * `question` and a chevron, expanding inline with `LayoutAnimation` (dropped
 * under the OS "Reduce Motion" toggle via {@link useReducedMotion}, exactly as
 * the web V4 drops its grid animation). The open row sits on a subtle
 * soft-primary (`withAlpha(colors.primary, 0.06)`) tint with a soft-primary
 * chevron; the toggle is a `≥44px` tap target. NOT a gradient surface. Honors
 * every prop — `items` (`question`/`answer`), `multiple`, `defaultOpen`. Same
 * props/behavior as {@link FAQProps}; token-only colors, no literals.
 */
export declare function FAQV4({ items, multiple, defaultOpen, style, }: FAQV4Props): React.ReactElement;
//# sourceMappingURL=FAQV4.d.ts.map
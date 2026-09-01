import * as React from 'react';
import type { FAQProps, FAQItemProps } from './FAQ';
/** Drop-in for {@link FAQProps} — same props, the V4 "showcase" design. */
export type FAQV4Props = FAQProps;
/** Drop-in for {@link FAQItemProps} — same props, the V4 "showcase" design. */
export type FAQItemV4Props = FAQItemProps;
/**
 * FAQ — **V4** "showcase" design (web parity of the native V4). An elegant
 * accordion container: a clean vertical stack of `FAQItemV4` rows separated by
 * hairlines, on the page ground (NOT a gradient surface). Same props/behavior
 * as {@link FAQProps}; token-only colors, no literals.
 */
export declare const FAQV4: React.ForwardRefExoticComponent<FAQProps & React.RefAttributes<HTMLDivElement>>;
/**
 * FAQItem — **V4** "showcase" design (web parity of the native V4). One clean
 * accordion row: an extra-bold question and a chevron on a full-width
 * `≥44px` toggle button, smooth grid `0fr → 1fr` expand (dropped under
 * `prefers-reduced-motion`), and — when open — a subtle soft-primary
 * (`bg-primary/5`) tint with a soft-primary chevron. `question` and
 * `defaultOpen` honored exactly. `aria-expanded`/`aria-controls` a11y
 * preserved. Same props/behavior as {@link FAQItemProps}; token-only colors,
 * no literals.
 */
export declare const FAQItemV4: React.ForwardRefExoticComponent<FAQItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FAQV4.d.ts.map
import * as React from 'react';
import type { SectionHeadingProps } from './SectionHeading';
/** Drop-in for {@link SectionHeadingProps} — same props, the V4 "showcase" design. */
export type SectionHeadingV4Props = SectionHeadingProps;
/**
 * SectionHeading — **V4** "showcase" design (native mirror of the web V4). NOT
 * a gradient surface: a clean, refined section opener with a strong soft-primary
 * eyebrow, an extra-bold tight-tracked heading, and a muted supporting lede.
 * Honors every prop of {@link SectionHeadingProps}
 * (`eyebrow`/`title`/`lede`/`align`/`as`); the `as` heading-level prop is kept
 * for web parity but is inert on native. Token-only colors, no literals.
 */
export declare function SectionHeadingV4({ eyebrow, title, lede, align, as: _as, style, }: SectionHeadingV4Props): React.ReactElement;
//# sourceMappingURL=SectionHeadingV4.d.ts.map
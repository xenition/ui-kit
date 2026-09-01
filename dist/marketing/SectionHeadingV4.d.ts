import * as React from 'react';
import type { SectionHeadingProps } from './SectionHeading';
/** Drop-in for {@link SectionHeadingProps} — same props, the V4 "showcase" design. */
export type SectionHeadingV4Props = SectionHeadingProps;
/**
 * SectionHeading — **V4** "showcase" design (web parity of the native V4). NOT
 * a gradient surface: a clean, refined section opener with a strong soft-primary
 * eyebrow chip, an extra-bold tight-tracked heading, and a muted supporting
 * lede. Honors every prop of {@link SectionHeadingProps}
 * (`eyebrow`/`title`/`lede`/`align`/`as` heading level); token-only colors, no
 * literals.
 */
export declare const SectionHeadingV4: React.ForwardRefExoticComponent<SectionHeadingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SectionHeadingV4.d.ts.map
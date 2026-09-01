import * as React from 'react';
import type { FeatureGridProps, FeatureCardProps } from './FeatureGrid';
/** Drop-in for {@link FeatureGridProps} — same props, the V4 "showcase" design. */
export type FeatureGridV4Props = FeatureGridProps;
/** Drop-in for {@link FeatureCardProps} — same props, the V4 "showcase" design. */
export type FeatureCardV4Props = FeatureCardProps;
/**
 * FeatureGrid — **V4** "showcase" design (web parity of the native V4). A content
 * section, so NOT a gradient surface: a responsive grid of clean, elevated
 * `FeatureCardV4`s on the page ground, with generous 8-pt gutters. Same
 * props/behavior as {@link FeatureGridProps} (`columns` drives the breakpoint
 * grid); token-only colors, no literals.
 */
export declare const FeatureGridV4: React.ForwardRefExoticComponent<FeatureGridProps & React.RefAttributes<HTMLDivElement>>;
/**
 * FeatureCard — **V4** "showcase" design (web parity of the native V4). One
 * feature as an elevated rounded card: an icon in a soft-primary well, an
 * extra-bold tight-tracked title, and muted body copy (children). The base's
 * `hoverLift` prop is honored as a subtle `hover:shadow-md` lift. Same
 * props/behavior as {@link FeatureCardProps}; token-only colors, no literals.
 */
export declare const FeatureCardV4: React.ForwardRefExoticComponent<FeatureCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FeatureGridV4.d.ts.map
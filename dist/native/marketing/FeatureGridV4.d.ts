import * as React from 'react';
import type { FeatureGridProps } from './FeatureGrid';
/** Drop-in for {@link FeatureGridProps} — same props, the V4 "showcase" design. */
export type FeatureGridV4Props = FeatureGridProps;
/**
 * FeatureGrid — **V4** "showcase" design (native mirror of the web V4). A
 * content section: a wrapping grid of elevated `FeatureCardV4`s. Mirrors the web
 * V4; native takes the base's `features` data array and wraps via flex `basis`
 * rather than CSS breakpoints (`columns` sets the row width, default 2 for
 * phones), and hover-lift is dropped (no hover on touch). Same props/behavior as
 * {@link FeatureGridProps}. Token-only colors, no literals.
 */
export declare function FeatureGridV4({ features, columns, style, }: FeatureGridV4Props): React.ReactElement;
//# sourceMappingURL=FeatureGridV4.d.ts.map
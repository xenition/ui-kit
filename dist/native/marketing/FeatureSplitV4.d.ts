import * as React from 'react';
import type { FeatureSplitProps } from './FeatureSplit';
/** Drop-in for {@link FeatureSplitProps} — same props, the V4 "showcase" design. */
export type FeatureSplitV4Props = FeatureSplitProps;
/**
 * FeatureSplit — **V4** "showcase" design (native mirror of the web V4). A
 * content section, so NOT a gradient surface: bold copy beside a media slot.
 * Mirrors the web V4; native always stacks vertically (phones are narrow), with
 * media on top by default and `reverse` flipping it below the copy. Honors every
 * base prop (`eyebrow`/`title`/`description`/`bullets`/`media`/`reverse`/
 * `action`); when no `media` is supplied a token-styled 16:9 placeholder is
 * rendered. Same props/behavior as {@link FeatureSplitProps}. Token-only.
 */
export declare function FeatureSplitV4({ eyebrow, title, description, bullets, media, reverse, action, style, }: FeatureSplitV4Props): React.ReactElement;
//# sourceMappingURL=FeatureSplitV4.d.ts.map
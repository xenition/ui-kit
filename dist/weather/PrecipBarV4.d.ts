import * as React from 'react';
import type { PrecipBarProps } from './PrecipBar';
export type PrecipBarV4Props = PrecipBarProps;
/**
 * V4 design-line precipitation-probability bars — a polished elevated white
 * card. Same props, defaults and empty handling as the base `PrecipBar`: one
 * `bg-primary` column per period on a `bg-neutral-100` track, its height
 * proportional to the chance (0–100), with a droplet glyph header and muted
 * period labels. `showValues` prints the numeric % above each bar. All colors
 * flow through Tailwind token classes.
 */
export declare const PrecipBarV4: React.ForwardRefExoticComponent<PrecipBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PrecipBarV4.d.ts.map
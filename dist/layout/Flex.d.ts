import * as React from 'react';
import { type Align, type Justify, type SpaceKey } from './_tokens';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: FlexDirection;
    /** Space between children, from the spacing scale. */
    gap?: SpaceKey;
    align?: Align;
    justify?: Justify;
    wrap?: boolean;
    /** Flex grow factor for this container. */
    grow?: number;
}
/**
 * General-purpose flex container exposing `direction`/`align`/`justify`/`wrap`
 * plus a token-bound `gap` — the escape hatch when `Row`/`Column` are too
 * opinionated. Gap traces to the `--xen-space-*` tokens; no literal colors.
 */
export declare const Flex: React.ForwardRefExoticComponent<FlexProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Flex.d.ts.map
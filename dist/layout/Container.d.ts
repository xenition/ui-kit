import * as React from 'react';
import { type SpaceKey } from './_tokens';
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Max content width in px; content is centered within it. Defaults to 480. */
    maxWidth?: number;
    /** Horizontal padding token. Defaults to `lg`. */
    padding?: SpaceKey;
}
/**
 * Centered content column with a token-bound horizontal padding and a numeric
 * `maxWidth` cap — the web page container. Padding traces to the `--xen-space-*`
 * tokens; only the numeric `maxWidth` is a layout literal (no literal colors).
 */
export declare const Container: React.ForwardRefExoticComponent<ContainerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Container.d.ts.map
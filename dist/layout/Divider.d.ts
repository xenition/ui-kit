import * as React from 'react';
import { type SpaceKey } from './_tokens';
export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
    orientation?: 'horizontal' | 'vertical';
    /** Inset the divider from the cross axis by a spacing token. */
    inset?: SpaceKey;
}
/**
 * A one-pixel rule in the theme `border` color, horizontal or vertical, with an
 * optional token-bound `inset`. Rendered as an `<hr>` (implicit `separator`
 * role). Color and inset trace to the theme tokens; no literal colors.
 */
export declare const Divider: React.ForwardRefExoticComponent<DividerProps & React.RefAttributes<HTMLHRElement>>;
//# sourceMappingURL=Divider.d.ts.map
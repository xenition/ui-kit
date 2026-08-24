import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ButtonGroupProps {
    /** `Button` (or compatible) children to join into a single control. */
    children: React.ReactNode;
    /** Stretch children to equal width. Default `false`. */
    fill?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Button group — joins a row of `Button` children into one segmented control
 * with a single shared outer radius and hairline dividers in the `border`
 * token. The container clips inner corners (`overflow: 'hidden'`) so each child
 * button's own radius is neutralised at the seams; pass `fill` for equal-width
 * children. Purely structural — the buttons keep their own token-bound colors,
 * and the only color this adds (the divider) is the `border` token. No literals.
 */
export declare function ButtonGroup({ children, fill, style }: ButtonGroupProps): React.ReactElement;
//# sourceMappingURL=ButtonGroup.d.ts.map
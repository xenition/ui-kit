import * as React from 'react';
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** `Button` (or compatible) children to join into a single control. */
    children: React.ReactNode;
    /** Stretch children to equal width. Default `false`. */
    fill?: boolean;
}
/**
 * Button group — joins a row of `Button` children into one segmented control
 * with a single shared outer radius and hairline dividers in the `border`
 * token. The container clips inner corners (`overflow-hidden`) so each child
 * button's own radius is neutralised at the seams; pass `fill` for equal-width
 * children. Purely structural — buttons keep their own token-bound colors, and
 * the only color added (the divider) is the `border` token. No literal colors.
 */
export declare const ButtonGroup: React.ForwardRefExoticComponent<ButtonGroupProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ButtonGroup.d.ts.map
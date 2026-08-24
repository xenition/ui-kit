import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
export interface PageHeaderProps extends ViewProps {
    title: string;
    subtitle?: string;
    /** Trailing action node(s) (e.g. buttons) rendered opposite the title. */
    actions?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Screen header: a prominent `title` with optional `subtitle` on the left and
 * an `actions` slot on the right, laid out over a token bottom border. Type
 * sizes, colors, and spacing trace to the compiled theme; no literal colors.
 * The title carries the `header` accessibility role.
 */
export declare function PageHeader({ title, subtitle, actions, style, ...rest }: PageHeaderProps): React.ReactElement;
//# sourceMappingURL=PageHeader.d.ts.map
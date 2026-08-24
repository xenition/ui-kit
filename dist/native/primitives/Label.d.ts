import * as React from 'react';
import { type TextProps } from 'react-native';
export interface LabelProps extends TextProps {
    /** Appends a danger-colored required marker (*). */
    required?: boolean;
    children?: React.ReactNode;
}
/** Themed form label — the native mirror of the web `Label`. No literal colors. */
export declare function Label({ required, style, children, ...rest }: LabelProps): React.ReactElement;
//# sourceMappingURL=Label.d.ts.map
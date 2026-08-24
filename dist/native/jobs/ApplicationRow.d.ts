import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { Application } from './types';
export interface ApplicationRowProps {
    /** The application to render. */
    application: Application;
    /** Fired when the row is pressed (open application detail). */
    onPress?: (application: Application) => void;
    /** Trailing accessory (e.g. a chevron or action button). */
    accessory?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single row in the "my applications" list: company avatar, job title,
 * applied age, and a compact {@link StatusPipeline} showing where it sits in the
 * funnel (with rejection called out as text). Data + `onPress` only; tokens only.
 */
export declare function ApplicationRow({ application, onPress, accessory, style, }: ApplicationRowProps): React.ReactElement;
//# sourceMappingURL=ApplicationRow.d.ts.map
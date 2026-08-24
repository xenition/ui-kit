import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
type IconSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | number;
export interface StarButtonProps {
    /** Controlled starred state. */
    starred?: boolean;
    /** Fires with the next starred value when tapped. */
    onToggle?: (starred: boolean) => void;
    /** Glyph size (typography scale key or raw px). Default `'lg'`. */
    size?: IconSize;
    /** Block interaction and dim. */
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A star / flag toggle for a mail item. Filled (warn accent) when `starred`,
 * hollow + muted otherwise. Exposes a `button` role whose label announces the
 * state in words ("Starred" / "Not starred") so the toggle is never conveyed by
 * color alone. Controlled via `starred` / `onToggle`. No literal colors.
 */
export declare function StarButton({ starred, onToggle, size, disabled, style, }: StarButtonProps): React.ReactElement;
export {};
//# sourceMappingURL=StarButton.d.ts.map
import * as React from 'react';
import { type IconSize } from '../primitives';
export interface StarButtonProps {
    /** Controlled starred state. */
    starred?: boolean;
    /** Fires with the next starred value when clicked. */
    onToggle?: (starred: boolean) => void;
    /** Glyph size (typography scale key or raw px). Default `'lg'`. */
    size?: IconSize | number;
    /** Block interaction and dim. */
    disabled?: boolean;
    className?: string;
}
/**
 * A star / flag toggle for a mail item. Filled (warn accent) when `starred`,
 * hollow + muted otherwise. Renders a real `<button>` whose accessible label
 * announces the state in words ("Starred" / "Not starred") — plus `aria-pressed`
 * — so the toggle is never conveyed by color alone. Controlled via
 * `starred` / `onToggle`. Token classes only — no literal colors.
 */
export declare const StarButton: React.ForwardRefExoticComponent<StarButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=StarButton.d.ts.map
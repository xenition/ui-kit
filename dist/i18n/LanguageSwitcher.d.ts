/**
 * A small, self-contained language dropdown. It styles itself from the kit's
 * `--xen-*` CSS custom properties, so it automatically matches whatever theme
 * the surrounding template uses — no props required. Drop it into a navbar.
 */
import * as React from 'react';
export interface LanguageSwitcherProps {
    /** Extra classes for the trigger button. */
    className?: string;
    /** Show only the flag on the trigger (no language name). Good for tight navbars. */
    compact?: boolean;
    /** Menu alignment relative to the trigger. Defaults to `end` (right-aligned). */
    align?: 'start' | 'end';
}
export declare function LanguageSwitcher({ className, compact, align, }: LanguageSwitcherProps): React.ReactElement;
//# sourceMappingURL=LanguageSwitcher.d.ts.map
import * as React from 'react';
import type { MacroListProps } from './MacroList';
/** Drop-in for {@link MacroListProps} — same props, the V4 "calm console" design. */
export type MacroListV4Props = MacroListProps;
/**
 * MacroList — **V4** "calm console" design (web parity of the native V4). A tidy
 * list of macro rows, each a ≥44px `menuitem` with a leading soft-tint glyph disc
 * (one accent = primary), the macro name + optional description, and an
 * action-count run hint. Hover/focus paints a soft-primary tint; `disabled`
 * macros dim and stop responding. Activating reports the macro via `onApply`
 * (click + keyboard). Same props/behavior as {@link MacroListProps}; all colors
 * from `--xen-*` token classes (no literal hex). Dark-mode safe.
 */
export declare const MacroListV4: React.ForwardRefExoticComponent<MacroListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MacroListV4.d.ts.map
import * as React from 'react';
import type { MacroListProps } from './MacroList';
/** Drop-in for {@link MacroListProps} — same props, the V4 "calm console" design. */
export type MacroListV4Props = MacroListProps;
/**
 * MacroList — **V4** "calm console" design. A tidy list of macro rows, each an
 * elevated rounded card (≥44px) with a leading soft-tint glyph disc (one accent =
 * primary), the macro name + optional description, and an action-count run hint.
 * Press paints a soft-primary tint; `disabled` macros dim and stop responding.
 * Tapping reports the macro via `onApply`. Same props/behavior as
 * {@link MacroListProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. Dark-mode safe.
 */
export declare function MacroListV4({ macros, onApply, loading, emptyText, style, }: MacroListV4Props): React.ReactElement;
//# sourceMappingURL=MacroListV4.d.ts.map
import * as React from 'react';
export type ControllerHintVariant = 'pill' | 'inline';
export type ControllerHintSize = 'sm' | 'md';
export interface ControllerHintItem {
    /** The button glyph / label to render in the key cap, e.g. `'A'`, `'▢'`, `'⏵'`. */
    button: string;
    /** What the button does, e.g. `'Jump'`. */
    action: string;
}
export interface ControllerHintProps {
    /** A single hint (shorthand) — or use `hints` for a row of them. */
    button?: string;
    /** Action label for the single-hint shorthand. */
    action?: string;
    /** A row of hints; takes precedence over the `button`/`action` shorthand. */
    hints?: ControllerHintItem[];
    /**
     * - `pill`   — key cap + action inside a bordered pill (default).
     * - `inline` — key cap + action with no surrounding chrome (for a HUD strip).
     */
    variant?: ControllerHintVariant;
    /** Size scale. */
    size?: ControllerHintSize;
    /** Extra classes on the root. */
    className?: string;
}
/**
 * A controller / keybind hint — a rounded "key cap" showing the button glyph
 * next to its action label (e.g. `Ⓐ Jump`). Pass a single `button`/`action` or
 * a `hints` array for a HUD strip. The action text always accompanies the glyph,
 * so the mapping never relies on the symbol alone. Token-only.
 */
export declare function ControllerHint({ button, action, hints, variant, size, className, }: ControllerHintProps): React.ReactElement | null;
//# sourceMappingURL=ControllerHint.d.ts.map
import * as React from 'react';
export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';
export interface TooltipProps {
    /** Tip content. */
    label: React.ReactNode;
    /** Retained for web prop parity; not used to anchor on native (see note). */
    side?: TooltipSide;
    /**
     * The control the tip describes — normally a kit `<Button>` or icon button.
     * Tooltip does not wrap it in a second pressable; it clones the element and
     * injects an `onLongPress` (see the note below), so the control keeps its own
     * press for its own action and long-press reveals the tip. Anything that is
     * not a single element — a bare string, a fragment, a list — keeps the
     * transparent `<Pressable>` wrapper, where a plain press reveals the tip
     * because there is no action to compete with.
     */
    children: React.ReactNode;
}
/**
 * Themed tooltip — the native mirror of the web `Tooltip`. Native has no hover,
 * so the tip is revealed by **long-press** on the trigger instead of mouse-enter
 * — the platform's own tooltip gesture, and like hover it activates nothing, so
 * the wrapped control keeps its press for its own action (see the note in the
 * body). It shows as a centered `Modal` bubble rather than a bubble anchored to
 * `side` (native simplification — `side` is kept for prop parity only). The
 * bubble uses the inverted `onSurface`/`surface` token pair. No literal colors.
 */
export declare function Tooltip({ label, side, children }: TooltipProps): React.ReactElement;
//# sourceMappingURL=Tooltip.d.ts.map
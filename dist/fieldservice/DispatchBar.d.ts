import * as React from 'react';
/** Dispatch stage — text + glyph + color (never color-alone). */
export type DispatchStage = 'unassigned' | 'accepted' | 'en-route' | 'on-site' | 'complete';
export interface DispatchBarProps {
    /** Current dispatch stage — text + glyph + color. */
    stage: DispatchStage;
    /** Localized ETA / arrival window (e.g. "ETA 12 min"). */
    eta?: string;
    /** Work order / job label shown as the primary line. */
    jobLabel?: string;
    /** Fires with the next stage when the advance button is pressed. */
    onAdvance?: (next: DispatchStage) => void;
    /** Fires when the secondary Navigate action is pressed. */
    onNavigate?: () => void;
    /** Blocks the advance action (web `Button` has no spinner → disabled). */
    loading?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * A dispatch status/action bar for the tech's active job. Shows the current
 * stage as a tinted glyph disc + label (text + glyph + a color that traces to a
 * semantic token — never color alone) with an optional ETA and job label, plus
 * a primary button that advances the workflow (accept → en-route → on-site →
 * complete) firing `onAdvance(next)`. An optional Navigate action sits
 * alongside. Web `Button` has no loading spinner, so `loading` disables the
 * advance action. No literal colors.
 */
export declare const DispatchBar: React.ForwardRefExoticComponent<DispatchBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DispatchBar.d.ts.map
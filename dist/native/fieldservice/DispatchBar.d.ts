import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    /** Blocks the advance action and shows a spinner. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A dispatch status/action bar for the tech's active job. Shows the current
 * stage as a tinted glyph disc + label (text + glyph + a color that traces to a
 * `SemanticColors` slot — never color alone) with an optional ETA and job
 * label, plus a primary button that advances the workflow (accept → en-route →
 * on-site → complete) firing `onAdvance(next)`. An optional Navigate action
 * sits alongside. No literal colors.
 */
export declare function DispatchBar({ stage, eta, jobLabel, onAdvance, onNavigate, loading, style, }: DispatchBarProps): React.ReactElement;
//# sourceMappingURL=DispatchBar.d.ts.map
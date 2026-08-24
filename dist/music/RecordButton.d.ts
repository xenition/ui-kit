import * as React from 'react';
export type RecordButtonVariant = 'ring' | 'solid' | 'labeled';
export type RecordButtonSize = 'sm' | 'md' | 'lg';
export interface RecordButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Whether recording is in progress. */
    recording: boolean;
    /**
     * - `ring` — circular record button, dot ⟷ square morph (default).
     * - `solid` — filled danger circle.
     * - `labeled` — `ring` plus a "Rec"/"Stop" label + optional timer.
     */
    variant?: RecordButtonVariant;
    /** Button size (default `md`). */
    size?: RecordButtonSize;
    /** Elapsed record time in seconds (shown in the `labeled` variant). */
    elapsedSeconds?: number;
    /** Disable the button. */
    disabled?: boolean;
    /** Fires with the next recording state when pressed. */
    onToggle?: (recording: boolean) => void;
}
/**
 * A record toggle button — a UI shell only, it captures nothing, and the DOM
 * parity of `native/music`'s `RecordButton`. Shows a record affordance that
 * **morphs from a dot (idle) to a rounded square (recording)** — the state is
 * surfaced in the a11y label + `aria-pressed` and the shape change, never color
 * alone. Pressing fires `onToggle(next)`. The `labeled` variant adds a
 * "Rec"/"Stop" label and an elapsed timer. Uses the `danger` token for the
 * record accent; no literal colors.
 */
export declare const RecordButton: React.ForwardRefExoticComponent<RecordButtonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RecordButton.d.ts.map
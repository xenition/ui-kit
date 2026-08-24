import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type RecordButtonVariant = 'ring' | 'solid' | 'labeled';
export type RecordButtonSize = 'sm' | 'md' | 'lg';
export interface RecordButtonProps {
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
    disabled?: boolean;
    /** Fires with the next recording state when pressed. */
    onToggle?: (recording: boolean) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A record toggle button — a UI shell only, it captures nothing. Shows a
 * record affordance that morphs from a dot (idle) to a rounded square
 * (recording); the state is surfaced in the a11y label + `selected` state and
 * the shape change, never color alone. Pressing fires `onToggle(next)`. The
 * `labeled` variant adds a "Rec"/"Stop" label and an elapsed timer. Uses the
 * `danger` token for the record accent; no literal colors.
 */
export declare function RecordButton({ recording, variant, size, elapsedSeconds, disabled, onToggle, style, }: RecordButtonProps): React.ReactElement;
//# sourceMappingURL=RecordButton.d.ts.map
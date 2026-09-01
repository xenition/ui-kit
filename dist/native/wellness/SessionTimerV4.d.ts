import * as React from 'react';
import type { SessionTimerProps } from './SessionTimer';
export type SessionTimerV4Props = SessionTimerProps;
/**
 * SessionTimerV4 — the "calm" restyle of {@link SessionTimer}. Same props,
 * defaults, labels, a11y and behavior (`onToggle`/`onReset`, the `Complete`
 * state, the clamped remaining/total); only the surface changes: a clean neutral
 * card with a large mm:ss readout, a slim gradient progress bar showing elapsed,
 * a gradient play/pause button, and a reset control.
 */
export declare function SessionTimerV4({ totalSec, remainingSec, running, phaseLabel, tone, onToggle, onReset, style, }: SessionTimerV4Props): React.ReactElement;
//# sourceMappingURL=SessionTimerV4.d.ts.map
import * as React from 'react';
import type { SessionTimerProps } from './SessionTimer';
export type SessionTimerV4Props = SessionTimerProps;
/**
 * SessionTimerV4 — the "calm" restyle of {@link SessionTimer}. Same props,
 * defaults, labels, a11y and behavior (`onToggle`/`onReset`, the `Complete`
 * state, the clamped remaining/total); only the surface changes: a clean neutral
 * card with a large mm:ss readout (`text-on-surface`), a slim gradient progress
 * bar showing elapsed (inline width %), a gradient play/pause button, and a reset
 * control. The `tone` prop is retained for parity; the calm ground is single-hue.
 * Token-only colors.
 */
export declare const SessionTimerV4: React.ForwardRefExoticComponent<SessionTimerProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SessionTimerV4.d.ts.map
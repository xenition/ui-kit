import * as React from 'react';
import type { TelehealthCallBarProps } from './TelehealthCallBar';
/** Drop-in for {@link TelehealthCallBarProps} — same props, the V4 "clinic" design. */
export type TelehealthCallBarV4Props = TelehealthCallBarProps;
/**
 * TelehealthCallBar — **V4** "clinic" design. A calm, persistent call bar on an
 * elevated rounded surface with a soft shadow. Shows the participant's identity
 * and a labelled connection-state marker (glyph + label + token tone, never
 * color alone) for each `state`: `idle` / `connecting` / `active` / `ended`.
 * While `idle` a "Join call" CTA is shown; while `active` the standard round
 * controls appear (mute, camera, and a `danger`-token labelled End-call
 * button), each a ≥44px tap target. Mute/camera state is shown by a glyph swap
 * + tint. Identical props/behavior to {@link TelehealthCallBarProps}. Token-only
 * colors via `useXenitionTheme()`. Informational UI only — not a medical device.
 */
export declare function TelehealthCallBarV4({ participantName, participantAvatar, state, elapsed, muted, cameraOff, onJoin, onToggleMute, onToggleCamera, onEnd, style, }: TelehealthCallBarV4Props): React.ReactElement;
//# sourceMappingURL=TelehealthCallBarV4.d.ts.map
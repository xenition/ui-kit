import * as React from 'react';
import type { TelehealthCallBarProps } from './TelehealthCallBar';
/** Drop-in for {@link TelehealthCallBarProps} — same props, the V4 "clinic" design. */
export type TelehealthCallBarV4Props = TelehealthCallBarProps;
/**
 * TelehealthCallBar — **V4** "clinic" design (web parity of the native V4). A
 * calm, persistent call bar on an elevated rounded surface with a soft shadow.
 * Shows the participant's identity and a labelled connection-state marker
 * (glyph + label + token tone, never color alone) for each `state`:
 * `idle` / `connecting` / `active` / `ended`. While `idle` a "Join call" CTA is
 * shown; while `active` the standard round controls appear (mute, camera, and a
 * `danger`-token labelled End-call button), each a ≥44px tap target. Mute/camera
 * state is conveyed by a glyph swap + `aria-label`. Identical props/behavior to
 * {@link TelehealthCallBarProps}. All colors from `--xen-*` token classes (no
 * literals). Informational UI only — not a medical device.
 */
export declare const TelehealthCallBarV4: React.ForwardRefExoticComponent<TelehealthCallBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TelehealthCallBarV4.d.ts.map
import * as React from 'react';
import type { MixerProps } from './Mixer';
/** Same public contract as {@link Mixer} — a drop-in alternate design. */
export type MixerV3Props = MixerProps;
/**
 * Mixer, redesigned (v3): a **compact list of horizontal fader rows** — one
 * tight line per channel with the name, an inline `Slider`, a live read-out and
 * a mute pill (plus solo in `full`). No card chrome, hairline dividers only.
 * Mute / solo surface in each control's a11y `selected` state and label, never
 * by color alone. Renders an `EmptyState` when there are no channels. Built for
 * dense side panels. Token-only tints. Distinct at a glance from v1. Same props.
 */
export declare function MixerV3({ channels, variant, title, emptyLabel, onVolumeChange, onToggleMute, onToggleSolo, style, }: MixerV3Props): React.ReactElement;
//# sourceMappingURL=MixerV3.d.ts.map
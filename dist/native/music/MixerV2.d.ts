import * as React from 'react';
import type { MixerProps } from './Mixer';
/** Same public contract as {@link Mixer} — a drop-in alternate design. */
export type MixerV2Props = MixerProps;
/**
 * Mixer, redesigned (v2): a **console of vertical channel strips** in a
 * horizontal scroller. Each strip stacks the channel name, an output meter and
 * a floor-to-top **vertical fader**, then mute / solo pills below. The fader is
 * an `adjustable` track dragged along its height; mute / solo surface in the
 * control's a11y `selected` state and caption, never by color alone. Renders an
 * `EmptyState` when there are no channels. Composes `Card`; token-only tints.
 * Distinct at a glance from v1's stacked horizontal rows. Same props.
 */
export declare function MixerV2({ channels, variant, title, emptyLabel, onVolumeChange, onToggleMute, onToggleSolo, style, }: MixerV2Props): React.ReactElement;
//# sourceMappingURL=MixerV2.d.ts.map
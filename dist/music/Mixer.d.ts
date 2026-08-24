import * as React from 'react';
import { type MixerChannel } from './types';
export type MixerVariant = 'full' | 'compact';
export interface MixerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onVolumeChange'> {
    /** The channel strips to render. */
    channels: MixerChannel[];
    /**
     * - `full` — fader + mute/solo + meter per strip (default).
     * - `compact` — fader + mute only.
     */
    variant?: MixerVariant;
    /** Optional mixer title. */
    title?: string;
    /** Message shown when there are no channels. */
    emptyLabel?: string;
    /** Fires as a strip's fader is dragged. */
    onVolumeChange?: (channel: MixerChannel, value: number) => void;
    /** Fires when a strip's mute is toggled. */
    onToggleMute?: (channel: MixerChannel) => void;
    /** Fires when a strip's solo is toggled. */
    onToggleSolo?: (channel: MixerChannel) => void;
}
/**
 * A channel mixer — a UI shell only, no audio routing, and the DOM parity of
 * `native/music`'s `Mixer`. Each `MixerChannel` becomes a strip with a
 * `VolumeFader`, a mute toggle, and (in `full`) a solo toggle plus a level
 * meter. Mute / solo are surfaced in the control's `aria-pressed` and its label,
 * never by color alone. Renders an `EmptyState` when there are no channels.
 * Composes `Card`, `VolumeFader`; token-only.
 */
export declare const Mixer: React.ForwardRefExoticComponent<MixerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Mixer.d.ts.map
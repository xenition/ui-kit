import * as React from 'react';
import type { MixerProps } from './Mixer';
/** Drop-in for {@link MixerProps} — same props, the V4 "session" design. */
export type MixerV4Props = MixerProps;
/**
 * Mixer — **V4** "session" design. The tactile DAW take on a channel mixer: each
 * `MixerChannel` becomes a rounded control surface (`colors.surface` +
 * `colors.border`) housing a `VolumeFaderV4`, a mute toggle, and (in `full`) a
 * solo toggle plus a token-well level meter. Every strip keeps its **channel
 * accent** — cycled through the module's semantic slots via `padAccentKey` and
 * resolved through `colors[accentKey]` (never a literal). Armed / mute / solo
 * states light with a soft-token fill *and* a glyph/label marker (never color
 * alone), surfaced in the a11y `selected` state + label. Honors both `variant`s
 * (`full` / `compact`), identical props/behavior to {@link MixerProps}. Renders
 * an `EmptyState` when there are no channels. Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function MixerV4({ channels, variant, title, emptyLabel, onVolumeChange, onToggleMute, onToggleSolo, style, }: MixerV4Props): React.ReactElement;
//# sourceMappingURL=MixerV4.d.ts.map
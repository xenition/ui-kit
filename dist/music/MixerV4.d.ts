import * as React from 'react';
import type { MixerProps } from './Mixer';
/** Drop-in for {@link MixerProps} — same props, the V4 "session" design. */
export type MixerV4Props = MixerProps;
/**
 * Mixer — **V4** "session" design (web parity of the native V4). The tactile DAW
 * take on a channel mixer: each `MixerChannel` becomes a rounded control surface
 * (`bg-surface` + `border`) housing a `VolumeFaderV4`, a mute toggle, and (in
 * `full`) a solo toggle plus a token-well level meter. Every strip keeps its
 * **channel accent** — cycled through the module's semantic slots via
 * `padAccentKey` and applied only through the `ACCENT_*` token classes (never a
 * literal). Armed / mute / solo states light with a soft-token fill *and* a
 * glyph/label marker (never color alone), surfaced in `aria-pressed` + label.
 * Honors both `variant`s (`full` / `compact`), identical props/behavior to
 * {@link MixerProps}. Renders an `EmptyState` when there are no channels.
 * Token-only styling.
 */
export declare const MixerV4: React.ForwardRefExoticComponent<MixerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MixerV4.d.ts.map
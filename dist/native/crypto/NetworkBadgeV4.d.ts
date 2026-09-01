import * as React from 'react';
import type { NetworkBadgeProps, NetworkStatus } from './NetworkBadge';
/**
 * The identity slot the chain's dot is painted from.
 *
 * The base twins disagreed about what `tone` even was: native took the whole
 * of `keyof SemanticColors`, web took `IconColor`. Same prop, same component,
 * two unions — so `tone="accent"` compiled on the phone and not on the laptop.
 * V4 settles on web's ten, which is the intersection and the set both twins
 * can actually paint.
 */
export type NetworkBadgeV4Tone = 'onSurface' | 'onPrimary' | 'primary' | 'muted' | 'success' | 'onSuccess' | 'warn' | 'onWarn' | 'danger' | 'onDanger';
export interface NetworkBadgeV4Props extends NetworkBadgeProps {
    /** Identity slot for the chain's dot. See {@link NetworkBadgeV4Tone}. */
    tone?: NetworkBadgeV4Tone;
    /** Wording for the health readings. Defaults `Connected` / `Congested` / `Offline`. */
    statusLabels?: Partial<Record<NetworkStatus, string>>;
}
/**
 * **V4 network badge** — same props as {@link NetworkBadge} plus
 * `statusLabels`, with `tone` narrowed to the union its web twin already had.
 *
 * ## Three changes
 *
 * 1. **The health word carries the health.** Native drew `Congested` in
 *    `muted` — a ramp step with no contrast promise and no meaning — so the
 *    signal lived entirely in an 8px dot, and only the web twin put it in
 *    text. The word now takes its status ink, which is the same reading on
 *    both platforms.
 * 2. **`tone` is one union across the twins.** See {@link NetworkBadgeV4Tone}.
 * 3. **Nothing is off the scale.** `paddingVertical: 2` and `gap: 3` were
 *    invented numbers; the pill is now composed from `spacing`, its ground is
 *    `card` rather than a raw ramp index, and the two dots — which say nothing
 *    a reader cannot already hear in the name — are hidden from the reader.
 */
export declare function NetworkBadgeV4({ name, status, tone, glyph, size, statusLabels, style, }: NetworkBadgeV4Props): React.ReactElement | null;
//# sourceMappingURL=NetworkBadgeV4.d.ts.map
import * as React from 'react';
import type { NetworkBadgeProps, NetworkStatus } from './NetworkBadge';
/**
 * The identity accents a network badge takes, on **both** twins.
 *
 * The base could not express one badge in two places: web's `tone` was
 * `IconColor` and native's was `keyof SemanticColors`, which admits `border`
 * and `input` — a hairline and a field outline offered as a chain's colour.
 * Ten members, declared here rather than imported, because the native twin
 * cannot reach `IconColor` without pulling a web module into the React Native
 * graph. Spelled identically on both sides; `tone="accent"` deliberately stops
 * compiling.
 */
export type NetworkBadgeV4Tone = 'onSurface' | 'onPrimary' | 'primary' | 'muted' | 'success' | 'onSuccess' | 'warn' | 'onWarn' | 'danger' | 'onDanger';
export interface NetworkBadgeV4Props extends Omit<NetworkBadgeProps, 'tone'> {
    /** Identity accent for the chain dot. Default `'primary'`. */
    tone?: NetworkBadgeV4Tone;
    /** Override the health words. Defaults `'Connected'`, `'Congested'`, `'Offline'`. */
    statusLabels?: Partial<Record<NetworkStatus, string>>;
}
/**
 * **V4 network badge** — the web twin of the native `NetworkBadgeV4`, same
 * props as {@link NetworkBadge} plus `statusLabels`, with `tone` narrowed to
 * the shared tone union.
 *
 * ## Four changes
 *
 * 1. **The status word carries its tone on both twins.** Native drew it
 *    `muted`, so the health signal — the entire reason `status` exists —
 *    lived in a 6px dot on the phone and in text only on the web.
 * 2. **The ink is ink.** `text-success` / `text-warn` / `text-danger` are fill
 *    slots; the word now takes the contrast-corrected `*Text` form, and the
 *    dots take the fills.
 * 3. **The pill is on the scale.** `px-2`, `py-0.5`, `gap-1`, `h-2 w-2` and
 *    `h-1.5 w-1.5` are five raw numbers, none of them a spacing token, so the
 *    badge did not resize with a denser or roomier seed.
 * 4. **The badge's own text is its name.** The base put `aria-label` on a
 *    plain `<span>` with no role, where support is inconsistent, and it
 *    duplicated the visible text word for word. Removing it lets the text
 *    speak and the decorative dots stay hidden.
 */
export declare const NetworkBadgeV4: React.ForwardRefExoticComponent<NetworkBadgeV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=NetworkBadgeV4.d.ts.map
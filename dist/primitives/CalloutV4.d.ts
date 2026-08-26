import * as React from 'react';
import type { CalloutProps, CalloutTone } from './Callout';
export type { CalloutProps as CalloutV4Props, CalloutTone };
/**
 * **V4 callout** — the web twin of the native `CalloutV4`, same props as
 * {@link Callout}, a different design line.
 *
 * ## An aside is not an alert
 *
 * The base callout drew a **full 1px ring in the tone colour**. A red box around
 * a tip and a red box around a failed payment are then the same object at the
 * same volume, and the reader learns that a red edge means nothing in
 * particular. `design.md` §35.6 asks colour to build hierarchy rather than
 * noise, and a component that spends `danger` on an aside has spent a meaning
 * the product may need later for a real one (§35.4).
 *
 * So V4 sets the feedback line's loudness by **tint depth, not by hue**:
 *
 * | component  | ground          | edge             |
 * | ---------- | --------------- | ---------------- |
 * | `BannerV4` | the solid tone  | none, full bleed |
 * | `AlertV4`  | tone at 10%     | tone rule, 4px   |
 * | `CalloutV4`| tone at 6%      | neutral hairline |
 *
 * Three different volumes for three different jobs, all reading as one family
 * because they are made of the same two moves.
 *
 * The edge is `border-border` — re-derived per scheme by the provider — so the
 * box says "this is a container" and the tint says which kind, instead of both
 * saying the same thing twice.
 *
 * The title takes the compiler's contrast-safe TEXT form of the tone, never the
 * fill: the fill is a background colour with no promise against `surface`, and
 * this kit has measured such a pairing as low as 1.32:1. The 6% ground is
 * shallow enough that the compiler's `surface` guarantee still holds on it; the
 * native twin re-measures the same mix with `ensureContrast` and its spec is
 * what holds the claim.
 */
export declare const CalloutV4: React.ForwardRefExoticComponent<CalloutProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CalloutV4.d.ts.map
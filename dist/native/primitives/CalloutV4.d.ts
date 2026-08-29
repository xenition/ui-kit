import * as React from 'react';
import type { CalloutProps, CalloutTone } from './Callout';
export type { CalloutProps as CalloutV4Props, CalloutTone };
/**
 * **V4 callout** — same props as {@link Callout}, a different design line.
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
 * | component  | ground          | edge            |
 * | ---------- | --------------- | --------------- |
 * | `BannerV4` | the solid tone  | none, full bleed|
 * | `AlertV4`  | tone at 10%     | tone rule, 4px  |
 * | `CalloutV4`| tone at 6%      | neutral hairline|
 *
 * Three different volumes for three different jobs, all reading as one family
 * because they are made of the same two moves.
 *
 * The edge is `colors.border` — the neutral the provider already resolved for
 * this scheme — so the box says "this is a container" and the tint says which
 * kind, instead of both saying the same thing twice.
 *
 * ## `neutral` stays neutral
 *
 * The `neutral` tone gets **no tint at all**: plain `surface`, plain hairline, a
 * `muted` title. A note with no tone is not a faint warning, and giving it a
 * grey wash would only make a colourless thing look broken.
 *
 * ## Legibility
 *
 * The title takes the compiler's contrast-safe TEXT form of the tone — never
 * the fill, which is a background colour with no promise against `surface` and
 * which this kit has measured as low as 1.32:1 when used as a label. Both the
 * title and the body are then re-measured against the tint this callout
 * actually painted.
 */
export declare function CalloutV4({ tone, icon, title, children, style, }: CalloutProps): React.ReactElement;
//# sourceMappingURL=CalloutV4.d.ts.map
import * as React from 'react';
import type { OrnamentRuleProps, OrnamentShape, OrnamentTone } from './OrnamentRule';
export type { OrnamentShape, OrnamentTone };
/** Drop-in for {@link OrnamentRuleProps} — same props, the V4 "showcase" design. */
export type OrnamentRuleV4Props = OrnamentRuleProps;
/**
 * OrnamentRule — **V4** "showcase" design (native mirror of the web V4).
 *
 * Same technique as the native base: a 1px rule flanking an optional centered
 * `diamond`/`dot`/`line`/`none` ornament — React Native has no CSS gradient
 * here, so each rule half is a **solid low-opacity token fill** (the tint
 * always originates from a theme token, never a literal). The V4 *refines* the
 * look: a slightly stronger, cleaner rule tint that fades toward the outer
 * edges via two stacked segments (approximating the web's fuller gradient), and
 * a crisper ornament sitting on a faint token halo pad for a sharper read.
 *
 * Every `ornament` shape and `tone` value is honored exactly. Purely
 * decorative and **static** — no motion, nothing to reduce. Token-only colors.
 */
export declare function OrnamentRuleV4({ ornament, tone, style, }: OrnamentRuleV4Props): React.ReactElement;
//# sourceMappingURL=OrnamentRuleV4.d.ts.map
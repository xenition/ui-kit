import * as React from 'react';
import { type OrnamentRuleProps, type OrnamentShape, type OrnamentTone } from './OrnamentRule';
export type { OrnamentShape, OrnamentTone };
/** Drop-in for {@link OrnamentRuleProps} — same props, the V4 "showcase" design. */
export type OrnamentRuleV4Props = OrnamentRuleProps;
/**
 * OrnamentRule — **V4** "showcase" design (web parity of the native V4).
 *
 * Same effect engine as the base {@link OrnamentRule}: a fading 1px gradient
 * rule flanking an optional centered `diamond`/`dot`/`line`/`none` ornament,
 * token-tinted by `tone` (`accent`/`primary`/`border`). The base owns the
 * layout + the `::before`/`::after` rule halves; the V4 only re-skins.
 *
 * The refinement: **sharper token-driven dividers** — a fuller three-stop rule
 * gradient (a confident mid before it fades) and a subtly glowing ornament, so
 * the divider reads crisper per shape/tone while staying editorial. Every
 * `ornament` shape and `tone` value is honored exactly.
 *
 * Purely decorative and **static** — no motion, nothing to reduce (same as the
 * base). Token-only colors, no literals.
 */
export declare const OrnamentRuleV4: React.ForwardRefExoticComponent<OrnamentRuleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OrnamentRuleV4.d.ts.map
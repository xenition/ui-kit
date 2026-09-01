import * as React from 'react';
import { type GenerativeCoverProps, type CoverColorRole, type CoverForm } from './GenerativeCover';
export type { CoverForm, CoverColorRole };
/** Drop-in for {@link GenerativeCoverProps} — same props, the V4 "showcase" design. */
export type GenerativeCoverV4Props = GenerativeCoverProps;
/**
 * GenerativeCover — **V4** "showcase" design (web parity of the native V4).
 *
 * Same effect engine as the base {@link GenerativeCover}: deterministic
 * generative SVG "print plates", seeded from `seed`, drawn in two token color
 * roles (`ink` over `paper`). The V4 is a *refined* take — **crisper,
 * token-driven** generative art. It reuses the base's shared machinery
 * (`hashSeed`, `COVER_FORMS`) rather than reinventing the seed logic, and
 * renders through the base component so every one of the six `COVER_FORMS`
 * (`arc`/`bands`/`orbit`/`grid`/`wave`/`stack`) is honored exactly. The refinement
 * is confident defaults: a deeper `primary-700` ink over a soft `neutral-50`
 * paper for higher-contrast, sharper plates, plus a whisper-thin seeded accent
 * hairline framing the plate so the art reads bolder while staying subtle.
 *
 * `seed`/`form`/`ink`/`paper`/`label` all pass straight through; explicit
 * `ink`/`paper` override the V4 defaults. Every color is a `--xen-*` token — no
 * literals; an invalid color role still throws at render (inherited from the
 * base). **Static SVG — no motion, nothing to reduce**, same as the base.
 */
export declare const GenerativeCoverV4: React.ForwardRefExoticComponent<GenerativeCoverProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=GenerativeCoverV4.d.ts.map
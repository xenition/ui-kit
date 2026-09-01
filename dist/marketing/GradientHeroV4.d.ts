import * as React from 'react';
import type { GradientHeroProps } from './GradientHero';
/** Drop-in for {@link GradientHeroProps} — same props, the V4 "showcase" design. */
export type GradientHeroV4Props = GradientHeroProps;
/**
 * GradientHero — **V4** "showcase" design (web parity of the native V4). The
 * bold, conversion-forward landing moment: a vibrant primary→accent brand
 * gradient ground carrying a soft-primary eyebrow chip, an extra-bold
 * tight-tracked near-white headline, generous whitespace, and a centered (or
 * left-aligned) call-to-action row. The base's `AuroraBackground` is kept as a
 * subtle texture overlay so `variant`/`grain`/`pattern` still apply. Honors
 * every prop of {@link GradientHeroProps} (`eyebrow`/`title`/`subtitle`/
 * `actions`/`media`/`align`); every color is a `--xen-*` token
 * (`from-primary-500`, `to-accent-500`, `text-primary-50`) — no literals.
 */
export declare const GradientHeroV4: React.ForwardRefExoticComponent<GradientHeroProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=GradientHeroV4.d.ts.map
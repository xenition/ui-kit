import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import {
  OrnamentRule,
  type OrnamentRuleProps,
  type OrnamentShape,
  type OrnamentTone,
} from './OrnamentRule';

export type { OrnamentShape, OrnamentTone };

/** Drop-in for {@link OrnamentRuleProps} — same props, the V4 "showcase" design. */
export type OrnamentRuleV4Props = OrnamentRuleProps;

/** Ramp step used for each tone's V4 rule gradient / ornament fill. */
const TONE_VAR: Record<OrnamentTone, string> = {
  accent: 'var(--xen-accent-400)',
  primary: 'var(--xen-primary-400)',
  border: 'var(--xen-border)',
};

const TONES: readonly OrnamentTone[] = ['accent', 'primary', 'border'];

/**
 * V4 re-skin sheet. Targets the same `[data-xen-ornament-rule]` element +
 * `::before`/`::after` halves + `[data-xen-ornament]` the base renders, scoped
 * under `[data-xen-ornament-rule-v4]`, and sharpens them: a **fuller
 * three-stop** rule gradient (a stronger mid before fading out), a crisper 1px
 * rule, and a subtly glowing ornament. Every color is a `--xen-*` token.
 */
const ORNAMENT_V4_CSS = `
${TONES.map(
  (tone) => `
[data-xen-ornament-rule-v4][data-tone="${tone}"]::before {
  height: 1px;
  background-image: linear-gradient(90deg, transparent, color-mix(in srgb, ${TONE_VAR[tone]} 40%, transparent) 55%, color-mix(in srgb, ${TONE_VAR[tone]} 85%, transparent));
}
[data-xen-ornament-rule-v4][data-tone="${tone}"]::after {
  height: 1px;
  background-image: linear-gradient(270deg, transparent, color-mix(in srgb, ${TONE_VAR[tone]} 40%, transparent) 55%, color-mix(in srgb, ${TONE_VAR[tone]} 85%, transparent));
}
[data-xen-ornament-rule-v4][data-tone="${tone}"] [data-xen-ornament] {
  background-color: ${TONE_VAR[tone]};
  box-shadow: 0 0 6px color-mix(in srgb, ${TONE_VAR[tone]} 55%, transparent);
}`
).join('\n')}
`;

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
export const OrnamentRuleV4 = React.forwardRef<HTMLDivElement, OrnamentRuleV4Props>(
  function OrnamentRuleV4(
    { ornament = 'diamond', tone = 'accent', className, ...rest }: OrnamentRuleV4Props,
    ref
  ) {
    injectStyleOnce('xen-ornament-rule-v4-styles', ORNAMENT_V4_CSS);

    // Keep the shape union referenced for tooling/tests.
    const shape: OrnamentShape = ornament;

    return (
      <OrnamentRule
        ref={ref}
        data-xen-ornament-rule-v4=""
        ornament={shape}
        tone={tone}
        className={cn(className)}
        {...rest}
      />
    );
  }
);

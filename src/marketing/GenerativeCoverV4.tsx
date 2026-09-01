import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  GenerativeCover,
  COVER_FORMS,
  hashSeed,
  type GenerativeCoverProps,
  type CoverColorRole,
  type CoverForm,
} from './GenerativeCover';

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
export const GenerativeCoverV4 = React.forwardRef<SVGSVGElement, GenerativeCoverV4Props>(
  function GenerativeCoverV4(
    {
      seed,
      form,
      ink = 'primary-700',
      paper = 'neutral-50',
      label,
      className,
      style,
      ...rest
    }: GenerativeCoverV4Props,
    ref
  ) {
    // Reuse the base's seed machinery — do not reinvent it — to derive the same
    // resolved form the base would, so the V4 accent frame matches the plate.
    const hash = hashSeed(seed);
    const resolvedForm: CoverForm = form ?? (COVER_FORMS[hash % COVER_FORMS.length] as CoverForm);
    // Seeded accent-vs-primary hairline: a token-only frame, alternating role.
    const frameVar = hash % 2 === 0 ? 'var(--xen-accent-400)' : 'var(--xen-primary-400)';

    return (
      <span
        data-xen-v4-cover={resolvedForm}
        className={cn('relative block h-full w-full overflow-hidden', className)}
        style={{
          boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${frameVar} 45%, transparent)`,
          ...style,
        }}
        {...(label !== undefined ? {} : { 'aria-hidden': true })}
      >
        <GenerativeCover
          ref={ref}
          seed={seed}
          form={form}
          ink={ink}
          paper={paper}
          label={label}
          {...rest}
        />
      </span>
    );
  }
);

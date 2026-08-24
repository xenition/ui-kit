import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';

export type OrnamentShape = 'diamond' | 'dot' | 'line' | 'none';
export type OrnamentTone = 'accent' | 'primary' | 'border';

export interface OrnamentRuleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Centered ornament: rotated diamond, round dot, short bar, or none (plain rule). */
  ornament?: OrnamentShape;
  /** Token family tinting the rule and ornament (default `accent` — the "brass" look). */
  tone?: OrnamentTone;
}

const TONES: readonly OrnamentTone[] = ['accent', 'primary', 'border'];

/** Ramp step used for each tone's rule gradient / ornament fill. */
const TONE_VAR: Record<OrnamentTone, string> = {
  accent: 'var(--xen-accent-400)',
  primary: 'var(--xen-primary-400)',
  border: 'var(--xen-border)',
};

const ORNAMENT_CSS = `
[data-xen-ornament-rule] {
  display: flex;
  align-items: center;
  justify-content: center;
}
[data-xen-ornament-rule]::before,
[data-xen-ornament-rule]::after {
  content: '';
  flex: 1 1 auto;
  height: 1px;
}
[data-xen-ornament-rule] [data-xen-ornament] {
  flex: none;
  margin: 0 1rem;
}
[data-xen-ornament-rule="none"] [data-xen-ornament] { display: none; }
[data-xen-ornament-rule] [data-xen-ornament="diamond"] { width: 7px; height: 7px; transform: rotate(45deg); }
[data-xen-ornament-rule] [data-xen-ornament="dot"] { width: 6px; height: 6px; border-radius: 9999px; }
[data-xen-ornament-rule] [data-xen-ornament="line"] { width: 24px; height: 1px; }
${TONES.map(
  (tone) => `
[data-xen-ornament-rule][data-tone="${tone}"]::before {
  background-image: linear-gradient(90deg, transparent, color-mix(in srgb, ${TONE_VAR[tone]} 65%, transparent));
}
[data-xen-ornament-rule][data-tone="${tone}"]::after {
  background-image: linear-gradient(270deg, transparent, color-mix(in srgb, ${TONE_VAR[tone]} 65%, transparent));
}
[data-xen-ornament-rule][data-tone="${tone}"] [data-xen-ornament] { background-color: ${TONE_VAR[tone]}; }`
).join('\n')}
`;

/**
 * Editorial divider generalized from the restaurant template's brass rules: a
 * fading 1px gradient rule with an optional centered diamond/dot/line
 * ornament. Purely decorative and static — token-tinted via `tone`, so
 * "brass" is just whatever the theme's accent ramp says it is.
 */
export const OrnamentRule = React.forwardRef<HTMLDivElement, OrnamentRuleProps>(
  function OrnamentRule(
    { ornament = 'diamond', tone = 'accent', className, ...rest },
    ref
  ) {
    injectStyleOnce('xen-ornament-rule-styles', ORNAMENT_CSS);
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        data-xen-ornament-rule={ornament}
        data-tone={tone}
        className={cn(className)}
        {...rest}
      >
        <span data-xen-ornament={ornament} aria-hidden="true" />
      </div>
    );
  }
);

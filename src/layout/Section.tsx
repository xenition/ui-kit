import * as React from 'react';
import { cn } from '../primitives/cn';
import { SPACE_GAP, type SpaceKey } from './_tokens';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  /** Vertical gap between the header and the content, from the spacing scale. */
  spacing?: SpaceKey;
}

/**
 * A titled content block: an optional `title`/`subtitle` header followed by its
 * children, separated by a token-bound `spacing` gap. Rendered as a `<section>`.
 * Type sizes, colors, and spacing trace to the theme tokens; no literal colors.
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(function Section(
  { title, subtitle, spacing = 'md', className, children, ...rest },
  ref
) {
  const hasHeader = Boolean(title || subtitle);
  return (
    <section ref={ref} className={cn('flex flex-col', SPACE_GAP[spacing], className)} {...rest}>
      {hasHeader ? (
        <div className={cn('flex flex-col', SPACE_GAP.xs)}>
          {title ? <h2 className="text-lg font-semibold text-on-surface">{title}</h2> : null}
          {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
});

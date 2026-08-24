import * as React from 'react';
import { cn } from '../primitives/cn';
import { SPACE_GAP } from './_tokens';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  /** Trailing action node(s) (e.g. buttons) rendered opposite the title. */
  actions?: React.ReactNode;
}

/**
 * Screen header: a prominent `title` with optional `subtitle` on the left and an
 * `actions` slot on the right, laid out over a token bottom border. Type sizes,
 * colors, and spacing trace to the theme tokens; no literal colors.
 */
export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
  { title, subtitle, actions, className, ...rest },
  ref
) {
  return (
    <header
      ref={ref}
      className={cn(
        'flex flex-row items-start justify-between',
        SPACE_GAP.md,
        'pb-[var(--xen-space-md)] border-b border-border',
        className
      )}
      {...rest}
    >
      <div className={cn('flex flex-col min-w-0 shrink', SPACE_GAP.xs)}>
        <h1 className="text-2xl font-bold text-on-surface">{title}</h1>
        {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
});

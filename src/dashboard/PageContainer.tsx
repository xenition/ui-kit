import * as React from 'react';
import { cn } from '../primitives/cn';

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional page title rendered at the top. */
  title?: string;
  /** Optional subtitle under the title. */
  subtitle?: string;
  /** Trailing header slot next to the title (e.g. a primary action). */
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * The outer wrapper for a page/screen: fills with the `surface` token and
 * applies consistent padding. Renders an optional title/subtitle header with a
 * trailing action. Token-only.
 */
export const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  function PageContainer({ title, subtitle, headerAction, children, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn('min-h-full bg-surface p-lg text-on-surface', className)}
        {...rest}
      >
        {title ? (
          <div className="mb-lg flex items-start justify-between gap-md">
            <div className="flex min-w-0 flex-1 flex-col gap-xs">
              <h1 className="text-2xl font-bold text-on-surface">{title}</h1>
              {subtitle ? <p className="text-base text-muted">{subtitle}</p> : null}
            </div>
            {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
          </div>
        ) : null}
        {children}
      </div>
    );
  }
);

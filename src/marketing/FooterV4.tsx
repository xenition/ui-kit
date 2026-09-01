import * as React from 'react';
import { cn } from '../primitives/cn';
import type { FooterProps, FooterColumnProps } from './Footer';

/** Drop-in for {@link FooterProps} — same props, the V4 "showcase" design. */
export type FooterV4Props = FooterProps;

/** Drop-in for {@link FooterColumnProps} — same props, the V4 "showcase" design. */
export type FooterColumnV4Props = FooterColumnProps;

/**
 * Footer — **V4** "showcase" design (web parity of the native V4). A refined
 * multi-column marketing footer on `bg-surface` opened by a top hairline: a
 * wider brand/`logo` column beside `FooterColumnV4` link groups, then a
 * bordered bottom bar carrying the legal line + social/`bottom` row. A content
 * section, so NOT a gradient surface. `logo` and `bottom` are node slots. Same
 * props/behavior as {@link FooterProps}; token-only colors, no literals.
 */
export const FooterV4 = React.forwardRef<HTMLElement, FooterV4Props>(function FooterV4(
  { logo, bottom, className, children, ...rest },
  ref
) {
  return (
    <footer
      ref={ref}
      data-xen-footer=""
      className={cn('border-t border-border bg-surface text-on-surface', className)}
      {...rest}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-[var(--xen-space-xl)] px-[var(--xen-space-lg)] py-[var(--xen-space-2xl)] md:grid-cols-4 lg:grid-cols-5">
        {logo !== undefined ? (
          <div className="col-span-2 flex flex-col gap-[var(--xen-space-md)] md:col-span-4 lg:col-span-2">
            {logo}
          </div>
        ) : null}
        {children}
      </div>
      {bottom !== undefined ? (
        <div
          data-xen-footer-bottom=""
          className="border-t border-border px-[var(--xen-space-lg)] py-[var(--xen-space-md)]"
        >
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-[var(--xen-space-md)] text-sm text-muted">
            {bottom}
          </div>
        </div>
      ) : null}
    </footer>
  );
});

/**
 * FooterColumn — **V4** "showcase" design (web parity of the native V4). One
 * refined link group: a bold, uppercase, wide-tracked `title` heading over a
 * column of muted links that brighten to `text-primary` on hover, each link a
 * `≥44px` tap target. `title` honored exactly. Same props/behavior as
 * {@link FooterColumnProps}; token-only colors, no literals.
 */
export const FooterColumnV4 = React.forwardRef<HTMLDivElement, FooterColumnV4Props>(
  function FooterColumnV4({ title, className, children, ...rest }, ref) {
    return (
      <nav
        ref={ref}
        data-xen-footer-column=""
        aria-label={typeof title === 'string' ? title : undefined}
        className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
        {...rest}
      >
        <h3 className="font-heading text-xs font-extrabold uppercase tracking-widest text-on-surface">
          {title}
        </h3>
        <div className="flex flex-col gap-[var(--xen-space-xs)] text-sm text-muted [&_a:hover]:text-primary [&_a]:inline-flex [&_a]:min-h-[44px] [&_a]:items-center [&_a]:transition-colors">
          {children}
        </div>
      </nav>
    );
  }
);

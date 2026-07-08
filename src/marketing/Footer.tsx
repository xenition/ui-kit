import * as React from 'react';
import { cn } from '../primitives/cn';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand slot rendered as the first (wider) column. */
  logo?: React.ReactNode;
  /** Bottom bar content (copyright, social icons, …). */
  bottom?: React.ReactNode;
}

/**
 * Multi-column marketing footer. `children` are `FooterColumn`s; `bottom`
 * renders in a bordered bar under the columns.
 */
export const Footer = React.forwardRef<HTMLElement, FooterProps>(function Footer(
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
          <div className="col-span-2 flex flex-col gap-[var(--xen-space-sm)] md:col-span-4 lg:col-span-2">
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
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-[var(--xen-space-sm)] text-sm text-muted">
            {bottom}
          </div>
        </div>
      ) : null}
    </footer>
  );
});

export interface FooterColumnProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Column heading. */
  title: React.ReactNode;
}

/** One link group in the footer (children are the links). */
export const FooterColumn = React.forwardRef<HTMLDivElement, FooterColumnProps>(
  function FooterColumn({ title, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-xen-footer-column=""
        className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
        {...rest}
      >
        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted">
          {title}
        </h3>
        <div className="flex flex-col gap-[var(--xen-space-xs)] text-sm [&_a:hover]:text-primary [&_a]:transition-colors">
          {children}
        </div>
      </div>
    );
  }
);

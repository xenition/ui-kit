import * as React from 'react';
import { cn } from './cn';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

/** Breadcrumb trail bound to the theme tokens. The last item is the current page. */
export function Breadcrumb({ items, separator = '/', className }: BreadcrumbProps): React.ReactElement {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-sm', className)}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {(it.href || it.onClick) && !last ? (
              <a
                href={it.href}
                onClick={it.onClick}
                className="text-muted transition-colors hover:text-on-surface"
              >
                {it.label}
              </a>
            ) : (
              <span
                aria-current={last ? 'page' : undefined}
                className={last ? 'font-medium text-on-surface' : 'text-muted'}
              >
                {it.label}
              </span>
            )}
            {!last && <span className="text-muted">{separator}</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

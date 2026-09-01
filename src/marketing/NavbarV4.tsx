import * as React from 'react';
import { cn } from '../primitives/cn';
import type { NavbarProps } from './Navbar';

/** Drop-in for {@link NavbarProps} — same props, the V4 "showcase" design. */
export type NavbarV4Props = NavbarProps;

/**
 * Navbar — **V4** "showcase" design (web parity of the native V4). NOT a
 * gradient surface: a crisp, refined marketing bar on a solid `surface` ground
 * with a clean bottom border, a bolder brand slot, and clear medium-weight
 * links. Sticky behavior + the passive scroll listener are preserved — once
 * scrolled past `scrollThreshold` the bar keeps its border and gains a subtle
 * backdrop blur. `children` are the nav links (collapsing behind a disclosure
 * menu on small screens). Honors every prop of {@link NavbarProps}
 * (`logo`/`actions`/`scrollThreshold`/`menuLabel`); token-only colors, no
 * literals.
 */
export const NavbarV4 = React.forwardRef<HTMLElement, NavbarV4Props>(function NavbarV4(
  { logo, actions, scrollThreshold = 8, menuLabel = 'Menu', className, children, ...rest },
  ref
) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const menuId = React.useId();

  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const onScroll = (): void => setScrolled(window.scrollY > scrollThreshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollThreshold]);

  return (
    <header
      ref={ref}
      data-xen-navbar=""
      data-scrolled={scrolled ? 'true' : 'false'}
      className={cn(
        'sticky top-0 z-50 border-b border-border bg-surface transition-shadow',
        scrolled && 'shadow-sm backdrop-blur-md',
        className
      )}
      {...rest}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-[var(--xen-space-md)] px-[var(--xen-space-lg)] py-[var(--xen-space-sm)]">
        {logo !== undefined ? (
          <div className="flex items-center font-heading text-lg font-extrabold tracking-tight text-on-surface">
            {logo}
          </div>
        ) : null}
        <nav className="hidden items-center gap-[var(--xen-space-lg)] text-sm font-semibold text-on-surface md:flex">
          {children}
        </nav>
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          {actions}
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={menuLabel}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-sm)] p-2 text-on-surface hover:bg-neutral-100 md:hidden"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id={menuId}
          data-xen-navbar-menu=""
          className="flex flex-col gap-[var(--xen-space-sm)] border-t border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-sm font-semibold text-on-surface md:hidden"
        >
          {children}
        </nav>
      ) : null}
    </header>
  );
});

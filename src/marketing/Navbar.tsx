import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';

/**
 * Translucent bar color lives in an injected rule so it can use `color-mix`
 * over the surface token — no literal colors, dark mode follows the vars.
 */
const NAVBAR_CSS = `
[data-xen-navbar][data-scrolled="true"] {
  background-color: color-mix(in srgb, var(--xen-surface) 80%, transparent);
}
`;

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand slot (logo image, wordmark, …). */
  logo?: React.ReactNode;
  /** Right-side slot (sign-in button, theme toggle, …). */
  actions?: React.ReactNode;
  /** Scroll distance in px after which the blur/border chrome appears. */
  scrollThreshold?: number;
  /** Accessible label for the mobile menu button. */
  menuLabel?: string;
}

/**
 * Sticky marketing navbar: transparent at the top of the page, gaining a
 * translucent backdrop-blur bar once scrolled (toggled by a passive scroll
 * listener). `children` are the nav links (hidden behind a disclosure menu
 * on small screens). The translucent background uses `color-mix` over the
 * surface token — no literal colors.
 */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(function Navbar(
  { logo, actions, scrollThreshold = 8, menuLabel = 'Menu', className, children, ...rest },
  ref
) {
  injectStyleOnce('xen-navbar-styles', NAVBAR_CSS);

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
        'sticky top-0 z-50 transition-colors',
        scrolled && 'border-b border-border backdrop-blur-md',
        className
      )}
      {...rest}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-[var(--xen-space-md)] px-[var(--xen-space-lg)] py-[var(--xen-space-sm)]">
        {logo !== undefined ? <div className="flex items-center">{logo}</div> : null}
        <nav className="hidden items-center gap-[var(--xen-space-lg)] text-sm font-medium text-on-surface md:flex">
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
            className="inline-flex items-center justify-center rounded-[var(--xen-radius-sm)] p-2 text-on-surface hover:bg-neutral-100 md:hidden"
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
          className="flex flex-col gap-[var(--xen-space-sm)] border-t border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-on-surface md:hidden"
        >
          {children}
        </nav>
      ) : null}
    </header>
  );
});

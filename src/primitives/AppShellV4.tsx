import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import type { AppShellProps } from './AppShell';
import { cn } from './cn';
import { CHROME_V4_CSS, CHROME_V4_STYLE_ID, MIN_TAP_CLASS } from './internal/chrome-v4';
import { SURFACE_V4_CSS, SURFACE_V4_DRAWER_CSS } from './internal/surface-v4';

export type { AppShellProps as AppShellV4Props };

/**
 * `AppShell`, V4 — the same props, and exactly one layer.
 *
 * ## Which container earns depth, and which does not
 *
 * §11 asks that a container earn its existence. This shell has four candidates
 * and gives depth to one of them:
 *
 * - The **persistent rail** is attached to the page edge and separated by the
 *   `Sidebar`'s own hairline. It is not floating, so it casts nothing.
 * - The **top bar** is sticky, not raised. It stays flat with a hairline: a
 *   shadow under a bar that content scrolls beneath is the honest signal, but
 *   only once the content is actually under it, and a shell cannot know that
 *   without owning the scroll position of a region the caller fills. A hairline
 *   is true in every state, which §14 prefers to a decoration that is right
 *   half the time.
 * - The **content column** is the page. Pages do not float.
 * - The **slide-in drawer** genuinely is above the page, over a scrim, with the
 *   content still visible behind it. That one takes `--xen-elevation-sheet`,
 *   the same altitude as every other V4 overlay.
 *
 * The drawer wrapper is always `solid` rather than following the seed's glass
 * setting, and that is deliberate: it holds an opaque `Sidebar` that paints its
 * own surface, so a translucent wrapper would frost nothing. A component should
 * not claim a treatment it cannot deliver.
 *
 * ## The scrim
 *
 * `--xen-elevation-color` at a fixed alpha, shared with `ModalV4`, `DrawerV4`
 * and the rest. The base's `bg-neutral-900/50` is a LIGHT-oriented ramp step:
 * the dark block re-emits the ramps mirrored, so it paints a near-white veil
 * over a dark page.
 *
 * ## Motion
 *
 * The drawer travels the whole of itself from the left edge — §36.5's spatial
 * continuity, so the movement says where it came from and where dismissing it
 * sends it back — on the same keyframes and the same duration `DrawerV4` uses,
 * because they are the same object. Under `prefers-reduced-motion` the travel
 * becomes a fade.
 *
 * ## The menu button
 *
 * It hovers and presses with the M3 state layer rather than
 * `hover:bg-neutral-100`, rings with the shared `--xen-ring`, and clears the
 * 44px target composed from the spacing scale. The base's `p-2` around a 20px
 * glyph put it at 36 — under the target, on the control that is the only way
 * into navigation on a phone.
 */
export const AppShellV4 = React.forwardRef<HTMLDivElement, AppShellProps>(function AppShellV4(
  { sidebar, header, children, sidebarWidth = 260, menuLabel = 'Toggle navigation', className, ...rest },
  ref
) {
  injectStyleOnce(CHROME_V4_STYLE_ID, CHROME_V4_CSS);
  injectStyleOnce('xen-surface-v4-styles', SURFACE_V4_CSS);
  injectStyleOnce('xen-surface-v4-drawer-styles', SURFACE_V4_DRAWER_CSS);

  const [open, setOpen] = React.useState(false);
  const drawerId = React.useId();

  // Escape closes the drawer. A layer over a scrim that cannot be dismissed
  // from the keyboard is a trap (§46).
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div
      ref={ref}
      className={cn('flex min-h-screen w-full bg-surface text-on-surface', className)}
      {...rest}
    >
      {/* Persistent rail on wide screens. Attached, not floating. */}
      <aside className="hidden shrink-0 md:block" style={{ width: sidebarWidth }}>
        <div className="sticky top-0 h-screen">{sidebar}</div>
      </aside>

      {/* The one layer: a drawer over a scrim, on narrow screens. */}
      {open ? (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            data-xen-v4-scrim=""
            className="absolute inset-0"
          />
          <div
            id={drawerId}
            data-xen-v4-drawer="left"
            data-xen-v4-panel="solid"
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: sidebarWidth }}
          >
            {sidebar}
          </div>
        </div>
      ) : null}

      {/* Main column. */}
      <div className="flex min-w-0 flex-1 flex-col">
        {header !== undefined ? (
          <header className="sticky top-0 z-30 flex items-center gap-md border-b border-border bg-surface px-lg py-md">
            <button
              type="button"
              aria-label={menuLabel}
              aria-expanded={open}
              aria-controls={drawerId}
              onClick={() => setOpen((prev) => !prev)}
              data-xen-v4-chrome="on-surface"
              className={cn(
                'inline-flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]',
                'px-sm text-on-surface focus-visible:outline-none md:hidden',
                MIN_TAP_CLASS
              )}
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
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            </button>
            <div className="flex min-w-0 flex-1 items-center justify-between gap-md">{header}</div>
          </header>
        ) : null}
        <main className="min-w-0 flex-1 overflow-y-auto p-lg">{children}</main>
      </div>
    </div>
  );
});

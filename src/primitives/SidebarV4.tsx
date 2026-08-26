import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import type { SidebarGroup, SidebarItem, SidebarProps } from './Sidebar';
import { CHROME_V4_CSS, CHROME_V4_STYLE_ID, MIN_TAP_CLASS } from './internal/chrome-v4';

export type { SidebarProps as SidebarV4Props, SidebarItem, SidebarGroup };

/**
 * The row, minus the state.
 *
 * `MIN_TAP_CLASS` rather than `py-sm`: a nav row is the control a user hits
 * most often in a dashboard, and the base's padding put it at about 34 tall.
 */
const ROW_BASE = cn(
  'relative flex w-full items-center gap-sm rounded-[var(--xen-radius-md)]',
  'pl-md pr-md text-left font-body text-sm',
  'focus-visible:outline-none',
  MIN_TAP_CLASS
);

/**
 * The current destination, and the way it says so.
 *
 * Three signals, not one: a brand **tint** (not a brand fill), the brand text
 * colour, and a leading rail. §35.6 asks that colour create hierarchy rather
 * than noise — a row filled solid `primary`, which is what the native base
 * does, wins the "which one" question and loses the label, the icon and the
 * group structure under a brand bar. A tint plus a weight change plus an edge
 * marker says *this one* without shouting it, and the rail survives for a user
 * who cannot separate the tint from the surface at all.
 *
 * The tint is `color-mix()` of two custom properties rather than
 * `bg-primary-50`. The ramps carry the LIGHT orientation in both schemes, so
 * `primary-50` is the palest step on a dark page too — a near-white slab.
 */
function SidebarRow({ item }: { item: SidebarItem }): React.ReactElement {
  const active = item.active === true;
  const className = cn(
    ROW_BASE,
    active
      ? 'bg-[color-mix(in_srgb,var(--xen-primary)_12%,var(--xen-surface))] font-semibold text-primary-text'
      : 'font-medium text-on-surface'
  );
  const icon =
    item.icon !== undefined ? (
      <span aria-hidden="true" className="inline-flex shrink-0 items-center justify-center">
        {item.icon}
      </span>
    ) : null;
  const rail = active ? (
    <span
      aria-hidden="true"
      className="absolute inset-y-sm left-0 w-[2px] rounded-[var(--xen-radius-full)] bg-primary"
    />
  ) : null;
  const body = (
    <>
      {rail}
      {icon}
      <span className="truncate">{item.label}</span>
    </>
  );

  if (item.href !== undefined) {
    return (
      <a
        href={item.href}
        aria-current={active ? 'page' : undefined}
        onClick={item.onSelect}
        data-xen-v4-chrome={active ? 'primary' : 'on-surface'}
        className={className}
      >
        {body}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      onClick={item.onSelect}
      data-xen-v4-chrome={active ? 'primary' : 'on-surface'}
      className={className}
    >
      {body}
    </button>
  );
}

/**
 * `Sidebar`, V4 — the same props, and a rail that answers "where am I?".
 *
 * ## No shadow, and that is the point
 *
 * A persistent nav rail is **not** a layer. It is attached to the edge of the
 * page and separated by a hairline, and §11 asks that a container earn its
 * existence rather than draw a box because that looks modern. So this component
 * spends no `elevation` at all: the only V4 primitive in the chrome family that
 * deliberately does not.
 *
 * The rail genuinely does become a layer in one situation — slid in over the
 * page on a narrow screen — and that is `AppShellV4`'s job, because the drawer
 * is the thing that is floating, not the sidebar inside it. Putting the shadow
 * here would make the persistent rail cast one onto the content beside it,
 * which is a shadow with nothing to fall from.
 *
 * ## Saying where the user is
 *
 * §29 gives navigation one job above every other: the user should always know
 * where they are, and §32 asks that they recognise it rather than recall it. So
 * the current row carries three signals — a brand tint, the brand text colour
 * and a leading rail — rather than the single solid `primary` fill the native
 * base paints, which repaints the row and takes the icon and the label with it.
 *
 * Group headings move from `muted` to `muted-text`: `muted` is a decorative
 * slot with no contrast promise, and a section heading is text.
 *
 * ## Feedback
 *
 * Hover and press are the M3 state layer — the row's own content colour at
 * 0.08 / 0.12 over `surface`. The base's `hover:bg-neutral-100` is a
 * light-oriented ramp step and paints a near-white slab across a dark rail.
 * Focus is `--xen-ring`, the one ring the kit shares, rather than
 * `ring-primary-300`, which is another ramp step and inverts the same way.
 */
export const SidebarV4 = React.forwardRef<HTMLElement, SidebarProps>(function SidebarV4(
  { brand, items, groups, footer, className, ...rest },
  ref
) {
  injectStyleOnce(CHROME_V4_STYLE_ID, CHROME_V4_CSS);
  const resolvedGroups: SidebarGroup[] = groups ?? (items ? [{ items }] : []);

  return (
    <nav
      ref={ref}
      aria-label="Sidebar"
      className={cn(
        'flex h-full flex-col gap-md border-r border-border bg-surface text-on-surface',
        'px-sm py-lg',
        className
      )}
      {...rest}
    >
      {brand !== undefined ? (
        <div className="flex items-center px-sm font-heading text-lg font-bold">{brand}</div>
      ) : null}
      <div className="flex flex-1 flex-col gap-lg overflow-y-auto">
        {resolvedGroups.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-xs">
            {group.label !== undefined ? (
              <div className="px-md pb-xs font-body text-xs font-semibold uppercase tracking-wide text-muted-text">
                {group.label}
              </div>
            ) : null}
            {group.items.map((item, ii) => (
              <SidebarRow key={ii} item={item} />
            ))}
          </div>
        ))}
      </div>
      {footer !== undefined ? (
        <div className="border-t border-border pt-md">{footer}</div>
      ) : null}
    </nav>
  );
});

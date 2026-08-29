import * as React from 'react';
import type { ScrollableTabItem, ScrollableTabsProps } from './ScrollableTabs';
export type { ScrollableTabsProps as ScrollableTabsV4Props, ScrollableTabItem };
/**
 * **V4 scrollable tabs** — the web twin of the native `ScrollableTabsV4`, same
 * props as {@link ScrollableTabs}, a different design line.
 *
 * Everything `TabsV4` does, plus the two things that only matter once the row
 * is longer than its container.
 *
 * ## The selected tab comes to you
 *
 * A scrolling tab bar can put the answer to "where am I" out of view, which
 * makes §32 unsatisfiable: there is nothing to recognise. So the row scrolls
 * the selected tab into view whenever the selection changes — including when
 * it changes from somewhere else, which is the case the user cannot fix by
 * scrolling because they never saw it happen.
 *
 * The scroll is smooth for the same reason the underline slides (§36.5): the
 * bar moving under a stationary pointer explains where the content went, while
 * a jump replaces one view with another and leaves the reader to work out what
 * changed. `prefers-reduced-motion` switches it to an instant scroll (§36.10) —
 * the tab still arrives.
 *
 * ## The count chip owns its ground
 *
 * The base bar filled the active chip with `bg-primary` and labelled it
 * `text-surface` — two slots with no contrast relationship at all; on a pale
 * primary that is white on near-white. The idle chip was worse: `bg-muted` as
 * a FILL with `text-surface`, a contrast pair by coincidence in light and not
 * at all in dark.
 *
 * V4 gives each chip a ground it owns, mixed in the injected sheet rather than
 * borrowed: active is `primary` with its guaranteed `on-primary`, idle is
 * `on-surface` stirred OPAQUELY into `surface` at 12% — one expression that
 * moves correctly with the scheme instead of a light case and a dark one.
 */
export declare const ScrollableTabsV4: React.ForwardRefExoticComponent<ScrollableTabsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScrollableTabsV4.d.ts.map
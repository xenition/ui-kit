import * as React from 'react';
import type { ScrollableTabItem, ScrollableTabsProps } from './ScrollableTabs';
export type { ScrollableTabsProps as ScrollableTabsV4Props, ScrollableTabItem };
/**
 * **V4 scrollable tabs** — same props as {@link ScrollableTabs}, a different
 * design line.
 *
 * Everything `TabsV4` does, plus the two things that only matter once the row
 * is longer than the screen.
 *
 * ## The selected tab comes to you
 *
 * A scrolling tab bar can put the answer to "where am I" off-screen, which
 * makes §32 unsatisfiable: there is nothing to recognise. So the row scrolls
 * the selected tab into view whenever the selection changes — including when
 * it changes from somewhere else, which is the case the user cannot fix by
 * scrolling because they never saw it happen.
 *
 * The scroll is animated for the same reason the underline slides (§36.5): the
 * bar moving under a stationary finger explains where the content went, while
 * a jump replaces one screen with another and leaves the reader to work out
 * what changed. Reduce Motion jumps instead (§36.10) — the tab still arrives.
 *
 * ## The count chip owns its ground
 *
 * The base bar filled the active chip with `primary` and labelled it
 * `colors.surface` — two slots with no contrast relationship at all; on a pale
 * primary that is white on near-white. The idle chip was worse: `muted` as a
 * FILL with `surface` text, which is a contrast pair by coincidence in light
 * and not at all in dark.
 *
 * V4 gives each chip a ground it owns. Active is `primary` with its guaranteed
 * `onPrimary`. Idle is `onSurface` composited OPAQUELY into `surface` at 12% —
 * opaque because a translucent tint borrows whatever is behind it, and the
 * label's promise was never about that. The label is then re-measured against
 * the ground the chip actually painted, exactly as `BadgeV4` does.
 */
export declare function ScrollableTabsV4({ items, value, onValueChange, style, }: ScrollableTabsProps): React.ReactElement;
//# sourceMappingURL=ScrollableTabsV4.d.ts.map
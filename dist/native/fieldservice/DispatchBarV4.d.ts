import * as React from 'react';
import type { DispatchBarProps, DispatchStage } from './DispatchBar';
export interface DispatchBarV4Props extends DispatchBarProps {
    /**
     * The label the primary action takes once an irreversible advance is armed.
     * Default `` `Confirm ${next}` ``.
     */
    confirmAdvanceLabel?: (next: string) => string;
    /** Override the five stage names — they lived inside the component. */
    stageLabels?: Partial<Record<DispatchStage, string>>;
}
/**
 * **V4 dispatch bar** — same props as {@link DispatchBar} plus
 * `confirmAdvanceLabel` and `stageLabels`.
 *
 * ## Five changes
 *
 * 1. **No enabled button that does nothing.** `canAdvance` never consulted
 *    `onAdvance`, so `<DispatchBar stage="on-site" />` shipped a live
 *    "Complete" that was a no-op — the loudest control on the bar, wired to
 *    nothing. The action now appears only when there is a handler to run.
 * 2. **Completing a visit takes a confirming press.** It is irreversible and
 *    the bar offers no action afterwards, so the first press arms the button
 *    and relabels it through `confirmAdvanceLabel`; the second one advances.
 * 3. **The bar clears the home indicator.** It is pinned to the bottom of the
 *    screen and read no safe-area inset at all, so on a notched phone the
 *    primary action sat under the indicator. It pays `insets.bottom` now, the
 *    way every other edge-anchored V4 component does. Needs a
 *    `SafeAreaProvider` above it, which Expo mounts by default.
 * 4. **The actions clear 44** — `size="sm"` is ~34 today — and the disc is
 *    decorative, so a reader no longer stops on it and then hears the same
 *    stage again from the line below.
 * 5. **The stage is not printed twice.** With no `jobLabel` the base put the
 *    stage on the title line *and* on the meta line under it.
 */
export declare function DispatchBarV4({ stage, eta, jobLabel, onAdvance, onNavigate, loading, confirmAdvanceLabel, stageLabels, style, }: DispatchBarV4Props): React.ReactElement;
//# sourceMappingURL=DispatchBarV4.d.ts.map
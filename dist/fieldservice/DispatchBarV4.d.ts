import * as React from 'react';
import type { DispatchBarProps, DispatchStage } from './DispatchBar';
export interface DispatchBarV4Props extends DispatchBarProps {
    /**
     * How the armed "Complete" action is named while it waits for its confirming
     * press. Default `` (next) => `Confirm ${next}` ``.
     */
    confirmAdvanceLabel?: (next: string) => string;
    /** Override the stage words — five English phrases lived inside. */
    stageLabels?: Partial<Record<DispatchStage, string>>;
}
/**
 * **V4 dispatch bar** — the web twin of the native `DispatchBarV4`, same props
 * as {@link DispatchBar} plus `confirmAdvanceLabel` and `stageLabels`.
 *
 * ## Six changes
 *
 * 1. **No enabled button that does nothing.** `canAdvance` never consulted
 *    `onAdvance`, so `<DispatchBar stage="on-site" />` shipped a live
 *    "Complete" that swallowed every press in silence. The action now exists
 *    only when there is a handler to receive it.
 * 2. **Completing a visit takes a confirming press.** It is irreversible — the
 *    bar offers no action afterwards — and it was one tap on a phone held in a
 *    glove. The first press arms and renames the button through
 *    `confirmAdvanceLabel`; the second advances.
 * 3. **`loading` means the same thing on both twins.** The web bar only set
 *    `disabled`, so a caller who showed a spinner on the phone got a dead grey
 *    button on the tablet. It is now `aria-busy` as well as disabled.
 * 4. **The stage is not printed twice.** Without a `jobLabel` the bar drew the
 *    stage word as its title and then again underneath it.
 * 5. **The disc is decorative.** It carried an accessible label, so the stage
 *    was announced from the disc and then from the line under the title.
 * 6. **The primary action clears 44** and a dispatch stage stops wearing a
 *    status colour — see {@link STAGE_V4}.
 */
export declare const DispatchBarV4: React.ForwardRefExoticComponent<DispatchBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DispatchBarV4.d.ts.map
import * as React from 'react';
import type { PodcastRowProps } from './PodcastRow';
export interface PodcastRowV4Props extends PodcastRowProps {
    /** The play control's verb when the episode is stopped. Default `'Play'`. */
    playLabel?: string;
    /** Its verb when the episode is running. Default `'Pause'`. */
    pauseLabel?: string;
}
/**
 * **V4 podcast row** — the web twin of the native `PodcastRowV4`, same props as
 * {@link PodcastRow} plus `playLabel` and `pauseLabel`.
 *
 * ## Five changes
 *
 * 1. **The keyboard can play a podcast.** The base put the row's `onKeyDown`
 *    on the container that *wraps* the play button. Focus the play button,
 *    press Space: the container's handler ran first, called `preventDefault()`
 *    — which cancels the button's own Space activation, because browsers fire
 *    that on keyup — and navigated. Enter fired both: audio started and the
 *    page changed under it. There was no keyboard-only way to play an episode
 *    from a podcast row, and a mouse user never saw it. The row's activation
 *    now sits on a `<button>` that wraps only the artwork and the text, and
 *    the play control is its **sibling** — which removes the key bubbling, the
 *    invalid nested interactive content and native's unreachable play control
 *    in one change.
 * 2. **No dead play button.** `onPlayToggle` is optional; without it the base
 *    still drew a permanently greyed control. It is now not drawn at all.
 * 3. **The play control clears 44.** It was 40 square on both twins.
 * 4. **Press is the state layer.** The component carried three different
 *    opacity dims — 0.9 on the row, 0.8 on play, 0.5 on disabled — two of
 *    which sit at or below M3's disabled band.
 * 5. **The artwork placeholder is the shared media ground**, not
 *    `bg-neutral-100` on web against `colors.border` on native.
 */
export declare const PodcastRowV4: React.ForwardRefExoticComponent<PodcastRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PodcastRowV4.d.ts.map
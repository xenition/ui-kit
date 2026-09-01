import * as React from 'react';
import type { PodcastRowProps } from './PodcastRow';
export interface PodcastRowV4Props extends PodcastRowProps {
    /** Announced on the play control when the episode is stopped. Default `'Play'`. */
    playLabel?: string;
    /** Announced on it when the episode is playing. Default `'Pause'`. */
    pauseLabel?: string;
}
/**
 * **V4 podcast row** — same props as {@link PodcastRow} plus `playLabel` and
 * `pauseLabel`.
 *
 * ## Five changes
 *
 * 1. **The keyboard can play a podcast.** The row's activation used to *wrap*
 *    the play button. On the web that meant the container's `onKeyDown` fired
 *    first: Space cancelled the button's own activation and navigated instead,
 *    Enter did both, and the click path was guarded while the keyboard path
 *    was not — so there was no keyboard-only way to play an episode from a
 *    podcast row. Here the same nesting made the play control unreachable to
 *    VoiceOver as an element of its own. The row's activation now sits on a
 *    control that covers only the artwork and the text, and the play button is
 *    its **sibling**. One change, three defects.
 * 2. **No dead play button.** `onPlayToggle` is optional; without it the
 *    control is not rendered, rather than rendered permanently greyed.
 * 3. **The play control clears 44.** It was 40 square with hit slop over it.
 * 4. **Press is a state layer.** The row carried three different opacity dims
 *    — 0.9 for the row, 0.7 for the button, 0.5 for its disabled state — and
 *    the last two are inside M3's disabled band.
 * 5. **The artwork placeholder takes the shared media ground**, not the
 *    hairline token, and no longer floods a missing cover in brand accent.
 *
 * **Renders nothing without an episode title** (§4.5).
 */
export declare function PodcastRowV4({ episode, playing, onPlayToggle, onPress, variant, playLabel, pauseLabel, style, }: PodcastRowV4Props): React.ReactElement | null;
//# sourceMappingURL=PodcastRowV4.d.ts.map
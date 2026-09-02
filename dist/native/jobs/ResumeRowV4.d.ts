import * as React from 'react';
import type { ResumeRowProps } from './ResumeRow';
export interface ResumeRowV4Props extends ResumeRowProps {
    /** Copy on the default marker. Default `'Default'`. */
    defaultLabel?: string;
    /** Copy on the set-default action. Default `'Set default'`. */
    setDefaultLabel?: string;
    /** Name of the download affordance. Default `'Download'`. */
    downloadLabel?: string;
    /** Re-word the updated age. Default `'2d ago'`. */
    formatRelative?: (iso: string) => string;
}
/**
 * **V4 résumé row** — same props as {@link ResumeRow} plus `defaultLabel`,
 * `setDefaultLabel`, `downloadLabel` and `formatRelative`.
 *
 * ## Five changes
 *
 * 1. **Download and Set default are reachable.** Both sat inside the row's own
 *    `Pressable`, which flattens its subtree on native — so neither was a
 *    focus stop, and the ⬇ had `hitSlop={8}` and no size of its own, roughly
 *    28 points of target for the row's primary action. Both are now siblings
 *    of the activation, with names and 44 targets.
 * 2. **`Default` stopped being a success badge.** Which of three files is the
 *    default one is **identity**, not health — spending `success` on it means
 *    the other two résumés read as somehow not-good. A neutral outline chip
 *    says the same thing and leaves green meaning green.
 * 3. **The file tile stopped being drawn in `border`.** `border` is the
 *    hairline colour; as a 40-square fill it made the tile read as an empty
 *    input. It is now a soft `IconV4` badge, whose ground and glyph are a
 *    measured pair.
 * 4. **The row announces the file, not just its name.** The updated age, the
 *    size and the default marker are all inside the activation and flattened
 *    into it, so they belong in its name.
 * 5. **Tokens and press.** `muted` inking the meta line becomes `mutedText`,
 *    `surface` becomes `card`, and `opacity: 0.9` becomes a state layer.
 *
 * **Renders nothing without a file name** (§4.5).
 */
export declare function ResumeRowV4({ resume, onPress, onDownload, onSetDefault, defaultLabel, setDefaultLabel, downloadLabel, formatRelative, style, }: ResumeRowV4Props): React.ReactElement | null;
//# sourceMappingURL=ResumeRowV4.d.ts.map
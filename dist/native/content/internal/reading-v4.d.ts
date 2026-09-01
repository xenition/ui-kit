/**
 * The `content` module's own V4 vocabulary (native) — the twin of
 * `content/internal/reading-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
import type { XenitionNativeTheme } from '../../theme';
import { clampPercent, metaLine, skeletonFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
export { clampPercent, metaLine, skeletonFill, toneInk };
export type { ToneV4 };
/**
 * The ground behind an image, artwork or hero that has not loaded.
 *
 * The two twins disagreed about this pixel: web painted it `bg-neutral-100` —
 * a raw ramp step, so it ignored the seed — and native painted it
 * `colors.border`, a **hairline** token spent as a fill. `card` is the token
 * the theme added for a raised surface, and it is the same colour on both.
 */
export declare function mediaGround(theme: XenitionNativeTheme): string;
/**
 * A reading position as a whole percent, 0-100.
 *
 * `ReadingProgress` took a raw number and handed it straight to the bar, so a
 * caller mid-computation could push the fill past the track.
 */
export declare function readingPercent(value: number | undefined): number;
/**
 * Build the one accessible name a multi-part editorial row should carry.
 *
 * Commas, not `metaLine`'s middle dot: this is a spoken sentence, and a
 * screen reader either says "middle dot" out loud or swallows the pause.
 * `metaLine` stays for the *visible* meta line, where the dot is the point.
 */
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
//# sourceMappingURL=reading-v4.d.ts.map
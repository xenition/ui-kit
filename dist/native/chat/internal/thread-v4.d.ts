/**
 * The `chat` module's own V4 vocabulary: the presence and receipt tables, and
 * the named size scale that replaces four `size?: number` props.
 *
 * The tone-to-ink table lives in `primitives/internal/tone-v4`.
 *
 * Nothing here is exported from the package.
 */
import type { XenitionNativeTheme } from '../../theme';
import { metaLine, onPair, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import type { Presence } from '../PresenceDot';
import type { ReceiptStatus } from '../ReadReceipt';
export { metaLine, onPair, skeletonFill, toneFill, toneInk };
export type { ToneV4 };
/**
 * A named size, which is the shape a design system is for.
 *
 * `PresenceDot`, `ReadReceipt`, `TypingIndicator` and `VoiceNoteBubble` each
 * take a raw pixel `size?: number` — the one prop shape that invites a caller
 * to pick a number off the scale. The raw prop stays for parity; this is the
 * documented path, and it derives from `spacing` so it moves with the seed.
 */
export type ChatSize = 'sm' | 'md' | 'lg';
export declare function chatSize(theme: XenitionNativeTheme, size: ChatSize): number;
/**
 * Presence → tone and default word.
 *
 * `away` takes `warn` in the base, which overstates it: stepping away is not
 * a caution. It is `neutral` here, and `busy` keeps `danger` because "do not
 * disturb" genuinely is a stop signal.
 */
export declare const PRESENCE_META: Record<Presence, {
    label: string;
    tone: ToneV4;
}>;
/**
 * Receipt → glyph, default word and tone.
 *
 * `failed` is the only state a user must act on, and the base announced it as
 * passively as `sent`. It is `danger`-toned and, in V4, assertive.
 */
export declare const RECEIPT_META: Record<ReceiptStatus, {
    glyph: string;
    label: string;
    tone: ToneV4;
}>;
/** Seconds as `m:ss`, for a voice note's duration and position. */
export declare function clock(seconds: number): string;
//# sourceMappingURL=thread-v4.d.ts.map
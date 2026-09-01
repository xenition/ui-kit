/**
 * The `dating` module's own V4 vocabulary (web) — the twin of
 * `native/dating/internal/profile-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
import { SKELETON_CLASS, TONE_INK, type ToneV4 } from '../../primitives/internal/tone-v4';
import { PHOTO_INK, PHOTO_SCRIM, PHOTO_SCRIM_STRONG, deckPosition } from '../deck-v4';
export { deckPosition, PHOTO_INK, PHOTO_SCRIM, PHOTO_SCRIM_STRONG, SKELETON_CLASS, TONE_INK };
export type { ToneV4 };
/**
 * The five deck actions are **identities, not statuses**.
 *
 * `LikePassButtons` typed them `rewind → warn`, `pass → danger`,
 * `superlike → accent`, `like → success`, `boost → primary` — so `danger` and
 * `warn`, the two slots that mean something has gone wrong, were spent on
 * ordinary non-destructive choices sitting in one toolbar. The glyph carries
 * which action it is.
 */
export declare const ACTION_TONE: Record<string, ToneV4>;
/** The ground behind a skeleton or an unloaded photo — never `border`. */
export declare const PLACEHOLDER_CLASS = "rounded-[var(--xen-radius-sm)] bg-[color-mix(in_srgb,var(--xen-on-card)_12%,var(--xen-card))]";
/** Build the one accessible name a profile card should carry. */
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
//# sourceMappingURL=profile-v4.d.ts.map
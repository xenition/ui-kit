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
export const ACTION_TONE: Record<string, ToneV4> = {
  rewind: 'neutral',
  pass: 'neutral',
  superlike: 'accent',
  like: 'primary',
  boost: 'primary',
};

/** The ground behind a skeleton or an unloaded photo — never `border`. */
export const PLACEHOLDER_CLASS = SKELETON_CLASS;

/** Build the one accessible name a profile card should carry. */
export function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}

/**
 * Internal helpers for `@xenition/ui/medical` (web). Not part of the public
 * surface. Maps a semantic tone key to its `--xen-*` `text-*` token class so a
 * clinical status is expressed by a token color (plus text + glyph elsewhere),
 * never a literal hex.
 */
/** Semantic tones a medical status marker can take. */
export type MedicalTone = 'primary' | 'muted' | 'success' | 'warn' | 'danger' | 'accent';
/** Maps a tone key to its token-bound `text-*` class. */
export declare const TEXT_TONE: Record<MedicalTone, string>;
//# sourceMappingURL=internal.d.ts.map
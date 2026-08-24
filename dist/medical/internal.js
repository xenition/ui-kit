"use strict";
/**
 * Internal helpers for `@xenition/ui/medical` (web). Not part of the public
 * surface. Maps a semantic tone key to its `--xen-*` `text-*` token class so a
 * clinical status is expressed by a token color (plus text + glyph elsewhere),
 * never a literal hex.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEXT_TONE = void 0;
/** Maps a tone key to its token-bound `text-*` class. */
exports.TEXT_TONE = {
    primary: 'text-primary',
    muted: 'text-muted',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
    accent: 'text-accent',
};
//# sourceMappingURL=internal.js.map
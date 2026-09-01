"use strict";
/**
 * The anatomy of an order status, shared by **both twins**.
 *
 * A plain lookup with no React and no platform in it, in its own file for the
 * same reason `formatMoney` is in its own file: a shopper checking an order on
 * their phone and on the web must not be shown two different marks for
 * "shipped", and the only way to guarantee that is for there to be one table.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_PREFIX = exports.STATUS_ANATOMY = void 0;
exports.statusLabel = statusLabel;
exports.statusAnnouncement = statusAnnouncement;
/**
 * The three things a status is made of. **All three, always** — this is where
 * the brief's rule 6 lands.
 *
 * A shopper reading an order list is deciding whether their money arrived,
 * which is the highest-stakes read in the kit, and the base said it in colour
 * alone: six statuses painted in five fills with the word rendered in the
 * `on-*` pair. That fails outright for a reader who cannot separate green from
 * red — `paid` and `cancelled` become the same badge — and it fails silently
 * for everyone in a screenshot, a printout, or a greyscale e-ink reader.
 *
 * So each status carries a **glyph and a word**, and the colour is the third
 * cue rather than the only one.
 *
 * ### On the glyphs
 *
 * Every name is from the kit's named set (`primitives/icon-names.ts`), never a
 * character typed into this file — that set exists precisely so two screens
 * cannot end up with two glyphs for one idea.
 *
 * The glyphs read as the lifecycle rather than as six arbitrary marks: money
 * confirmed (`check`), packed and labelled (`tag`), on its way (`send`),
 * stopped (`close`), sent back (`refresh`), still waiting (`clock`).
 *
 * Four of the six are monochrome symbols and take the badge's `on-*` tint.
 * `clock` and `tag` are colour emoji on most platforms and will **ignore** the
 * tint, which the icon set's own documentation says out loud. They are kept
 * anyway: they are the only glyphs in the set that mean "waiting" and "a
 * labelled parcel", and a correct meaning in the platform's own colours beats
 * a tintable glyph that means something else. The badge is `solid`, so they
 * sit on a saturated ground where a colour emoji still reads as a mark.
 *
 * ### On the colours
 *
 * These are genuine statuses, so they take the semantic slots — brief rule 3
 * reserves `success` / `warn` / `danger` for good, caution and bad, and an
 * order's lifecycle is exactly that. (A discount or a "hot" listing is
 * emphasis, not status, and takes none of these.) Every pair is a
 * compiler-guaranteed `X` / `on-X`, so the label and the glyph are AA against
 * the fill in both schemes with no configuration.
 *
 * `paid` and `fulfilled` share `success` on purpose: they are both good news,
 * and the thing that separates them is the glyph and the word — `✓` for the
 * money confirmed, a parcel label for the goods packed. Which is exactly the
 * point of the rule: the colour was never carrying that distinction, and on
 * the base line nothing was.
 */
exports.STATUS_ANATOMY = {
    pending: { tone: 'warn', icon: 'clock', ink: 'onWarn' },
    paid: { tone: 'success', icon: 'check', ink: 'onSuccess' },
    fulfilled: { tone: 'success', icon: 'tag', ink: 'onSuccess' },
    shipped: { tone: 'primary', icon: 'send', ink: 'onPrimary' },
    cancelled: { tone: 'danger', icon: 'close', ink: 'onDanger' },
    refunded: { tone: 'neutral', icon: 'refresh', ink: 'onSurface' },
};
/** The default label for a status — the status word, capitalized. */
function statusLabel(status) {
    return status.charAt(0).toUpperCase() + status.slice(1);
}
/**
 * What names the word for a screen reader. "Paid" on its own is a word
 * floating in a list; this says what the word is about.
 *
 * The web twin renders it as a visually-hidden prefix and the native twin
 * folds it into one `accessibilityLabel`, so both platforms announce the same
 * sentence from the same string.
 */
exports.STATUS_PREFIX = 'Order status: ';
/** The full announcement for a status badge showing `label`. */
function statusAnnouncement(label) {
    return `${exports.STATUS_PREFIX}${label}`;
}
//# sourceMappingURL=status-v4.js.map
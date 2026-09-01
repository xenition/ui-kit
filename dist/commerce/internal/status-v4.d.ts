/**
 * The anatomy of an order status, shared by **both twins**.
 *
 * A plain lookup with no React and no platform in it, in its own file for the
 * same reason `formatMoney` is in its own file: a shopper checking an order on
 * their phone and on the web must not be shown two different marks for
 * "shipped", and the only way to guarantee that is for there to be one table.
 */
import type { IconName } from '../../primitives/icon-names';
/** The order lifecycle, re-stated structurally so this file imports no component. */
export type StatusKey = 'pending' | 'paid' | 'fulfilled' | 'shipped' | 'cancelled' | 'refunded';
/**
 * The badge tones a status may take.
 *
 * Deliberately the five both twins agree on. The web `BadgeTone` also has
 * `muted`, which the native one does not — picking a tone from the wider union
 * is how a component ends up compiling on one platform and not the other.
 */
export type StatusTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';
/**
 * The ink a glyph and a label take on the filled badge.
 *
 * Every member is in the web `IconColor`, in the native `Icon`'s
 * `keyof SemanticColors`, **and** in `TextTone` — which is what lets one table
 * colour a glyph on one twin and a `TextV4` on the other.
 */
export type StatusInk = 'onSurface' | 'onPrimary' | 'onSuccess' | 'onWarn' | 'onDanger';
export interface StatusAnatomy {
    /** The badge's semantic tone. */
    tone: StatusTone;
    /** The glyph, from the kit's named icon set. */
    icon: IconName;
    /** The glyph's and the label's colour on that tone's fill. */
    ink: StatusInk;
}
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
export declare const STATUS_ANATOMY: Record<StatusKey, StatusAnatomy>;
/** The default label for a status — the status word, capitalized. */
export declare function statusLabel(status: StatusKey): string;
/**
 * What names the word for a screen reader. "Paid" on its own is a word
 * floating in a list; this says what the word is about.
 *
 * The web twin renders it as a visually-hidden prefix and the native twin
 * folds it into one `accessibilityLabel`, so both platforms announce the same
 * sentence from the same string.
 */
export declare const STATUS_PREFIX = "Order status: ";
/** The full announcement for a status badge showing `label`. */
export declare function statusAnnouncement(label: string): string;
//# sourceMappingURL=status-v4.d.ts.map
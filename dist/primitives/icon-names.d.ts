/**
 * The kit's named icon set — a stable, semantic name for every idea an app
 * actually needs an icon for, mapped to one glyph.
 *
 * ## Why this exists
 *
 * `Icon` used to render whatever string it was handed, so `name` and `glyph`
 * were aliases and `<Icon name="home" />` rendered the literal word "home".
 * Every generated app therefore invented its own emoji vocabulary, and two
 * screens in the same app routinely ended up with different glyphs for the same
 * idea — 🗑 on one, ❌ on the other. Naming the set fixes that once: `close` is
 * `close` everywhere, and changing what `close` looks like is a one-line change
 * here rather than a search-and-replace across an app.
 *
 * ## What these glyphs are, honestly
 *
 * **Unicode symbols and emoji — not a vector icon font.** The kit ships no
 * font and no SVG sprite, so the pixels come from whatever the platform's
 * system emoji/symbol font draws. That has real consequences:
 *
 * - The *same* name renders differently on iOS, Android, Windows and the web —
 *   Apple's 🔔 is not Google's 🔔. Expect a family resemblance, not a match.
 * - Emoji glyphs (🏠 🔔 📅 …) are colour fonts on most platforms and will
 *   **ignore** `Icon`'s `color` prop. Only the monochrome symbols (✓ ✕ ← → ›
 *   ⚙ ★ …) actually take the tint. Where a tint is load-bearing — a danger
 *   state, an on-primary glyph — prefer a name from the symbol side of this
 *   map.
 * - A handful of the rarer symbols fall back to a box on older Android. The
 *   set below leans on widely-supported code points for exactly this reason.
 *
 * If an app needs pixel-identical, tintable icons across platforms, it wants a
 * real icon library and should pass its own element — `Icon` is not that, and
 * pretending otherwise is how apps end up with tofu boxes in production.
 *
 * Shared by both twins: the web `Icon` and the native `Icon` import this one
 * file, so the vocabulary cannot drift between platforms.
 */
/**
 * Semantic name → glyph. Ordered by the group a caller thinks in, because that
 * is how someone scans this file looking for "the one for X".
 */
export declare const ICON_GLYPHS: {
    readonly home: "🏠";
    readonly search: "🔍";
    readonly menu: "☰";
    readonly more: "⋯";
    readonly close: "✕";
    readonly back: "←";
    readonly forward: "→";
    readonly 'chevron-left': "‹";
    readonly 'chevron-right': "›";
    readonly 'chevron-up': "⌃";
    readonly 'chevron-down': "⌄";
    readonly external: "↗";
    readonly add: "＋";
    readonly remove: "−";
    readonly check: "✓";
    readonly edit: "✏️";
    readonly trash: "🗑";
    readonly save: "💾";
    readonly copy: "📋";
    readonly share: "📤";
    readonly download: "⤓";
    readonly upload: "⤒";
    readonly refresh: "↻";
    readonly filter: "▽";
    readonly sort: "⇅";
    readonly send: "➤";
    readonly logout: "⏻";
    readonly success: "✓";
    readonly error: "⊗";
    readonly warning: "⚠";
    readonly info: "ⓘ";
    readonly help: "?";
    readonly lock: "🔒";
    readonly unlock: "🔓";
    readonly user: "👤";
    readonly users: "👥";
    readonly settings: "⚙";
    readonly bell: "🔔";
    readonly heart: "♥";
    readonly star: "★";
    readonly 'star-outline': "☆";
    readonly cart: "🛒";
    readonly tag: "🏷";
    readonly card: "💳";
    readonly calendar: "📅";
    readonly clock: "🕐";
    readonly mail: "✉";
    readonly phone: "📞";
    readonly location: "📍";
    readonly camera: "📷";
    readonly image: "🖼";
    readonly document: "📄";
    readonly folder: "📁";
    readonly link: "🔗";
    readonly attachment: "📎";
    readonly bookmark: "🔖";
    readonly chart: "📈";
    readonly globe: "🌐";
    readonly bolt: "⚡";
    readonly sparkle: "✨";
    readonly idea: "💡";
    readonly trophy: "🏆";
    readonly eye: "👁";
    readonly 'eye-off': "⊘";
    readonly play: "▶";
    readonly pause: "⏸";
    readonly next: "⏭";
    readonly previous: "⏮";
    readonly volume: "🔊";
    readonly mute: "🔇";
    readonly music: "♪";
    readonly mic: "🎙";
};
/**
 * Every name in the set. Exported so `Icon`'s `name` is autocompletable and a
 * typo is a compile error — `<Icon name="hoome" />` should never reach a
 * screen. For a one-off glyph the kit has no name for, use `glyph`.
 */
export type IconName = keyof typeof ICON_GLYPHS;
/** Runtime membership test — narrows an arbitrary string to an `IconName`. */
export declare function isIconName(value: string): value is IconName;
/**
 * Resolve a `name` to its glyph, falling back to the string itself.
 *
 * The fallback is load-bearing: before the named set existed, `name` was an
 * alias of `glyph` and callers passed raw emoji through it. Those callers keep
 * working — an unrecognised `name` renders exactly as it always did — so
 * adopting the set is a choice, not a migration.
 */
export declare function resolveIconGlyph(name: string): string;
//# sourceMappingURL=icon-names.d.ts.map
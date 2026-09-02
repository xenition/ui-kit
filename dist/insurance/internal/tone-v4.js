"use strict";
/**
 * The `insurance` module's own V4 vocabulary (web) — the twin of
 * `native/insurance/internal/tone-v4.ts`.
 *
 * It replaces `internal/tint.ts` without touching it, because the base, V2 and
 * V3 lines still read that file. Two things in it were wrong, and `ClaimRow` —
 * its only consumer — inherited both:
 *
 * 1. **It inks with fill slots.** `success: 'bg-success/10 text-success'` draws
 *    the glyph in `--xen-success`, the token the compiler guarantees only
 *    `on-success` against; `muted` is a decorative ramp step with no contrast
 *    promise at all. Every status disc in the module was drawn with one of
 *    them. {@link toneInkClass} resolves the same tone to its contrast-corrected
 *    `*-text` slot.
 * 2. **`neutral` and `muted` are `bg-neutral-100`.** The web neutral ramp
 *    mirrors under `[data-theme="dark"]`, so a neutral status disc was a pale
 *    plate punched into a dark page. {@link toneGroundStyle} mixes the tone 10%
 *    into the card instead — the same ground the native twin mixes, so a
 *    denied claim is one colour on two platforms.
 *
 * It also holds the four tables where this module spent a **status** colour on
 * **identity** — a coverage's inclusion, a document's kind, a risk tier and a
 * beneficiary's designation are none of them verdicts — plus the small
 * formatters the components share.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEGATIVE_AMOUNT_LABEL = exports.BENEFICIARY_KIND_LABEL = exports.DOCUMENT_KIND_META_V4 = exports.RENEWAL_URGENCY_META_V4 = exports.RISK_TIER_META_V4 = exports.COVERAGE_MARK_V4 = exports.POLICY_STATUS_META_V4 = exports.TABULAR_CLASS = exports.MIN_TAP_SQUARE_CLASS = exports.FOCUS_RING_CLASS = exports.MIN_TAP_CLASS = exports.TONE_ON = exports.TONE_INK = exports.TONE_BG = exports.toneGround = exports.SKELETON_CLASS = exports.metaLine = exports.clampPercent = void 0;
exports.toneInkClass = toneInkClass;
exports.toneFillClass = toneFillClass;
exports.toneOnClass = toneOnClass;
exports.toneGroundStyle = toneGroundStyle;
exports.spokenLine = spokenLine;
exports.cardStateVars = cardStateVars;
exports.surfaceStateVars = surfaceStateVars;
exports.percentText = percentText;
exports.moneyParts = moneyParts;
exports.formatBytes = formatBytes;
const chrome_v4_1 = require("../../primitives/internal/chrome-v4");
Object.defineProperty(exports, "MIN_TAP_CLASS", { enumerable: true, get: function () { return chrome_v4_1.MIN_TAP_CLASS; } });
const v4_state_1 = require("../../primitives/internal/v4-state");
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "clampPercent", { enumerable: true, get: function () { return tone_v4_1.clampPercent; } });
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "toneGround", { enumerable: true, get: function () { return tone_v4_1.toneGround; } });
Object.defineProperty(exports, "TONE_BG", { enumerable: true, get: function () { return tone_v4_1.TONE_BG; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_ON", { enumerable: true, get: function () { return tone_v4_1.TONE_ON; } });
/** A tone as the contrast-corrected **ink** class. Never a fill. */
function toneInkClass(tone) {
    return tone_v4_1.TONE_INK[tone];
}
/** A tone as the **fill** class — a chip, a disc, a rail. Never text. */
function toneFillClass(tone) {
    return tone_v4_1.TONE_BG[tone];
}
/** The ink guaranteed to read **on** {@link toneFillClass}'s ground. */
function toneOnClass(tone) {
    return tone_v4_1.TONE_ON[tone];
}
/**
 * A tinted status ground as an inline style.
 *
 * `color-mix()` over two custom properties cannot be said as a class bound to
 * a token, and being inline it follows `[data-theme]` with no dark rule of its
 * own — which is exactly what `bg-neutral-100` could not do.
 */
function toneGroundStyle(tone) {
    return { background: (0, tone_v4_1.toneGround)(tone) };
}
/**
 * The one accessible name an interactive insurance row or card carries.
 *
 * Commas, not `metaLine`'s middle dot: a screen reader either says "middle
 * dot" out loud or swallows the pause, and every row in this module is a
 * decision about money — "Claim CLM-20481, Windshield replacement, Approved,
 * $840.00, 12 Aug" has to arrive as one sentence.
 */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
/** The focus ring the whole module wears — `ring-primary-300` was a ramp step. */
exports.FOCUS_RING_CLASS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
/** A glyph-only control has to be 44 **wide** as well as 44 tall. */
exports.MIN_TAP_SQUARE_CLASS = `${chrome_v4_1.MIN_TAP_CLASS} min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]`;
/** Money, percentages and any figure that stacks in a column. */
exports.TABULAR_CLASS = 'tabular-nums';
/** The state-layer pair for something drawn on a card. */
function cardStateVars(ground = 'var(--xen-card)') {
    return (0, v4_state_1.stateGroundVars)(ground, 'var(--xen-on-card)');
}
/** The state-layer pair for something drawn straight on the page. */
function surfaceStateVars() {
    return (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)');
}
/**
 * Policy lifecycle, as the same descriptor shape claims already use.
 *
 * `PolicyCard` kept this table private, so nothing else in the module could
 * label a policy state and the two new components would have had to invent
 * their own words. The tones are unchanged: a lapsed policy genuinely is an
 * adverse state, and `danger` is what that means.
 */
exports.POLICY_STATUS_META_V4 = {
    active: { label: 'Active', glyph: '✓', tone: 'success', step: 0 },
    pending: { label: 'Pending', glyph: '⋯', tone: 'warn', step: 0 },
    lapsed: { label: 'Lapsed', glyph: '!', tone: 'danger', step: 0 },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'danger', step: 0 },
};
/**
 * Whether a coverage is included, as a **glyph**, not a verdict.
 *
 * `included → success` / `excluded → muted` said that a policy covering water
 * damage is good news and that one excluding it is a failure. Inclusion is a
 * property of the contract; the reader is reading a list of them and half will
 * always be excluded. A page of green ticks beside red-adjacent greys teaches
 * the eye to stop reading either. The glyph — and, now, a word — is what
 * actually tells them apart.
 */
exports.COVERAGE_MARK_V4 = {
    included: { label: 'Included', glyph: '✓', tone: 'neutral', step: 0 },
    excluded: { label: 'Not covered', glyph: '✕', tone: 'neutral', step: 0 },
};
/**
 * Risk tier as identity, not verdict.
 *
 * `low → success` / `high → danger` is the module's most confident misuse of a
 * status colour: the tier is an underwriting *classification*, the same kind of
 * thing as a credit band, and colouring it green told the applicant they had
 * passed something. Worse, an explicit `tier` overrode the score outright, so
 * `score={95} tier="low"` drew a green "Low risk" pill beside 95 / 100 and the
 * colour was the loudest thing on the screen. The ordering now lives where it
 * is checkable — the numeral, the scale it sits on and the meter — and the
 * glyph carries the tier.
 */
exports.RISK_TIER_META_V4 = {
    low: { label: 'Low risk', glyph: '▁', tone: 'neutral', step: 0 },
    moderate: { label: 'Moderate risk', glyph: '▄', tone: 'neutral', step: 1 },
    high: { label: 'High risk', glyph: '█', tone: 'neutral', step: 2 },
};
/** Renewal urgency genuinely is a status — an overdue policy is not covered. */
exports.RENEWAL_URGENCY_META_V4 = {
    upcoming: { label: 'Renewal coming up', glyph: '🗓️', tone: 'primary', step: 0 },
    due: { label: 'Renewal due', glyph: '⏰', tone: 'warn', step: 1 },
    overdue: { label: 'Renewal overdue', glyph: '⚠️', tone: 'danger', step: 2 },
};
/**
 * Document kind — identity, and it needs a **word**, not just a glyph.
 *
 * The base built its meta line from `kind.replace('-', ' ')`, so the row read
 * "id card · 1.2 MB" in lower case whatever the locale, and the emoji was the
 * only other thing distinguishing a declaration page from an invoice.
 */
exports.DOCUMENT_KIND_META_V4 = {
    policy: { label: 'Policy', glyph: '📄' },
    declaration: { label: 'Declarations', glyph: '📋' },
    'id-card': { label: 'ID card', glyph: '🪪' },
    invoice: { label: 'Invoice', glyph: '🧾' },
    letter: { label: 'Letter', glyph: '✉️' },
};
/** Primary vs contingent — a designation, so `neutral` both ways. */
exports.BENEFICIARY_KIND_LABEL = {
    primary: 'Primary',
    contingent: 'Contingent',
};
/**
 * A percentage as a whole number and its spoken form.
 *
 * `formatPct` rounds for display and the components then announced the
 * unrounded float separately; one place, one number.
 */
function percentText(value) {
    return `${Math.round(Number.isFinite(value) ? value : 0)}%`;
}
function moneyParts(cents, currency, format) {
    if (cents == null || !Number.isFinite(cents))
        return undefined;
    const value = Math.trunc(cents);
    return { text: format(value, currency), negative: value < 0 };
}
/** The word appended to a figure that cannot be an amount of money. */
exports.NEGATIVE_AMOUNT_LABEL = 'Amount unavailable';
/**
 * Bytes as a human-readable size.
 *
 * The default behind `formatSize`. Base-1000 units, because that is what a
 * carrier's document portal quotes and what the caller was hand-formatting
 * into the `size` string before.
 */
function formatBytes(bytes) {
    const value = Number.isFinite(bytes) ? Math.max(0, bytes) : 0;
    const units = ['B', 'kB', 'MB', 'GB'];
    let scaled = value;
    let unit = 0;
    while (scaled >= 1000 && unit < units.length - 1) {
        scaled /= 1000;
        unit += 1;
    }
    return `${unit === 0 ? Math.round(scaled) : scaled.toFixed(1)} ${units[unit]}`;
}
//# sourceMappingURL=tone-v4.js.map
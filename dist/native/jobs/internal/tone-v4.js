"use strict";
/**
 * The `jobs` module's native-only V4 vocabulary: the pieces that need a
 * resolved native theme, plus the wording that turns
 * {@link import('../../../jobs/hiring-v4') hiring-v4}'s arithmetic into the
 * strings a component draws and announces.
 *
 * The maths itself is **not** here. `salaryParts`, `stageParts`,
 * `relativeParts` and `isAdverse` live in `src/jobs/hiring-v4.ts`, which both
 * twins import, precisely so the two halves cannot disagree about what a
 * salary band or a pipeline position *is*. What is here is the half that
 * cannot be shared: a `ViewStyle` needs `useXenitionTheme()`, and React Native
 * has no CSS variable to read a token off.
 *
 * ## Why the wording is here too
 *
 * Twelve components drew six English strings between them — `just now`,
 * `2d ago`, `From $90k/yr`, `51–200 employees` — each spelled out at the call
 * site with no override, which is what made the module unlocalisable. Every
 * one of those is now a default *inside a helper* that takes the caller's
 * formatter first, so a component's job is to pass the prop through rather
 * than to re-derive the sentence.
 *
 * Nothing in this file is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toneInk = exports.toneFill = exports.skeletonFill = exports.onPair = exports.metaLine = void 0;
exports.spokenName = spokenName;
exports.relativeLabel = relativeLabel;
exports.salaryText = salaryText;
exports.headcountLabel = headcountLabel;
exports.cardSurfaceStyle = cardSurfaceStyle;
exports.skeletonBarStyle = skeletonBarStyle;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
const hiring_v4_1 = require("../../../jobs/hiring-v4");
const format_1 = require("../format");
/**
 * Join the fragments of a **spoken** name.
 *
 * Commas, not {@link metaLine}'s middle dot: a screen reader either says
 * "middle dot" out loud or swallows the pause entirely, and this module's
 * whole finding is that its names were never heard in the first place. Use
 * {@link metaLine} for a *visible* meta line and this for anything that ends
 * up in an `accessibilityLabel`.
 */
function spokenName(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
/**
 * The default wording for each elapsed unit — the base's own strings, kept so
 * a caller who passes no `formatRelative` sees exactly what shipped.
 */
const RELATIVE_SUFFIX = {
    now: 'just now',
    minute: 'm ago',
    hour: 'h ago',
    day: 'd ago',
    month: 'mo ago',
    year: 'y ago',
};
/**
 * How long ago something happened, as a drawable string.
 *
 * `''` when the instant is missing or unparseable — the caller draws nothing
 * rather than a blank line or the literal `Invalid Date` the base's
 * `Intl.DateTimeFormat` path produced. The count comes from `relativeParts`,
 * which **floors**: the base rounded, so 25 days ago read "1mo ago" and 90
 * minutes read "2h ago", both claiming time that had not passed.
 */
function relativeLabel(iso, format, now) {
    if (!iso)
        return '';
    if (format)
        return format(iso);
    const { value, unit, valid } = (0, hiring_v4_1.relativeParts)(iso, now);
    if (!valid)
        return '';
    return unit === 'now' ? RELATIVE_SUFFIX.now : `${value}${RELATIVE_SUFFIX[unit]}`;
}
/** The default cadence suffix per period — the base's `format.ts` wording. */
const PERIOD_SUFFIX = {
    hour: '/hr',
    day: '/day',
    month: '/mo',
    year: '/yr',
};
/** Read a salary band into its drawable string. */
function salaryText(salary, options = {}) {
    if (!salary)
        return { text: null, inverted: false, broken: false };
    const supplied = salary.min !== undefined || salary.max !== undefined;
    const { min, max, valid, inverted } = (0, hiring_v4_1.salaryParts)(salary.min, salary.max);
    if (!valid)
        return { text: null, inverted: false, broken: supplied };
    const money = options.formatMoney ?? format_1.formatCompactMoney;
    const currency = salary.currency ?? 'USD';
    const period = salary.period ?? 'year';
    const overrides = options.periodLabels ?? {};
    const suffix = period === 'year'
        ? (overrides.year ?? PERIOD_SUFFIX.year)
        : period === 'hour'
            ? (overrides.hour ?? PERIOD_SUFFIX.hour)
            : period === 'month'
                ? (overrides.month ?? PERIOD_SUFFIX.month)
                : PERIOD_SUFFIX.day;
    let text;
    if (min !== undefined && max !== undefined) {
        text = `${money(min, currency)} – ${money(max, currency)}${suffix}`;
    }
    else if (min !== undefined) {
        text = `From ${money(min, currency)}${suffix}`;
    }
    else {
        text = `Up to ${money(max, currency)}${suffix}`;
    }
    return { text, inverted, broken: false };
}
/**
 * A free-form headcount as a chip label.
 *
 * `Company.size` is a **string** — `'51–200'` is the documented example — so a
 * `formatEmployees(n: number)` prop can only reach it when the app happens to
 * have stored a plain number. It does then, and a range keeps the base's own
 * wording rather than being dropped or mangled into a number it is not.
 * `null` when there is nothing to say.
 */
function headcountLabel(size, format) {
    const trimmed = size?.trim();
    if (!trimmed)
        return null;
    const count = Number(trimmed);
    if (Number.isFinite(count))
        return (format ?? ((n) => `${n} employees`))(count);
    return `${trimmed} employees`;
}
/**
 * The raised card every `jobs` card is drawn on.
 *
 * `card`, not `surface`: the slot exists so a raised thing reads as raised in
 * dark mode too, where the base's `surface` card was the same colour as the
 * page behind it. `border` is a hairline here and nowhere else in the module —
 * it was being used as a **fill** for skeleton blocks, the résumé file tile and
 * the default `SkillTag` ground, which is what made every loading state the
 * colour of a divider.
 */
function cardSurfaceStyle(theme) {
    const { colors, tokens } = theme;
    return {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
    };
}
/**
 * One placeholder block of a loading skeleton.
 *
 * The fill is {@link skeletonFill} — an **opaque** state mix against the card's
 * own ground. The module drew these in `colors.border`, so a loading job card
 * was a stack of divider-coloured bars that read as a broken table rather than
 * as content arriving.
 */
function skeletonBarStyle(theme, options) {
    return {
        width: options.width,
        height: options.height,
        borderRadius: options.round === true ? theme.tokens.radius.full : theme.tokens.radius.sm,
        backgroundColor: (0, tone_v4_1.skeletonFill)(theme),
    };
}
//# sourceMappingURL=tone-v4.js.map
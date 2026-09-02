"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceReviewV4 = PerformanceReviewV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const CardV4_1 = require("../primitives/CardV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const workforce_v4_1 = require("../../hr/workforce-v4");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 performance review** — same props as {@link PerformanceReview} plus
 * `formatRating`, `goalsLabel` and `formatDue`.
 *
 * ## Six changes
 *
 * 1. **Both meters are meters.** The rating was a `View` with
 *    `accessibilityRole="text"` — the web twin spelled the same thing as an
 *    `aria-label` on a bare `<span>`, which is role `generic` and cannot be
 *    named at all, so the two twins announced different things and neither was
 *    a `progressbar`. The goal meter *was* one, and it sat inside the card's
 *    `Pressable`, which flattens its subtree: its value was dropped before a
 *    reader ever saw it. Both are `progressbar`s now, and both sit **beside**
 *    the card's activation rather than under it.
 * 2. **Four and a half stars is not five.** The star row drew
 *    `Math.round(rated)` while the text beside it printed `rated` raw, so
 *    `rating={4.5}` filled **five** stars — a perfect score — next to the words
 *    "4.5/5". `ratingParts()` floors the filled count, so what is drawn and what
 *    is printed cannot disagree; the remainder is carried by the numeral.
 * 3. **`ratingMax={NaN}` no longer prints "NaN/NaN".** A badly parsed API field
 *    walked through `Math.max(1, Math.floor(NaN))` unchanged and rendered as
 *    visible text *and* as the accessible name.
 * 4. **The stars are inked with ink.** `colors.accent` is a **fill** slot used
 *    as a text colour; `accentText` is the contrast-corrected form.
 * 5. **No literals.** `letterSpacing: 2`, `height: 6`, `gap: 2` and
 *    `withAlpha(colors.onSurface, 0.1)` become the spacing scale and
 *    `ProgressV4`, whose track is composited from the tone rather than washed
 *    over whatever is behind it.
 * 6. **The card announces the whole review** — cycle, reviewer, rating, goal
 *    completion, status and due date — where the base said "Review H1 2026".
 *
 * The reviewer's avatar is `xs` on both twins; the web base used `sm`, so the
 * same review card had a different visual weight per platform.
 *
 * **Renders nothing without a `cycle`.**
 */
function PerformanceReviewV4({ cycle, reviewer, reviewerAvatarUrl, rating, ratingMax = 5, status, goalCompletion, goalCount, dueDate, variant = 'default', formatRating, goalsLabel = 'Goals', formatDue, onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!cycle)
        return null;
    const compact = variant === 'compact';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const hasRating = rating != null && Number.isFinite(rating);
    const parts = (0, workforce_v4_1.ratingParts)(rating ?? 0, ratingMax);
    const ratingText = (formatRating ?? ((p) => `${p.value}/${p.max}`))(parts);
    /*
      Floored, never rounded: a drawn mark claims a whole point. The remainder is
      carried by the numeral beside it rather than by a half-star glyph — the kit
      draws ratings with ★ and ☆ and nothing else, and a half-star codepoint has
      patchy font coverage on exactly the devices least able to render it.
    */
    const stars = Array.from({ length: parts.max }, (_, i) => (i < parts.filled ? '★' : '☆')).join('');
    const pct = (0, tone_v4_1.clampPercent)(goalCompletion);
    const showGoals = !compact && pct != null;
    const goalsCaption = goalCount != null ? `${goalsLabel} (${goalCount})` : goalsLabel;
    /*
      A status pill that sits BESIDE the activation is hidden from the reader when
      the row is interactive — the activation's own name already carries the
      status word, and hearing "Denied" twice in a row is worse than hearing it
      once. On a static row there is no activation to carry it, so the pill speaks
      for itself and the name leaves it out. Same rule on both twins.
    */
    const interactive = onPress != null;
    const statusMeta = status ? tone_v4_1.REVIEW_STATUS_V4[status] : undefined;
    const due = dueDate ? (formatDue ?? ((d) => `Due ${d}`))(dueDate) : null;
    const spoken = (0, tone_v4_1.spokenLine)([
        cycle,
        reviewer,
        hasRating ? ratingText : null,
        showGoals ? `${goalsCaption} ${pct}%` : null,
        interactive ? statusMeta?.label : null,
        due,
    ]);
    const identity = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minHeight: tap,
            justifyContent: 'center',
            gap: tokens.spacing.xs / 2,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: cycle }), reviewer ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "xs", name: reviewer, src: reviewerAvatarUrl }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: reviewer })] })) : null] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "outlined", padding: compact ? 'sm' : 'md', testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: 1, borderRadius: tokens.radius.md }, children: ({ pressed }) => identity(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1 }, children: identity(false) })), statusMeta ? ((0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm", decorative: interactive })) : null] }), hasRating ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: ratingText, accessibilityValue: { min: 0, max: parts.max, now: parts.value }, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", style: { color: colors.accentText, letterSpacing: tokens.spacing.xs / 2 }, children: stars }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", numeric: "tabular", children: ratingText })] })) : null, showGoals ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: goalsCaption, accessibilityValue: { min: 0, max: 100, now: pct }, style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: goalsCaption }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", numeric: "tabular", children: `${pct}%` })] }), (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, max: 100, size: "sm" })] })) : null, due ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: due })) : null] }));
}
//# sourceMappingURL=PerformanceReviewV4.js.map
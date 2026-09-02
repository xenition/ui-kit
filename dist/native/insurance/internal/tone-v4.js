"use strict";
/**
 * The `insurance` module's V4 vocabulary on native: which lifecycle states take
 * which ink, which enums are **identity** and therefore take no tone at all,
 * and the two opaque grounds a pill and a banner paint.
 *
 * The arithmetic — deductibles, risk scales, premium reconciliation, allocation
 * sets, adverse statuses — lives in `src/insurance/coverage-v4.ts` and is
 * imported by both twins, so the numbers cannot drift. The tone → ink table
 * lives in `primitives/internal/tone-v4`. What is here is the part specific to
 * policies and claims.
 *
 * ## Why three of these tables lost their `tone`
 *
 * `internal/status.ts` gives a policy *line* a `{ label, glyph }` and a claim
 * *status* a `{ label, glyph, tone }`, and every other enum in the module went
 * and invented a tone at its own call site. Three of those inventions are
 * category errors:
 *
 * - **`CoverageItem`** toned `included` `success` and `excluded` `muted`.
 *   Whether a policy covers water damage is a *property of the contract*, not a
 *   verdict on the reader. A benefits table where half the lines are green and
 *   half are greyed out has spent the alarm palette before anything is wrong.
 * - **`RiskScore`** toned the tier `success` / `warn` / `danger` and drew
 *   `🟢` / `🟡` / `🔴` beside it — so a screen reader said "green circle" and
 *   a colour-blind reader got a grey dot. A tier is an ordered *band*, and an
 *   ordered band is read from its position and its word.
 * - **`PremiumSummary`** painted every negative line `success`. A credited fee
 *   is not an achievement; it is a smaller number with a minus sign in front.
 *
 * So {@link POLICY_LINE_V4}, {@link DOCUMENT_KIND_V4}, {@link BENEFICIARY_KIND_V4},
 * {@link COVERAGE_MARK_V4} and {@link RISK_TIER_V4} are {@link IdentityMetaV4} —
 * `{ glyph, label }` and nothing else. There is no `tone` field to misuse,
 * which is the point: the fix is structural rather than a set of edits the next
 * table can undo. Identity is carried by the glyph and the word on a neutral
 * chip ({@link chipStyle}).
 *
 * {@link CLAIM_STATUS_V4}, {@link POLICY_STATUS_V4} and {@link RENEWAL_URGENCY_V4}
 * keep their tones, because a denied claim, a lapsed policy and an overdue
 * renewal are exactly what `danger` is for.
 *
 * Nothing in this file is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLAIM_STAGE_LABELS = exports.CLAIM_STAGES = exports.RISK_TIERS = exports.RISK_TIER_V4 = exports.COVERAGE_MARK_V4 = exports.BENEFICIARY_KIND_V4 = exports.DOCUMENT_KIND_V4 = exports.POLICY_LINE_V4 = exports.RENEWAL_URGENCY_V4 = exports.POLICY_STATUS_V4 = exports.CLAIM_STATUS_V4 = exports.BAND_TINT = exports.CHIP_TINT = exports.PILL_TINT = exports.DECORATIVE = exports.toneInk = exports.toneFill = exports.skeletonFill = exports.onPair = exports.metaLine = exports.clampPercent = void 0;
exports.spokenLine = spokenLine;
exports.pillGround = pillGround;
exports.pillStyle = pillStyle;
exports.chipGround = chipGround;
exports.chipStyle = chipStyle;
exports.bandGround = bandGround;
exports.bandStyle = bandStyle;
exports.tierFromRatio = tierFromRatio;
const v4_depth_1 = require("../../../primitives/internal/v4-depth");
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "clampPercent", { enumerable: true, get: function () { return tone_v4_1.clampPercent; } });
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
/**
 * Join the parts of a row into one spoken sentence.
 *
 * Commas rather than {@link metaLine}'s middle dot: a screen reader either says
 * "middle dot" out loud or swallows the pause entirely, and this string is read
 * aloud rather than drawn.
 *
 * This is the fix for the module's second finding. `ClaimRow`, `PolicyCard`,
 * `PolicyDocumentRow` and `BeneficiaryRow` each named their pressable row and
 * then rendered the settled amount, the coverage, the premium and the dates as
 * children of it — and a `Pressable` is `accessible` by default, so it flattens
 * its subtree into one leaf wearing that name. Every row announced a status and
 * **no money**. Whatever is drawn inside an activation has to be folded into
 * the activation's own name; this is what does the folding.
 */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
/**
 * Props that take a decorative mark out of the reader's path.
 *
 * Spread onto the status disc, the tier glyph, the stage rail and the factor
 * bullet. Native was announcing "green circle" and "bullet" out loud where the
 * web twin already had `aria-hidden` on the same marks, so the two platforms
 * did not read the same screen. Both flags are needed: iOS honours
 * `accessibilityElementsHidden`, Android honours `importantForAccessibility`.
 */
exports.DECORATIVE = {
    accessibilityElementsHidden: true,
    importantForAccessibility: 'no-hide-descendants',
};
/**
 * How far a soft status pill's ground travels from the card toward its tone.
 *
 * The base wrote `withAlpha(tint, 0.14)` at five call sites — a *translucent*
 * wash, so the same pill was a different colour on a card, on a tinted banner
 * and over the page, and its label carried a measured contrast against exactly
 * one of the three. Composited once here, against `card`, so it is opaque and
 * the label's contrast against it is a fixed quantity.
 */
exports.PILL_TINT = 0.14;
/** How far a neutral identity chip's ground travels from the card toward its ink. */
exports.CHIP_TINT = 0.06;
/** How far a tone-tinted **banner** ground travels from the card toward its tone. */
exports.BAND_TINT = 0.1;
/** The opaque ground a soft status pill paints, for a tone. */
function pillGround(theme, tone) {
    return (0, v4_depth_1.mixToken)(theme.colors.card, (0, tone_v4_1.toneFill)(theme, tone), exports.PILL_TINT);
}
/**
 * The box a soft status pill draws.
 *
 * Composed once so the six components that render one cannot each arrive at a
 * slightly different pill, and so the *only* difference between a status pill
 * and an identity chip is the thing that matters: the tint.
 */
function pillStyle(theme, tone) {
    const { spacing, radius } = theme.tokens;
    return {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: spacing.xs / 2,
        paddingVertical: spacing.xs / 2,
        paddingHorizontal: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: pillGround(theme, tone),
    };
}
/** The opaque ground a **neutral identity chip** paints. */
function chipGround(theme) {
    return (0, v4_depth_1.mixToken)(theme.colors.card, theme.colors.onCard, exports.CHIP_TINT);
}
/**
 * The box a neutral identity chip draws — what a policy line, a document kind,
 * a beneficiary designation, an inclusion mark and a risk band wear now that
 * none of them has a tone of its own.
 *
 * One ground for all five, so the eye learns that a tinted pill means a state
 * and a grey chip means a kind.
 */
function chipStyle(theme) {
    const { spacing, radius } = theme.tokens;
    return {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: spacing.xs / 2,
        paddingVertical: spacing.xs / 2,
        paddingHorizontal: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: chipGround(theme),
    };
}
/** The opaque ground a tone-tinted banner paints. */
function bandGround(theme, tone) {
    return (0, v4_depth_1.mixToken)(theme.colors.card, (0, tone_v4_1.toneFill)(theme, tone), exports.BAND_TINT);
}
/**
 * The box a banner draws — a tinted, **opaque** ground and a tone edge.
 *
 * `RenewalBanner` and `ClaimStatusTracker`'s denial notice both hand-mixed
 * `withAlpha(tint, 0.1)` and then drew `colors.muted` body copy on top of it.
 * Neither the ground nor the contrast survived being placed on anything other
 * than the page it was designed against.
 */
function bandStyle(theme, tone) {
    const { spacing, radius } = theme.tokens;
    return {
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: (0, tone_v4_1.toneFill)(theme, tone),
        backgroundColor: bandGround(theme, tone),
        padding: spacing.md,
        gap: spacing.sm,
    };
}
// ── states ──────────────────────────────────────────────────────────────
/** Claim lifecycle. */
exports.CLAIM_STATUS_V4 = {
    filed: { glyph: '✎', label: 'Filed', tone: 'neutral' },
    review: { glyph: '◔', label: 'In review', tone: 'primary' },
    approved: { glyph: '✓', label: 'Approved', tone: 'success' },
    denied: { glyph: '✕', label: 'Denied', tone: 'danger' },
    paid: { glyph: '●', label: 'Paid', tone: 'accent' },
};
/**
 * Policy lifecycle.
 *
 * `cancelled` moves off `neutral`. A cancelled policy is not a quiet fact about
 * the account — it is the reason the coverage figure underneath it is no longer
 * in force, and the base drew that figure at full strength with a grey pill
 * beside it.
 */
exports.POLICY_STATUS_V4 = {
    active: { glyph: '✓', label: 'Active', tone: 'success' },
    pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
    lapsed: { glyph: '⚠', label: 'Lapsed', tone: 'danger' },
    cancelled: { glyph: '⊘', label: 'Cancelled', tone: 'danger' },
};
/**
 * Renewal urgency.
 *
 * `upcoming` keeps `primary` — a renewal three weeks out is information, not a
 * caution, and toning it `warn` is how a product teaches people to ignore
 * amber.
 */
exports.RENEWAL_URGENCY_V4 = {
    upcoming: { glyph: '🗓', label: 'Upcoming', tone: 'primary', heading: 'Renewal coming up' },
    due: { glyph: '⏰', label: 'Due', tone: 'warn', heading: 'Renewal due' },
    overdue: { glyph: '⚠', label: 'Overdue', tone: 'danger', heading: 'Renewal overdue' },
};
// ── identity — glyph and word, no tone ──────────────────────────────────
/** Line of insurance. Identity, and already tone-free on the base. */
exports.POLICY_LINE_V4 = {
    auto: { glyph: '🚗', label: 'Auto' },
    home: { glyph: '🏠', label: 'Home' },
    life: { glyph: '🌳', label: 'Life' },
    health: { glyph: '⚕', label: 'Health' },
};
/**
 * Kind of document.
 *
 * The label matters as much as the glyph here: `PolicyDocumentRow` built its
 * meta line from `kind.replace('-', ' ')`, so a reader was shown the raw enum
 * — "id card", lower-cased, ungrammatical and untranslatable.
 */
exports.DOCUMENT_KIND_V4 = {
    policy: { glyph: '📄', label: 'Policy' },
    declaration: { glyph: '📋', label: 'Declarations' },
    'id-card': { glyph: '🪪', label: 'ID card' },
    invoice: { glyph: '🧾', label: 'Invoice' },
    letter: { glyph: '✉', label: 'Letter' },
};
/** Primary vs contingent designation. An order, not a verdict. */
exports.BENEFICIARY_KIND_V4 = {
    primary: { glyph: '①', label: 'Primary' },
    contingent: { glyph: '②', label: 'Contingent' },
};
/** Whether a coverage line is in the policy. A property of the contract. */
exports.COVERAGE_MARK_V4 = {
    included: { glyph: '✓', label: 'Included' },
    excluded: { glyph: '✕', label: 'Not covered' },
};
/**
 * Risk band.
 *
 * Ordered glyphs — a quarter, a half, a full disc — so the band survives
 * greyscale and CVD, and so a screen reader hears "Moderate risk" rather than
 * "yellow circle". The bands themselves are thirds of **the caller's** scale;
 * see `scoreParts` in `coverage-v4.ts`, which is what made a 300–850 model
 * renderable at all.
 */
exports.RISK_TIER_V4 = {
    low: { glyph: '◔', label: 'Low risk' },
    moderate: { glyph: '◑', label: 'Moderate risk' },
    high: { glyph: '●', label: 'High risk' },
};
/** The bands, in order, for deriving a tier from a position on a scale. */
exports.RISK_TIERS = ['low', 'moderate', 'high'];
/**
 * Read a tier off a 0–1 position within the caller's own scale.
 *
 * The base hard-coded `score <= 33 → low`, `<= 66 → moderate` against an
 * equally hard-coded 0–100. Thirds of whatever scale was supplied is the same
 * intent expressed once, and it is the only reason `min`/`max` mean anything.
 */
function tierFromRatio(ratio) {
    if (ratio <= 1 / 3)
        return 'low';
    if (ratio <= 2 / 3)
        return 'moderate';
    return 'high';
}
/** The stages, in order. */
exports.CLAIM_STAGES = ['filed', 'review', 'approved', 'paid'];
/** Today's stage copy, and the default for `stageLabels`. */
exports.CLAIM_STAGE_LABELS = {
    filed: 'Filed',
    review: 'In review',
    approved: 'Approved',
    paid: 'Paid',
};
//# sourceMappingURL=tone-v4.js.map
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
import type { ViewStyle } from 'react-native';
import type { XenitionNativeTheme } from '../../theme';
import { clampPercent, metaLine, onPair, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import type { ClaimStatus, PolicyVariant } from '../internal/status';
import type { BeneficiaryKind } from '../BeneficiaryRow';
import type { DocumentKind } from '../PolicyDocumentRow';
import type { PolicyStatus } from '../PolicyCard';
import type { RenewalUrgency } from '../RenewalBanner';
import type { RiskTier } from '../RiskScore';
export { clampPercent, metaLine, onPair, skeletonFill, toneFill, toneInk };
export type { ToneV4 };
/** A **state** — glyph, word, and the tone that state legitimately owns. */
export interface StatusMetaV4 {
    /** Non-colour glyph carrying the meaning. */
    glyph: string;
    /** The word half of the glyph+word contract. */
    label: string;
    /** The tone. Only ever a state; see the module doc. */
    tone: ToneV4;
}
/**
 * A **kind** — glyph and word, and deliberately no tone.
 *
 * A line of insurance, a document kind, a beneficiary designation, an inclusion
 * mark and a risk band are all identity. They are told apart by their glyph and
 * their word, never by a status colour.
 */
export interface IdentityMetaV4 {
    glyph: string;
    label: string;
}
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
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
/**
 * Props that take a decorative mark out of the reader's path.
 *
 * Spread onto the status disc, the tier glyph, the stage rail and the factor
 * bullet. Native was announcing "green circle" and "bullet" out loud where the
 * web twin already had `aria-hidden` on the same marks, so the two platforms
 * did not read the same screen. Both flags are needed: iOS honours
 * `accessibilityElementsHidden`, Android honours `importantForAccessibility`.
 */
export declare const DECORATIVE: {
    readonly accessibilityElementsHidden: true;
    readonly importantForAccessibility: "no-hide-descendants";
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
export declare const PILL_TINT = 0.14;
/** How far a neutral identity chip's ground travels from the card toward its ink. */
export declare const CHIP_TINT = 0.06;
/** How far a tone-tinted **banner** ground travels from the card toward its tone. */
export declare const BAND_TINT = 0.1;
/** The opaque ground a soft status pill paints, for a tone. */
export declare function pillGround(theme: XenitionNativeTheme, tone: ToneV4): string;
/**
 * The box a soft status pill draws.
 *
 * Composed once so the six components that render one cannot each arrive at a
 * slightly different pill, and so the *only* difference between a status pill
 * and an identity chip is the thing that matters: the tint.
 */
export declare function pillStyle(theme: XenitionNativeTheme, tone: ToneV4): ViewStyle;
/** The opaque ground a **neutral identity chip** paints. */
export declare function chipGround(theme: XenitionNativeTheme): string;
/**
 * The box a neutral identity chip draws — what a policy line, a document kind,
 * a beneficiary designation, an inclusion mark and a risk band wear now that
 * none of them has a tone of its own.
 *
 * One ground for all five, so the eye learns that a tinted pill means a state
 * and a grey chip means a kind.
 */
export declare function chipStyle(theme: XenitionNativeTheme): ViewStyle;
/** The opaque ground a tone-tinted banner paints. */
export declare function bandGround(theme: XenitionNativeTheme, tone: ToneV4): string;
/**
 * The box a banner draws — a tinted, **opaque** ground and a tone edge.
 *
 * `RenewalBanner` and `ClaimStatusTracker`'s denial notice both hand-mixed
 * `withAlpha(tint, 0.1)` and then drew `colors.muted` body copy on top of it.
 * Neither the ground nor the contrast survived being placed on anything other
 * than the page it was designed against.
 */
export declare function bandStyle(theme: XenitionNativeTheme, tone: ToneV4): ViewStyle;
/** Claim lifecycle. */
export declare const CLAIM_STATUS_V4: Record<ClaimStatus, StatusMetaV4>;
/**
 * Policy lifecycle.
 *
 * `cancelled` moves off `neutral`. A cancelled policy is not a quiet fact about
 * the account — it is the reason the coverage figure underneath it is no longer
 * in force, and the base drew that figure at full strength with a grey pill
 * beside it.
 */
export declare const POLICY_STATUS_V4: Record<PolicyStatus, StatusMetaV4>;
/** Renewal urgency, plus the heading each urgency draws. */
export interface RenewalMetaV4 extends StatusMetaV4 {
    /** The banner's own headline. */
    heading: string;
}
/**
 * Renewal urgency.
 *
 * `upcoming` keeps `primary` — a renewal three weeks out is information, not a
 * caution, and toning it `warn` is how a product teaches people to ignore
 * amber.
 */
export declare const RENEWAL_URGENCY_V4: Record<RenewalUrgency, RenewalMetaV4>;
/** Line of insurance. Identity, and already tone-free on the base. */
export declare const POLICY_LINE_V4: Record<PolicyVariant, IdentityMetaV4>;
/**
 * Kind of document.
 *
 * The label matters as much as the glyph here: `PolicyDocumentRow` built its
 * meta line from `kind.replace('-', ' ')`, so a reader was shown the raw enum
 * — "id card", lower-cased, ungrammatical and untranslatable.
 */
export declare const DOCUMENT_KIND_V4: Record<DocumentKind, IdentityMetaV4>;
/** Primary vs contingent designation. An order, not a verdict. */
export declare const BENEFICIARY_KIND_V4: Record<BeneficiaryKind, IdentityMetaV4>;
/** Whether a coverage line is in the policy. A property of the contract. */
export declare const COVERAGE_MARK_V4: Record<'included' | 'excluded', IdentityMetaV4>;
/**
 * Risk band.
 *
 * Ordered glyphs — a quarter, a half, a full disc — so the band survives
 * greyscale and CVD, and so a screen reader hears "Moderate risk" rather than
 * "yellow circle". The bands themselves are thirds of **the caller's** scale;
 * see `scoreParts` in `coverage-v4.ts`, which is what made a 300–850 model
 * renderable at all.
 */
export declare const RISK_TIER_V4: Record<RiskTier, IdentityMetaV4>;
/** The bands, in order, for deriving a tier from a position on a scale. */
export declare const RISK_TIERS: readonly RiskTier[];
/**
 * Read a tier off a 0–1 position within the caller's own scale.
 *
 * The base hard-coded `score <= 33 → low`, `<= 66 → moderate` against an
 * equally hard-coded 0–100. Thirds of whatever scale was supplied is the same
 * intent expressed once, and it is the only reason `min`/`max` mean anything.
 */
export declare function tierFromRatio(ratio: number): RiskTier;
/**
 * The happy-path stages of a claim, as a type of their own.
 *
 * `ClaimStatus` includes `denied`, which is not a stage — it is the path
 * ending. Splitting the four stages out is what lets `stageLabels` be a
 * `Partial<Record<ClaimStage, string>>` that cannot accidentally be handed a
 * label for a stage the tracker never draws.
 */
export type ClaimStage = 'filed' | 'review' | 'approved' | 'paid';
/** The stages, in order. */
export declare const CLAIM_STAGES: readonly ClaimStage[];
/** Today's stage copy, and the default for `stageLabels`. */
export declare const CLAIM_STAGE_LABELS: Record<ClaimStage, string>;
//# sourceMappingURL=tone-v4.d.ts.map
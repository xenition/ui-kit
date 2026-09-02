"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuranceIdCardV4 = InsuranceIdCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("./internal/tone-v4");
const DEFAULT_LABELS = {
    policyNumber: 'Policy number',
    insured: 'Insured',
    subject: 'Covered',
    effective: 'Effective',
    expires: 'Expires',
    issuerCode: 'NAIC',
};
/**
 * **V4 insurance ID card** — a new component. There is no base to extend, so
 * the props are plain `InsuranceIdCardV4Props`.
 *
 * ## Why it exists
 *
 * `PolicyDocumentRow` already ships an `'id-card'` document kind, with a glyph
 * and a row, pointing at a component the module never had. Proof of insurance
 * is the **most-opened screen in an auto app** — it is what a person holds up
 * at a roadside stop, hands to a body shop, or reads down a phone line to
 * another driver's adjuster — and until now the kit's answer was a PDF behind a
 * download button.
 *
 * ## What the screen owes, and how each is paid
 *
 * 1. **It is read aloud, out of order, under pressure.** Someone reading a
 *    policy number over the phone reads it in groups, and someone holding the
 *    phone up at a window needs the number legible at arm's length. The policy
 *    number is set at display size in tabular figures so the digits align and
 *    a `1` cannot be mistaken for a narrower glyph, and each field is its own
 *    accessible stop with its caption — `"Policy number, AUTO-4821-93"` — so a
 *    reader can go straight to the one fact being asked for instead of hearing
 *    the whole card from the top each time.
 * 2. **The card as a whole is one stop too.** The masthead carries the carrier,
 *    the line and the term, so a first swipe answers "whose policy, what kind,
 *    still valid?" before any field is reached.
 * 3. **Nothing is carried by colour.** There is no status here at all: an ID
 *    card states a term, and whether the term has expired is arithmetic on two
 *    dates the caller has already formatted. A green or red card would be this
 *    component asserting a verdict it cannot compute — the same defect
 *    `ClaimStatusTracker` shipped with an invented denial reason.
 * 4. **The line glyph is decorative.** The line's *word* is in the masthead;
 *    a `🚗` announced as "automobile" beside the word "Auto" is one fact twice.
 *
 * **Renders nothing without a `carrier` and a `policyNumber`** (§4.5) — a proof
 * of insurance missing either is not a card with a gap in it, it is not proof.
 */
function InsuranceIdCardV4({ carrier, policyNumber, insured, subject, variant = 'auto', effectiveDate, expiryDate, issuerCode, labels, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!carrier || !policyNumber)
        return null;
    const copy = { ...DEFAULT_LABELS, ...labels };
    const line = tone_v4_1.POLICY_LINE_V4[variant] ?? tone_v4_1.POLICY_LINE_V4.auto;
    const disc = (0, chrome_v4_1.minTap)(tokens.spacing);
    const term = effectiveDate && expiryDate
        ? `${effectiveDate} – ${expiryDate}`
        : (effectiveDate ?? expiryDate ?? null);
    /** One labelled fact, as its own accessible stop — see change 1. */
    const field = (caption, value) => value == null || value === '' ? null : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([caption, value]), style: { flexGrow: 1, flexBasis: '45%', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: caption }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numeric: "tabular", children: value })] }, caption));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "elevated", testID: testID, style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([carrier, line.label, term]), style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: {
                            width: disc,
                            height: disc,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, tone_v4_1.chipGround)(theme),
                        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", tone: "onCard", children: line.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "lg", weight: "bold", tone: "onCard", numberOfLines: 1, children: carrier }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: line.label })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([copy.policyNumber, policyNumber]), style: {
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    gap: tokens.spacing.xs / 2,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: copy.policyNumber }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", tone: "onCard", numeric: "tabular", children: policyNumber })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: tokens.spacing.md,
                }, children: [field(copy.insured, insured), field(copy.subject, subject), field(copy.effective, effectiveDate), field(copy.expires, expiryDate), field(copy.issuerCode, issuerCode)] })] }));
}
//# sourceMappingURL=InsuranceIdCardV4.js.map
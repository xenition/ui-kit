"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermitStatusV4 = PermitStatusV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const StepsV4_1 = require("../primitives/StepsV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const civic_v4_1 = require("./internal/civic-v4");
const status_1 = require("./internal/status");
/**
 * The sentence the base hard-coded under "Permit denied", kept as the default
 * so a caller with no `reason` sees exactly what it saw before.
 */
const DENIAL_FALLBACK = 'Review the notice and re-apply or appeal.';
/**
 * **V4 permit tracker** — same props as {@link PermitStatus} plus `reason`,
 * `statusLabel`, `formatStep` and `referenceLabel`.
 *
 * ## Five changes
 *
 * 1. **The status always renders.** `<PermitStatus status="review" title="…" />`
 *    produced a card in which the words "Under review" appeared **nowhere**:
 *    the only human-readable status line was gated on `updatedDate`, an
 *    optional prop. `statusSentence()` renders it whether or not a date was
 *    passed, and carries the position with it — "Under review, step 2 of 4".
 * 2. **The tracker says which step is yours.** The base `Steps` conveyed
 *    position entirely by colour: the active marker and a pending one both
 *    render a bare digit and differ only by border and text colour, with no
 *    `accessibilityState` anywhere. `StepsV4` already announces "Step 2 of 4,
 *    current" and draws the completed run as a filled rail, so a red-green
 *    deficient reader and a blind one both get the answer.
 * 3. **A denial says why, and announces.** The banner carried a fixed
 *    consolation sentence with no way to say what the notice said, under
 *    `accessibilityRole="alert"` — which on React Native sets no announcement
 *    behaviour at all without `accessibilityLiveRegion`. It is one assertive
 *    live region now, naming the status and the `reason` together.
 * 4. **The permit number is labelled.** A reader heard "BLD-2026-0417" with no
 *    idea what it identified; it is `referenceLabel` + the number now, and the
 *    denial headline takes the contrast-corrected ink rather than the `danger`
 *    fill drawn as text on a tint of itself.
 * 5. **The dead branch is gone.** `denied ? 1 : …` picked a step for a status
 *    that never reaches `Steps`, and the loading block is the shared opaque
 *    skeleton rather than a translucent wash of a ramp step.
 */
function PermitStatusV4({ status, permitNumber, title, updatedDate, loading = false, reason, statusLabel, formatStep, referenceLabel = 'Permit', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const sd = (0, status_1.permitStatus)(status);
    const statusWord = statusLabel ?? sd.label;
    const adverse = (0, civic_v4_1.isAdverse)(status);
    const idLine = (0, civic_v4_1.labelledId)(referenceLabel, permitNumber);
    const steps = status_1.PERMIT_STAGES.map((stage) => ({ title: status_1.PERMIT_STATUS[stage].label }));
    const current = Math.min(sd.step, steps.length - 1);
    // Off the happy path there is no step to be at, so the sentence is the word
    // alone rather than "Denied, step 3 of 4" — which would be a position the
    // tracker never draws.
    const sentence = adverse
        ? statusWord
        : (0, civic_v4_1.statusSentence)(statusWord, sd.step, steps.length, formatStep);
    const detail = reason ?? DENIAL_FALLBACK;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: civic_v4_1.CARD_V4, style: style, children: [title || idLine ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginBottom: tokens.spacing.md, gap: tokens.spacing.xs / 2 }, children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, children: title })) : null, idLine ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: idLine })) : null] })) : null, loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: "Loading permit status", style: {
                    height: (0, chrome_v4_1.minTap)(tokens.spacing),
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, civic_v4_1.placeholderGround)(theme),
                } })) : adverse ? ((0, jsx_runtime_1.jsxs)(react_native_1.View
            // `alert` alone does nothing on React Native. The live region is what
            // makes a refusal reach a reader who is not looking at the card.
            , { 
                // `alert` alone does nothing on React Native. The live region is what
                // makes a refusal reach a reader who is not looking at the card.
                accessible: true, accessibilityRole: "alert", accessibilityLiveRegion: "assertive", accessibilityLabel: (0, civic_v4_1.spokenLine)([idLine, statusWord, detail]), style: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: tokens.spacing.sm,
                    padding: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: (0, civic_v4_1.toneFill)(theme, 'danger'),
                    backgroundColor: (0, civic_v4_1.tintGround)(theme, 'danger'),
                }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: sd.glyph, style: { color: (0, civic_v4_1.tintInk)(theme, 'danger') } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", style: { color: (0, civic_v4_1.tintInk)(theme, 'danger') }, children: statusWord }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onSurface", children: detail })] })] })) : ((0, jsx_runtime_1.jsx)(StepsV4_1.StepsV4, { steps: steps, current: current })), !loading ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: { marginTop: tokens.spacing.md }, children: (0, tone_v4_1.metaLine)([`${sd.glyph} ${sentence}`, updatedDate ? `updated ${updatedDate}` : null]) })) : null] }));
}
//# sourceMappingURL=PermitStatusV4.js.map
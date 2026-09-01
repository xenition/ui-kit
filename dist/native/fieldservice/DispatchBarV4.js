"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchBarV4 = DispatchBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const job_v4_1 = require("./internal/job-v4");
/**
 * Stage → word, glyph, chip tone and the action that leaves it.
 *
 * The stages in the middle of the workflow take no status colour: a dispatch
 * stage is where a job sits in a queue, not how it turned out, and the base
 * painted "En route" amber and "On site" green — spending the two colours that
 * have to mean "look at this" and "this went well" on a position in a list.
 * Only `complete`, which really is an outcome, keeps `success`. `buttonTone` is
 * a separate decision: it colours the *action*, not the state.
 */
const STAGE_META = {
    unassigned: { label: 'Unassigned', glyph: '○', tone: 'neutral', advance: 'Accept', next: 'accepted', buttonTone: 'primary' },
    accepted: { label: 'Accepted', glyph: '✓', tone: 'primary', advance: 'Start driving', next: 'en-route', buttonTone: 'primary' },
    'en-route': { label: 'En route', glyph: '→', tone: 'primary', advance: 'Arrive', next: 'on-site', buttonTone: 'primary' },
    'on-site': { label: 'On site', glyph: '▶', tone: 'primary', advance: 'Complete', next: 'complete', buttonTone: 'success' },
    complete: { label: 'Complete', glyph: '✓', tone: 'success' },
};
/**
 * **V4 dispatch bar** — same props as {@link DispatchBar} plus
 * `confirmAdvanceLabel` and `stageLabels`.
 *
 * ## Five changes
 *
 * 1. **No enabled button that does nothing.** `canAdvance` never consulted
 *    `onAdvance`, so `<DispatchBar stage="on-site" />` shipped a live
 *    "Complete" that was a no-op — the loudest control on the bar, wired to
 *    nothing. The action now appears only when there is a handler to run.
 * 2. **Completing a visit takes a confirming press.** It is irreversible and
 *    the bar offers no action afterwards, so the first press arms the button
 *    and relabels it through `confirmAdvanceLabel`; the second one advances.
 * 3. **The bar clears the home indicator.** It is pinned to the bottom of the
 *    screen and read no safe-area inset at all, so on a notched phone the
 *    primary action sat under the indicator. It pays `insets.bottom` now, the
 *    way every other edge-anchored V4 component does. Needs a
 *    `SafeAreaProvider` above it, which Expo mounts by default.
 * 4. **The actions clear 44** — `size="sm"` is ~34 today — and the disc is
 *    decorative, so a reader no longer stops on it and then hears the same
 *    stage again from the line below.
 * 5. **The stage is not printed twice.** With no `jobLabel` the base put the
 *    stage on the title line *and* on the meta line under it.
 */
function DispatchBarV4({ stage, eta, jobLabel, onAdvance, onNavigate, loading = false, confirmAdvanceLabel = (next) => `Confirm ${next}`, stageLabels, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const [armed, setArmed] = React.useState(false);
    const meta = STAGE_META[stage] ?? STAGE_META.unassigned;
    const stageWord = stageLabels?.[stage] ?? meta.label;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    // A handler is part of the affordance, not a detail behind it.
    const advanceTo = meta.next;
    const canAdvance = meta.advance != null && advanceTo != null && Boolean(onAdvance);
    // Only the last step is guarded: the visit is closed and the bar has nothing
    // left to offer, so there is no way back from a mis-tap.
    const guarded = advanceTo === 'complete';
    const advanceWord = meta.advance != null && armed ? confirmAdvanceLabel(meta.advance) : meta.advance;
    // With no job label the stage IS the title, so repeating it underneath spends
    // a line on a fact the user has already read.
    const caption = jobLabel != null ? (0, tone_v4_1.metaLine)([stageWord, eta]) : (eta ?? '');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                backgroundColor: colors.surface,
                paddingHorizontal: tokens.spacing.md,
                paddingTop: tokens.spacing.md,
                paddingBottom: tokens.spacing.md + insets.bottom,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: tokens.spacing.xl + tokens.spacing.sm,
                    height: tokens.spacing.xl + tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, job_v4_1.discGround)(theme, meta.tone),
                }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: meta.glyph, style: { color: (0, job_v4_1.discInk)(theme, meta.tone) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, job_v4_1.spokenLine)([jobLabel, stageWord, eta]), style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, children: jobLabel ?? stageWord }), caption !== '' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null] }), onNavigate ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", size: "md", onPress: onNavigate, style: { minHeight: tap }, children: "Navigate" })) : null, canAdvance ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", tone: meta.buttonTone, loading: loading, accessibilityLabel: advanceWord, onPress: () => {
                    if (guarded && !armed) {
                        setArmed(true);
                        return;
                    }
                    setArmed(false);
                    onAdvance?.(advanceTo);
                }, style: { minHeight: tap }, children: advanceWord })) : null] }));
}
//# sourceMappingURL=DispatchBarV4.js.map
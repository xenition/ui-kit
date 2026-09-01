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
exports.CivicAlertV4 = CivicAlertV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const civic_v4_1 = require("./internal/civic-v4");
/** Severity → the tone it inks and tints with, and the word it always says. */
const SEVERITY_V4 = {
    info: { label: 'Information', glyph: 'ℹ️', tone: 'primary' },
    advisory: { label: 'Advisory', glyph: '📢', tone: 'accent' },
    warning: { label: 'Warning', glyph: '⚠️', tone: 'warn' },
    emergency: { label: 'Emergency', glyph: '🚨', tone: 'danger' },
};
/**
 * **V4 civic alert** — same props as {@link CivicAlert} plus `severityLabels`
 * and `confirmDismissLabel`.
 *
 * ## Four changes
 *
 * 1. **It announces.** The base's docstring said "uses the RN `alert`
 *    accessibility role so screen readers announce it". That role sets no
 *    announcement behaviour on React Native at all without
 *    `accessibilityLiveRegion`, so the module's emergency banner was silent.
 *    An emergency or a warning is `assertive`; information and an advisory are
 *    `polite`, because announcing everything teaches a user to ignore
 *    everything.
 * 2. **The message joins the name.** The container's name was
 *    `` `${severity}: ${title}` `` — the field carrying "evacuate via Route 9"
 *    sat outside it, so the reader got the headline and none of the
 *    instruction. Severity, title, message, source and time are one sentence.
 * 3. **Dismiss takes a confirming press.** An emergency alert was dismissed
 *    irreversibly on one tap of a bare glyph, and the component offers no way
 *    to bring it back. The first press arms the control and shows
 *    `confirmDismissLabel`; the second dismisses.
 * 4. **Dismiss is a real target with a real name**, 44 with a state layer,
 *    where it was a hit-slopped glyph drawn at `opacity: 0.5` — which is inside
 *    M3's disabled band, so a pressed dismiss read as an unavailable one. The
 *    severity word takes the contrast-corrected ink rather than the fill slot
 *    it is tinted from.
 */
function CivicAlertV4({ severity, title, message, source, time, actionLabel = 'View details', onAction, onDismiss, severityLabels, confirmDismissLabel = 'Confirm dismiss', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [armed, setArmed] = React.useState(false);
    const sd = SEVERITY_V4[severity] ?? SEVERITY_V4.info;
    const word = severityLabels?.[severity] ?? sd.label;
    const urgent = severity === 'emergency' || severity === 'warning';
    const meta = (0, tone_v4_1.metaLine)([source, time]);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const name = (0, civic_v4_1.spokenLine)([word, title, message, source, time]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: (0, civic_v4_1.toneFill)(theme, sd.tone),
                backgroundColor: (0, civic_v4_1.tintGround)(theme, sd.tone),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: sd.glyph, size: "xl", style: { color: (0, civic_v4_1.tintInk)(theme, sd.tone) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "alert", accessibilityLiveRegion: urgent ? 'assertive' : 'polite', accessibilityLabel: name, style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", style: { color: (0, civic_v4_1.tintInk)(theme, sd.tone), textTransform: 'uppercase' }, children: word }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", children: title }), message ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onSurface", children: message })) : null, meta !== '' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: meta })) : null] }), onAction != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, alignItems: 'flex-start' }, children: (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", tone: severity === 'emergency' ? 'danger' : 'default', onPress: onAction, style: { minHeight: tap }, children: actionLabel }) })) : null] }), onDismiss != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: armed ? confirmDismissLabel : 'Dismiss alert', onPress: () => {
                    // Nothing restores a dismissed alert, so the misfire is guarded
                    // rather than mourned.
                    if (!armed) {
                        setArmed(true);
                        return;
                    }
                    setArmed(false);
                    onDismiss();
                }, style: ({ pressed }) => ({
                    minWidth: tap,
                    minHeight: tap,
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: pressed
                        ? (0, state_v4_1.pressOver)(theme, (0, civic_v4_1.tintGround)(theme, sd.tone), colors.onSurface)
                        : 'transparent',
                }), children: armed ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: (0, civic_v4_1.tintInk)(theme, sd.tone) }, children: confirmDismissLabel })) : ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u2715", size: "sm", color: "mutedText" })) })) : null] }));
}
//# sourceMappingURL=CivicAlertV4.js.map
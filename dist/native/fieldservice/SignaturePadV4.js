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
exports.SignaturePadV4 = SignaturePadV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const job_v4_1 = require("./internal/job-v4");
/**
 * **V4 signature pad** — same props as {@link SignaturePad} plus
 * `confirmClearLabel` and `signLabel`.
 *
 * ## Four changes
 *
 * 1. **Clear takes a confirming press.** The signature is the legally
 *    meaningful artefact of the visit and one press destroyed it — no
 *    confirmation, no undo, and no prop a host app could use to ask for
 *    either. The first press arms Clear and relabels it `confirmClearLabel`.
 * 2. **Clear is the same weight on both twins, and it is the quieter one.**
 *    It was a filled `danger` button on web and a `ghost` text button here, so
 *    the riskiest control in the module was the loudest thing on the card on
 *    one platform and nearly invisible on the other. Both are `ghost` now: the
 *    confirm carries the caution, not the fill.
 * 3. **`signLabel` is one string on both twins.** Web said "click to sign" and
 *    native "tap to sign", so a shared test or a voice command matched one
 *    platform and not the other.
 * 4. **Clear clears 44, and a press is a state layer.** The pad dimmed itself
 *    to `0.85` while held and to `0.5` when disabled — 0.38 is M3's disabled
 *    band, so a pressed pad and a dead one looked alike.
 */
function SignaturePadV4({ label, signed = false, signerName, signedAt, onSign, onClear, disabled = false, confirmClearLabel = 'Confirm clear', signLabel = 'Tap to sign', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [armed, setArmed] = React.useState(false);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const header = label != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", style: { marginBottom: tokens.spacing.xs }, children: label })) : null;
    if (signed) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [header, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: tokens.radius.md,
                        // The module's one tint strength, mixed into `card` rather than
                        // washed over whatever happens to be behind the pad.
                        backgroundColor: (0, job_v4_1.discGround)(theme, 'success'),
                        padding: tokens.spacing.md,
                        gap: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { minHeight: tokens.spacing['2xl'], justifyContent: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "semibold", tone: "onCard", numberOfLines: 1, style: { fontStyle: 'italic' }, children: signerName ?? 'Signed' }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { marginTop: tokens.spacing.xs, height: 1, backgroundColor: colors.border } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, job_v4_1.spokenLine)([signerName, 'Signed', signedAt]), style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u2713", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: signedAt != null ? `Captured · ${signedAt}` : 'Captured' })] }), onClear ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", size: "sm", tone: "danger", disabled: disabled, accessibilityLabel: armed ? confirmClearLabel : 'Clear', onPress: () => {
                                        if (!armed) {
                                            setArmed(true);
                                            return;
                                        }
                                        setArmed(false);
                                        onClear();
                                    }, style: { minHeight: tap }, children: armed ? confirmClearLabel : 'Clear' })) : null] })] })] }));
    }
    const inert = disabled || !onSign;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [header, (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, job_v4_1.spokenLine)([label, signLabel]), accessibilityState: { disabled: inert }, disabled: inert, onPress: onSign, style: ({ pressed }) => ({
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed && !inert ? (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface) : colors.surface,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.xl,
                    minHeight: tap,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, inert),
                }), children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u270D", size: "2xl", color: "mutedText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "medium", tone: "mutedText", children: signLabel }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { marginTop: tokens.spacing.sm, width: '80%', height: 1, backgroundColor: colors.border } })] })] }));
}
//# sourceMappingURL=SignaturePadV4.js.map
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
exports.InterestPickerV3 = InterestPickerV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
/** §10: geometry only — the 44pt minimum tap target a chip must clear. */
const TAP_TARGET = 44;
/**
 * Interest chips — V3, the compact line. No hero panel at all: a small badge
 * sits beside the headline on one row, the copy is left-aligned, and the chip
 * field is denser (a smaller type step, tighter padding) so the whole step fits
 * a sheet or a short screen without scrolling.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put
 * a hero, and silently squeezing one in is how a "compact" screen stops being
 * compact. `logoGlyph` still drives the small leading badge.
 *
 * §7 survives the density: the chips still **wrap** and are never clipped. A
 * denser row is not a licence to hide the last option.
 *
 * Same props as {@link InterestPicker}. Token-pure.
 */
function InterestPickerV3({ options, selectedIds, onChange, title, helper, maxSelections, accessibilityLabel = 'Interests', subtitle, logoGlyph, progress, onBack, onDismiss, error, ctaLabel = 'Continue', onContinue, loading = false, secondaryLabel, onSecondary, emptyMessage = 'No topics to choose from.', style, }) {
    const { colors, tokens, scheme } = (0, theme_1.useXenitionTheme)();
    /*
      §3 asks for a "tinted ground" and names `primary[50]`. Taken literally that
      is wrong on native in dark mode: `toNativeTokens` copies the LIGHT
      orientation of the ramps into both schemes (unlike the emitted CSS vars,
      which invert), so `primary[50]` paints a near-white panel behind a
      near-black page. Read the dark end of the same ramp instead — still a
      compiled token, still scheme-correct.
    */
    const tintedGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);
    const atCap = maxSelections != null && selectedSet.size >= maxSelections;
    const toggle = (id) => {
        const next = new Set(selectedSet);
        if (next.has(id))
            next.delete(id);
        else {
            if (atCap)
                return;
            next.add(id);
        }
        onChange(Array.from(next));
    };
    const subhead = subtitle ?? helper;
    const caption = subtitle != null ? helper : undefined;
    const showHeader = onBack != null || onDismiss != null || progress != null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [showHeader ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onDismiss, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : null] })) : null, title != null || subhead != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: TAP_TARGET,
                            height: TAP_TARGET,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: tintedGround,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph ?? '✦', size: "lg", color: "primary" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [title ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "lg", weight: "bold", tone: "onSurface", numberOfLines: 2, children: title })) : null, subhead ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", numberOfLines: 2, children: subhead })) : null] })] })) : null, caption ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", children: caption })) : null, options.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: { paddingVertical: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", children: emptyMessage }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: `${accessibilityLabel}, ${selectedSet.size} selected`, 
                // §7 — wrap, never clip, density or no density.
                style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: options.map((opt) => {
                    const selected = selectedSet.has(opt.id);
                    const disabled = !selected && atCap;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: selected, disabled }, accessibilityLabel: opt.label, disabled: disabled, onPress: () => toggle(opt.id), style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            minHeight: TAP_TARGET,
                            borderRadius: tokens.radius.full,
                            borderWidth: 1,
                            borderColor: selected ? colors.primary : colors.border,
                            backgroundColor: selected ? colors.primary : colors.surface,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            opacity: disabled ? 0.45 : 1,
                        }, children: [selected ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "check", size: "xs", color: "onPrimary" }) : null, (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "semibold", tone: selected ? 'onPrimary' : 'onSurface', children: opt.label })] }, opt.id));
                }) })), error ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "assertive", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "dangerText", children: error })] })) : null, onContinue ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: 'auto',
                    alignSelf: 'stretch',
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingTop: tokens.spacing.sm,
                    paddingBottom: tokens.spacing.lg,
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: ctaLabel, loading: loading, onPress: onContinue }), secondaryLabel && onSecondary ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: secondaryLabel, onPress: onSecondary, style: { alignItems: 'center', justifyContent: 'center', minHeight: TAP_TARGET }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "medium", tone: "muted", children: secondaryLabel }) })) : null] })) : null] }));
}
//# sourceMappingURL=InterestPickerV3.js.map
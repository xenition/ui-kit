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
exports.InterestPickerV2 = InterestPickerV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const GetStartedButton_1 = require("./GetStartedButton");
/** §10: geometry only — the 44pt minimum tap target a chip must clear. */
const TAP_TARGET = 44;
/** §3: the hero never eats more than ~38% of the screen, even full-bleed. */
const HERO_MAX_SCREEN_FRACTION = 0.38;
/**
 * Interest chips — V2, the editorial line. The hero runs full-bleed to the top
 * edge with no radius and no inset, and the content rises over it on a sheet
 * whose top corners are rounded and which overlaps the seam. The chips
 * themselves keep §7 exactly: they **wrap**, they never scroll sideways, and no
 * option is ever clipped out of reach.
 *
 * Same props as {@link InterestPicker}. Token-pure.
 */
function InterestPickerV2({ options, selectedIds, onChange, title, helper, maxSelections, accessibilityLabel = 'Interests', subtitle, illustration, logoGlyph, progress, onBack, onDismiss, error, ctaLabel = 'Continue', onContinue, loading = false, secondaryLabel, onSecondary, emptyMessage = 'No topics to choose from.', style, }) {
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
    const { height: screenHeight } = (0, react_native_1.useWindowDimensions)();
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    height: screenHeight * HERO_MAX_SCREEN_FRACTION,
                    backgroundColor: tintedGround,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }, children: [illustration ?? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: TAP_TARGET * 2,
                            height: TAP_TARGET * 2,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.primary,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph ?? '✦', size: "3xl", color: "onPrimary" }) })), showHeader ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.sm,
                        }, children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onDismiss, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } }))] })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: -tokens.spacing.xl,
                    padding: tokens.spacing.xl,
                    gap: tokens.spacing.lg,
                    backgroundColor: colors.surface,
                    borderTopLeftRadius: tokens.radius.lg,
                    borderTopRightRadius: tokens.radius.lg,
                    ...(0, elevation_1.shadow)('lg', tokens),
                }, children: [title != null || subhead != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [title ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "2xl", weight: "bold", tone: "onSurface", align: "center", numberOfLines: 2, children: title })) : null, subhead ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", align: "center", numberOfLines: 3, children: subhead })) : null] })) : null, caption ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", align: "center", children: caption })) : null, options.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: { padding: tokens.spacing.lg, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", align: "center", children: emptyMessage }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: `${accessibilityLabel}, ${selectedSet.size} selected`, 
                        // §7 — wrap, never clip.
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
                                    paddingVertical: tokens.spacing.sm,
                                    paddingHorizontal: tokens.spacing.md,
                                    opacity: disabled ? 0.45 : 1,
                                }, children: [selected ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "check", size: "sm", color: "onPrimary" })) : opt.icon ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: opt.icon, size: "sm", color: "onSurface" })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "semibold", tone: selected ? 'onPrimary' : 'onSurface', children: opt.label })] }, opt.id));
                        }) })), error ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "assertive", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "dangerText", children: error })] })) : null, onContinue ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            marginTop: 'auto',
                            alignSelf: 'stretch',
                            borderTopWidth: 1,
                            borderTopColor: colors.border,
                            backgroundColor: colors.surface,
                            paddingTop: tokens.spacing.md,
                            paddingBottom: tokens.spacing.lg,
                            gap: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: ctaLabel, loading: loading, onPress: onContinue }), secondaryLabel && onSecondary ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: secondaryLabel, onPress: onSecondary, style: { alignItems: 'center', justifyContent: 'center', minHeight: TAP_TARGET }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "medium", tone: "muted", children: secondaryLabel }) })) : null] })) : null] })] }));
}
//# sourceMappingURL=InterestPickerV2.js.map
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
exports.BreadcrumbV4 = BreadcrumbV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const nav_v4_1 = require("./internal/nav-v4");
const state_v4_1 = require("./internal/state-v4");
/**
 * **V4 breadcrumb** — same props as {@link Breadcrumb}, a different design
 * line.
 *
 * ## What a breadcrumb is for
 *
 * §29 asks that the user always know three things: where they are, what they
 * are editing, and how to go back. A breadcrumb is the only component in the
 * kit that answers all three at once, so the whole design is about making the
 * answer separable at a glance (§33 — users scan before they read).
 *
 * The trail therefore has exactly two registers, not a gradient of them:
 *
 * - **Where you are** is the last item, in `onSurface` at weight 600. It is
 *   the only full-contrast text in the row, so a scan finds it without
 *   counting separators.
 * - **How to go back** is everything before it, in `muted` at 400, each one a
 *   real target.
 *
 * ## The separator is a chevron, not a slash
 *
 * The base default was `/`, which reads as a path — a filesystem string the
 * user is expected to parse. `›` reads as *direction*: this came from that.
 * Same prop, same type, a different default; pass `separator` to override it
 * exactly as before. It is drawn in `muted`, because a separator that competes
 * with the labels it separates is noise (§7).
 *
 * ## Reach
 *
 * Each link is a full 44pt target, composed from the spacing scale. The base
 * trail wrapped bare `Text` in a `Pressable` with no padding at all — a 17pt
 * tap target, and the one control on the screen whose entire job is *getting
 * out of here* (§30).
 */
function BreadcrumbV4({ items, separator = '›', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const size = tokens.typography.scale.sm;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Breadcrumb", style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: tokens.spacing.xs,
            },
            style,
        ], children: items.map((item, index) => {
            const last = index === items.length - 1;
            const label = typeof item.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    fontSize: size,
                    fontFamily: tokens.typography.fontBody,
                    // Two registers only: the page you are on, and the way back.
                    color: last ? colors.onSurface : colors.mutedText,
                    fontWeight: last ? '600' : '400',
                }, children: item.label })) : (item.label);
            return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [item.onPress !== undefined && !last ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "link", onPress: item.onPress, style: ({ pressed }) => ({
                            minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
                            justifyContent: 'center',
                            paddingHorizontal: tokens.spacing.xs,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                        }), children: label })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityState: last ? { selected: true } : undefined, style: {
                            minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
                            justifyContent: 'center',
                            paddingHorizontal: tokens.spacing.xs,
                        }, children: label })), !last ? (typeof separator === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text
                    // Decorative: a screen reader reading "chevron" between every
                    // crumb is noise, and the order already carries the nesting.
                    , { 
                        // Decorative: a screen reader reading "chevron" between every
                        // crumb is noise, and the order already carries the nesting.
                        accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { fontSize: size, color: colors.mutedText }, children: separator })) : (separator)) : null] }, index));
        }) }));
}
//# sourceMappingURL=BreadcrumbV4.js.map
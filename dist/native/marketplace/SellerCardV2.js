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
exports.SellerCardV2 = SellerCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
const elevation_1 = require("../primitives/internal/elevation");
/**
 * SellerCard — Design V2: a **profile-banner** card. A primary-tinted cover band
 * fills the header; the avatar overlaps it, centered; and the name, verified
 * badge, rating, and a row of stat cells (sales / rating) stack beneath, with a
 * full-width contact action at the foot. Vertical and centered — a shop
 * "storefront" identity rather than the V1 horizontal row. Same props as
 * `SellerCard`; the contact button stays outside the profile press target;
 * token-pure colors with `withAlpha` tints; elevated surface.
 */
function SellerCardV2({ name, avatarUrl, rating, reviewCount, salesCount, location, verified = false, actionLabel = 'Contact', onContact, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const statCell = (label, value) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label })] }));
    const stats = [];
    if (typeof rating === 'number') {
        stats.push((0, jsx_runtime_1.jsx)(React.Fragment, { children: statCell('rating', rating.toFixed(1)) }, "rating"));
    }
    if (typeof salesCount === 'number') {
        stats.push((0, jsx_runtime_1.jsx)(React.Fragment, { children: statCell('sales', salesCount.toLocaleString()) }, "sales"));
    }
    if (typeof reviewCount === 'number') {
        stats.push((0, jsx_runtime_1.jsx)(React.Fragment, { children: statCell('reviews', reviewCount.toLocaleString()) }, "reviews"));
    }
    const identity = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "xl" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), verified ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "accent", variant: "soft", size: "sm", children: "\u2713 Verified" })) : null] }), typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }) : null, location ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: location })) : null] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                overflow: 'hidden',
            },
            (0, elevation_1.shadow)('md', tokens),
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 56, backgroundColor: (0, internal_1.withAlpha)(colors.primary, 0.14) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, marginTop: -34, gap: tokens.spacing.md }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${verified ? ', verified seller' : ''}${typeof rating === 'number' ? `, rated ${rating} of 5` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: identity })) : (identity), stats.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: tokens.spacing.sm,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: (0, internal_1.withAlpha)(colors.primary, 0.12),
                        }, children: stats })) : null, onContact ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onContact, children: actionLabel })) : null] })] }));
}
//# sourceMappingURL=SellerCardV2.js.map
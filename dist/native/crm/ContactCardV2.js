"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactCardV2 = ContactCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
/**
 * ContactCard **design V2** — a *centered profile card*. Where the original is a
 * left-aligned avatar row, V2 stacks a large centered avatar, name and
 * title·company, a centered wrap of tag chips, and a full-width row of quick
 * actions across the footer — a proper contact "hero". Elevated on a token
 * shadow. Same props as {@link ContactCard}; empty tag/action arrays render
 * nothing; `loading` shows a skeleton. Token-pure.
 */
function ContactCardV2({ name, title, company, avatarUrl, tags, actions, variant = 'default', loading = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 6 });
    const compact = variant === 'compact';
    const hasTags = !compact && Array.isArray(tags) && tags.length > 0;
    const hasActions = !compact && Array.isArray(actions) && actions.length > 0;
    const body = ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                padding: compact ? tokens.spacing.md : tokens.spacing.lg,
                gap: tokens.spacing.md,
                alignItems: 'center',
                opacity: enter.opacity,
            },
            (0, elevation_1.shadow)('md', tokens),
            style,
        ], children: loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading contact", style: { alignItems: 'center', gap: tokens.spacing.sm, alignSelf: 'stretch' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.base, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: compact ? 'md' : 'xl', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), title || company ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [title, company].filter(Boolean).join(' · ') })) : null] }), hasTags ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: tokens.spacing.xs }, children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Tag, { tone: "neutral", variant: "soft", size: "sm", children: t }, `${t}-${i}`))) })) : null, hasActions ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: tokens.spacing.sm, alignSelf: 'stretch' }, children: actions.map((a) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexGrow: 1, flexBasis: 0, minWidth: 96 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "soft", size: "sm", onPress: a.onPress, accessibilityLabel: a.label, style: { alignSelf: 'stretch' }, children: `${a.glyph} ${a.label}` }) }, a.key))) })) : null] })) }));
    if (onPress && !loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Contact ${name}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=ContactCardV2.js.map
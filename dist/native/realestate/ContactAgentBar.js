"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactAgentBar = ContactAgentBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/** Shared min-height so every CTA clears the 44px tap target. */
const CTA_MIN_HEIGHT = 44;
/**
 * ContactAgentBar — **V4** "listing" design. A sticky-style contact action bar
 * for a listing: an optional agent avatar + name/subtitle on the left, then the
 * secondary Call and Message actions and a primary Schedule-tour CTA on the
 * right. Editorial, single-accent (primary) with the tour as the only filled
 * button; every CTA is ≥44px. 8-pt spacing inside a rounded elevated bar.
 * Presentational only — data + callbacks; an action is only rendered when its
 * handler is supplied. Token-only colors via `useXenitionTheme()`, no literals;
 * dark-mode safe.
 */
function ContactAgentBar({ agentName, agentAvatarUrl, agentSubtitle, onCall, onMessage, onTour, callLabel = 'Call', messageLabel = 'Message', tourLabel = 'Tour', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const showAgent = Boolean(agentName || agentAvatarUrl);
    const cta = { minHeight: CTA_MIN_HEIGHT };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: tokens.spacing.sm,
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                padding: tokens.spacing.sm,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [showAgent ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexShrink: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: agentAvatarUrl, name: agentName, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexShrink: 1 }, children: [agentName ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface }, children: agentName })) : null, agentSubtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.mutedText }, children: agentSubtitle })) : null] })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, marginLeft: showAgent ? 'auto' : 0, flexGrow: showAgent ? 0 : 1 }, children: [onCall ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", size: "md", onPress: onCall, accessibilityLabel: callLabel, style: cta, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "phone", size: "base", color: "primaryText" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.primaryText }, children: callLabel })] }) })) : null, onMessage ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", size: "md", onPress: onMessage, accessibilityLabel: messageLabel, style: cta, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "mail", size: "base", color: "primaryText" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.primaryText }, children: messageLabel })] }) })) : null, onTour ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "md", onPress: onTour, accessibilityLabel: tourLabel, style: [cta, { flexGrow: 1 }], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "calendar", size: "base", color: "onPrimary" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.onPrimary }, children: tourLabel })] }) })) : null] })] }));
}
//# sourceMappingURL=ContactAgentBar.js.map
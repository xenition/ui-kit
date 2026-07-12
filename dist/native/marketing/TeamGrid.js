"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamGrid = TeamGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Avatar_1 = require("../primitives/Avatar");
/**
 * Responsive grid of team/member cards — the native mirror of the web
 * `TeamGrid`. Cards wrap via flex `basis` rather than CSS grid breakpoints,
 * with an initials-fallback avatar. The web `socials` link row is dropped
 * (no `href` navigation surface on these cards). Token-only.
 */
function TeamGrid({ members, columns = 2, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const basis = `${100 / columns}%`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-team-grid", style: [
            { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg },
            style,
        ], children: members.map((member, index) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexGrow: 1, flexBasis: basis, minWidth: 160 }, children: (0, jsx_runtime_1.jsxs)(Card_1.Card, { style: { flex: 1, alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: member.avatar, name: member.name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '600',
                                    textAlign: 'center',
                                }, children: member.name }), member.role ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.primary,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '500',
                                    textAlign: 'center',
                                }, children: member.role })) : null] }), member.bio ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            textAlign: 'center',
                        }, children: member.bio })) : null] }) }, index))) }));
}
//# sourceMappingURL=TeamGrid.js.map
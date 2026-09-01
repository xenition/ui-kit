"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamGridV4 = TeamGridV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * TeamGrid — **V4** "showcase" design (native mirror of the web V4). A wrapping
 * grid of elevated member cards on the page ground (NOT a gradient surface):
 * each card an initials-fallback `avatar`, a bold `name`, a muted `role`, and
 * an optional `bio`. Cards wrap via flex `basis` rather than CSS grid
 * breakpoints (`columns` sets the row width, default 2 for phones). As on the
 * native base `TeamGrid`, the web `socials` link row is dropped — the native
 * base `TeamMember` type exposes no `socials` (no `href` navigation surface on
 * these cards) — so every field the native base carries (`name`, `role`,
 * `avatar`, `bio`) is honored. Same props/behavior as {@link TeamGridProps};
 * token-only colors, no literals.
 */
function TeamGridV4({ members, columns = 2, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const basis = `${100 / columns}%`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-team-grid", style: [
            { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg },
            style,
        ], children: members.map((member, index) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexGrow: 1, flexBasis: basis, minWidth: 160 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flex: 1,
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    padding: tokens.spacing.lg,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.card,
                    shadowColor: colors.onSurface,
                    shadowOpacity: 0.06,
                    shadowRadius: 10,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 2,
                }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: member.avatar, name: member.name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '800',
                                    letterSpacing: -0.3,
                                    textAlign: 'center',
                                }, children: member.name }), member.role ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.muted,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '500',
                                    textAlign: 'center',
                                }, children: member.role })) : null] }), member.bio ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            lineHeight: tokens.typography.scale.sm * 1.5,
                            textAlign: 'center',
                        }, children: member.bio })) : null] }) }, index))) }));
}
//# sourceMappingURL=TeamGridV4.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingInfoCard = VotingInfoCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const REG = {
    registered: { label: 'Registered', glyph: '✓', tone: 'success' },
    pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
    'not-registered': { label: 'Not registered', glyph: '!', tone: 'danger' },
    inactive: { label: 'Inactive', glyph: '✕', tone: 'neutral' },
};
/**
 * A voter-information card: registration status conveyed by **text + glyph +
 * color** (never color alone), the next election, an assigned polling place, and
 * gated Register / Find-polling actions. The action label adapts to whether the
 * voter is already registered. Every color traces to a `SemanticColors` slot or
 * a token-derived tint — no literals.
 */
function VotingInfoCard({ registration, electionDate, electionName, pollingPlace, pollingAddress, mailBallot = false, onRegister, onFindPolling, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const reg = REG[registration] ?? REG['not-registered'];
    const isRegistered = registration === 'registered';
    const tint = reg.tone === 'neutral' ? colors.muted : colors[reg.tone];
    return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: "elevated", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 48,
                            height: 48,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, format_1.withAlpha)(tint, 0.14),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\uD83D\uDDF3\uFE0F", size: "xl", accessibilityLabel: "Voting" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Voter status" }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: reg.tone, variant: "soft", size: "sm", children: `${reg.glyph} ${reg.label}` })] }), mailBallot ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "accent", variant: "soft", size: "sm", children: "\uD83D\uDCEE Mail ballot" })) : null] }), electionName != null || electionDate != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    gap: 2,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Next election" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [electionName, electionDate].filter((v) => v != null && v !== '').join(' · ') })] })) : null, pollingPlace != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Polling place" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: ["\uD83D\uDCCD ", pollingPlace] }), pollingAddress != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: pollingAddress })) : null] })) : null, onRegister != null || onFindPolling != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    gap: tokens.spacing.sm,
                    justifyContent: 'flex-end',
                }, children: [onFindPolling != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", variant: "outline", onPress: onFindPolling, children: "Find polling place" })) : null, onRegister != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", onPress: onRegister, children: isRegistered ? 'Update registration' : 'Register to vote' })) : null] })) : null] }));
}
//# sourceMappingURL=VotingInfoCard.js.map
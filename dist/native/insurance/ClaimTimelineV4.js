"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimTimelineV4 = ClaimTimelineV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const money_1 = require("../../commerce/money");
const coverage_v4_1 = require("../../insurance/coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Non-colour marks, one per kind. */
const KIND_GLYPH = {
    filed: '✎',
    note: '💬',
    document: '📎',
    payment: '💵',
    decision: '⚖',
};
const KIND_LABEL = {
    filed: 'Filed',
    note: 'Note',
    document: 'Document',
    payment: 'Payment',
    decision: 'Decision',
};
/** The empty state's next-step sentence. */
const EMPTY_DESCRIPTION = 'Adjuster notes, document requests and payments appear here.';
/**
 * **V4 claim timeline** — a new component. There is no base to extend, so the
 * props are plain `ClaimTimelineV4Props`.
 *
 * ## Why it exists
 *
 * `ClaimStatusTracker` gives a claim four fixed stages and one `updated`
 * string, and that is the whole of what this module could say about a claim's
 * history. It is not enough for the thing people actually ask — *what is
 * happening to my claim, and what do you need from me?* An adjuster's note, a
 * request for a repair estimate, a partial payment and a denial are all dated
 * events with a body, and none of them fits in a four-step rail.
 *
 * **This is where a denial reason belongs.** The tracker invented one because
 * it had four stages and nowhere to put prose; here a `decision` entry carries
 * its own `detail`, in the caller's words, with the date it was made and the
 * adjuster who made it. `ClaimStatusTrackerV4` gained a `denialReason` prop for
 * the summary line — this is the full account it summarises.
 *
 * ## What it does with the module's rules
 *
 * 1. **The rail is decorative.** The dots and the connecting line are geometry:
 *    they are hidden from the reader, and each entry is one accessible stop
 *    naming its date, kind, title, actor, amount and body in that order — the
 *    order somebody asks for them in.
 * 2. **A kind is identity.** Four of the five marks are a glyph and a word on
 *    the neutral chip ground. Only `decision` takes a tone, and only when its
 *    `outcome` is adverse — `isAdverse` decides, the same function
 *    `PolicyCardV4` and `ClaimStatusTrackerV4` use, so "which states owe a
 *    reason" is answered in one place for the whole module.
 * 3. **Empty and loading are real.** An empty timeline says what will fill it;
 *    a loading one draws placeholders in the shape of the entries, opaque and
 *    composited against the card's own ground.
 * 4. **Money goes through the shared formatter**, in integer cents, with an
 *    override — negative included, because a reversed payment is a fact a
 *    claimant is owed.
 */
function ClaimTimelineV4({ items, title = 'Claim activity', currency = 'USD', formatMoney: format = money_1.formatMoney, loading = false, skeletonRows = 3, loadingLabel = 'Loading claim activity', emptyLabel = 'No claim activity yet', emptyDescription = EMPTY_DESCRIPTION, kindLabels, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const rows = Array.isArray(items) ? items : [];
    const dot = tokens.spacing.lg;
    const heading = ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "base", weight: "bold", tone: "onCard", children: title }));
    if (loading) {
        const bar = (width) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                height: tokens.typography.scale.sm,
                borderRadius: tokens.radius.sm,
                backgroundColor: (0, tone_v4_1.skeletonFill)(theme),
                width,
            } }));
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [{ gap: tokens.spacing.md }, style], children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, style: { gap: tokens.spacing.md }, children: Array.from({ length: Math.max(1, skeletonRows) }, (_, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: dot,
                                    height: dot,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, tone_v4_1.skeletonFill)(theme),
                                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [bar('40%'), bar('85%')] })] }, i))) })] }));
    }
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [{ gap: tokens.spacing.md }, style], children: [heading, (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [{ gap: tokens.spacing.md }, style], children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { children: rows.map((entry, i) => {
                    const kind = entry.kind ?? 'note';
                    const word = kindLabels?.[kind] ?? KIND_LABEL[kind];
                    const adverse = kind === 'decision' && entry.outcome != null && (0, coverage_v4_1.isAdverse)(entry.outcome);
                    const amount = typeof entry.amountCents === 'number' && Number.isFinite(entry.amountCents)
                        ? format(Math.trunc(entry.amountCents), currency)
                        : null;
                    const last = i === rows.length - 1;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([
                            entry.date,
                            word,
                            entry.title,
                            entry.actor,
                            amount,
                            entry.detail,
                        ]), style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: { alignItems: 'center', width: dot }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            width: dot,
                                            height: dot,
                                            borderRadius: tokens.radius.full,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: adverse ? (0, tone_v4_1.toneFill)(theme, 'danger') : (0, tone_v4_1.chipGround)(theme),
                                        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: adverse ? colors.onDanger : colors.onCard }, children: KIND_GLYPH[kind] }) }), !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, width: 1, backgroundColor: colors.border } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flex: 1,
                                    minWidth: 0,
                                    gap: tokens.spacing.xs / 2,
                                    paddingBottom: last ? 0 : tokens.spacing.md,
                                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                            flexDirection: 'row',
                                            alignItems: 'baseline',
                                            justifyContent: 'space-between',
                                            gap: tokens.spacing.sm,
                                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: entry.date }), amount ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", tone: "onCard", numeric: "tabular", children: amount })) : null] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", style: { color: adverse ? (0, tone_v4_1.toneInk)(theme, 'danger') : colors.onCard }, children: entry.title }), entry.detail ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: entry.detail })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: entry.actor ? `${word} · ${entry.actor}` : word })] })] }, entry.id ?? `${entry.date}-${i}`));
                }) })] }));
}
//# sourceMappingURL=ClaimTimelineV4.js.map
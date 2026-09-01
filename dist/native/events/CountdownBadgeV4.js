"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountdownBadgeV4 = CountdownBadgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const event_v4_1 = require("./internal/event-v4");
const pad = (n) => String(n).padStart(2, '0');
/**
 * **V4 countdown badge** — same props as {@link CountdownBadge} plus
 * `unitLabels` and `unknownLabel`.
 *
 * ## Four changes
 *
 * 1. **It stops announcing "Started" when it was given nothing at all.** With
 *    neither `remainingMs` nor `target` the base fell through to `ms = 0`, and
 *    zero reads as elapsed — so a badge on an event with no date confidently
 *    told everyone it had already begun. `countdownParts()` reports
 *    `known: false` for that case and the badge says `unknownLabel` instead.
 * 2. **The announcement is pluralised, and it lands.** It read "1 days 1 hours
 *    1 minutes", on a `View` with no role, where the label is ignored anyway.
 *    `countdownSentence()` supplies the words and the badge is a `timer`.
 * 3. **The elapsed chip stops inking `onSurface` on a `border` fill** — a
 *    hairline token spent as a background, with no contrast promise behind the
 *    text on it. Ground and ink now come from the shared tone pair.
 * 4. **The figures are tabular**, so a countdown ticking from `09` to `10`
 *    does not shuffle the tiles sideways once a minute.
 */
function CountdownBadgeV4({ target, remainingMs, now, label, elapsedLabel = 'Started', unitLabels, unknownLabel = 'Date to be announced', variant = 'inline', tone = 'primary', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    // `undefined`, not `0`, when the caller supplied neither — that distinction
    // is the whole of change 1.
    const ms = typeof remainingMs === 'number'
        ? remainingMs
        : target
            ? target.getTime() - (now ?? new Date()).getTime()
            : undefined;
    const parts = (0, event_v4_1.countdownParts)(ms);
    const bg = (0, event_v4_1.toneFill)(theme, tone);
    const fg = (0, event_v4_1.onPair)(theme, tone);
    const quietBg = (0, event_v4_1.toneFill)(theme, 'neutral');
    const quietFg = (0, event_v4_1.onPair)(theme, 'neutral');
    const chip = (text, ground, ink) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: (0, event_v4_1.spokenLine)([label, text]), style: [
            {
                alignSelf: 'flex-start',
                borderRadius: tokens.radius.full,
                backgroundColor: ground,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", style: { color: ink }, children: text }) }));
    if (!parts.known)
        return chip(unknownLabel, quietBg, quietFg);
    if (parts.elapsed)
        return chip(elapsedLabel, quietBg, quietFg);
    const spoken = (0, event_v4_1.spokenLine)([label, (0, event_v4_1.countdownSentence)(parts, unitLabels ?? {})]);
    if (variant === 'blocks') {
        const blocks = [
            { value: pad(parts.days), unit: 'DAY' },
            { value: pad(parts.hours), unit: 'HR' },
            { value: pad(parts.minutes), unit: 'MIN' },
        ];
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "timer", accessibilityLabel: spoken, style: [{ gap: tokens.spacing.xs }, style], children: [label ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: blocks.map((b) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            alignItems: 'center',
                            // The same scale steps the web twin composes its tile width
                            // from, so a tile is one size across the two platforms.
                            minWidth: tokens.spacing['2xl'] + tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            backgroundColor: bg,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", numeric: "tabular", style: { color: fg }, children: b.value }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: fg, letterSpacing: tokens.spacing.xs / 4 }, children: b.unit })] }, b.unit))) })] }));
    }
    const compact = `${parts.days > 0 ? `${parts.days}d ` : ''}${pad(parts.hours)}h ${pad(parts.minutes)}m`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "timer", accessibilityLabel: spoken, style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                backgroundColor: bg,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: [label ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: fg }, children: label })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", numeric: "tabular", style: { color: fg }, children: compact })] }));
}
//# sourceMappingURL=CountdownBadgeV4.js.map
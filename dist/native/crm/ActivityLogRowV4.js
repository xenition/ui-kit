"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLogRowV4 = ActivityLogRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 activity row** — same props as {@link ActivityLogRow} plus
 * `pendingLabel`.
 *
 * ## Five changes
 *
 * 1. **A pending activity says so.** The base drew `pending` as
 *    `opacity: 0.6` and nothing else — a value below M3's 0.38 disabled band,
 *    so a pending entry read as an unavailable one, and a screen reader was
 *    told nothing at all. It now carries the word.
 * 2. **An activity kind is identity, not status.** `ACTIVITY_META` typed
 *    `task` and `deal` as `success`, so a log of finished calls rendered as a
 *    green feed and the tone stopped meaning anything. `ACTIVITY_META_V4`
 *    takes every kind neutral; the glyph already says which kind it is.
 * 3. **The chip is one object on both twins.** Web painted a flat
 *    `bg-neutral-100`, native a per-kind `withAlpha` tint of a **fill** token
 *    used as ink. Both now wear the `selected`/`onSelected` pair, which is the
 *    compiler's slot for a tinted container with a guaranteed ink.
 * 4. **The row announces everything it shows** — kind, title, detail, actor,
 *    timestamp and "Pending". The base's `Call: Rang Ada` replaced the whole
 *    subtree, so the meta line was silent (rule A).
 * 5. **A press is a state layer** (rule B), and a row with no `onPress` is no
 *    longer announced as a *disabled button*.
 *
 * **Renders nothing without a `title`.**
 */
function ActivityLogRowV4({ kind, title, detail, actor, timestamp, pending = false, pendingLabel = 'Pending', onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const meta = crm_v4_1.ACTIVITY_META_V4[kind];
    const caption = (0, crm_v4_1.metaLine)([actor, timestamp]);
    // 32 — the chip is a marker beside the text, not a tap target, so it is not
    // held to 44; the row around it is.
    const chip = tokens.spacing.xl;
    const name = (0, crm_v4_1.spokenLine)([
        meta.label,
        title,
        detail,
        actor,
        timestamp,
        pending ? pendingLabel : null,
    ]);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                borderRadius: tokens.radius.md,
                backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: chip,
                    height: chip,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.selected,
                }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", style: { color: colors.onSelected }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 2, children: title }), detail ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 2, children: detail })) : null, caption || pending ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: tokens.spacing.xs,
                        }, children: [pending ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...crm_v4_1.BADGE_V4, tone: "neutral", children: pendingLabel })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "medium", tone: "mutedText", children: caption })) : null] })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, testID: testID, children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, testID: testID, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=ActivityLogRowV4.js.map
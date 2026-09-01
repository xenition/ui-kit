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
exports.SafetyChecklistV4 = SafetyChecklistV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AlertV4_1 = require("../primitives/AlertV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const verdict_v4_1 = require("../../fieldservice/verdict-v4");
const job_v4_1 = require("./internal/job-v4");
/** Verdict → its glyph, its tone and its default name. */
const VERDICT_META = {
    pass: { glyph: '✓', tone: 'success', label: 'Pass' },
    fail: { glyph: '✕', tone: 'danger', label: 'Fail' },
    unchecked: { glyph: '○', tone: 'neutral', label: 'Unchecked' },
};
/** How many skeleton rows stand in for the list while it loads. */
const SKELETON_ROWS = 3;
/**
 * **V4 safety checklist** — same props as {@link SafetyChecklist} plus
 * `confirmHazardLabel`, `verdictLabels`, `hazardLabel` and `formatHazardCount`.
 *
 * ## Five changes
 *
 * 1. **A stray tap no longer certifies a site as safe.** The base cycled
 *    `fail → unchecked` on one press: that dropped the item out of the hazard
 *    count, unmounted the red "Hazard — do not proceed" banner and flipped the
 *    header to "All clear" — on a 40px target, tapped one-handed, outdoors, in
 *    gloves, with no confirmation and no prop a host app could use to ask for
 *    one. `clearsHazard()` names that one transition; when it is true the first
 *    press only **arms** the row, says so through `confirmHazardLabel`, and a
 *    second press does the work. Every other transition is unchanged and
 *    immediate, because passing is the ordinary case and making it cost two
 *    taps would be a worse component rather than a safer one.
 * 2. **The row says what pressing will do, and carries the hazard flag.** The
 *    base's name was `"${label}, ${verdict}"`, which replaced the subtree — so
 *    the ⚠ Hazard badge beside it was never spoken. The name now carries it,
 *    and the hint carries the verdict the next press records.
 * 3. **A row you cannot change is not a button.** Without `onToggle` the base
 *    still rendered a live `Pressable` that did nothing at all.
 * 4. **Rows clear 44 and press as a state layer.** 40px and `opacity: 0.7`
 *    both go — 0.38 is M3's *disabled* band, so dimming a pressed row made it
 *    read as unavailable.
 * 5. **The verdict is announced once.** The disc carried an
 *    `accessibilityLabel`, so a reader stopped on it and then read the same
 *    verdict again out of the row; it is decorative now.
 */
function SafetyChecklistV4({ title, items, onToggle, loading = false, emptyLabel = 'No safety items', confirmHazardLabel = (label) => `Confirm clearing hazard: ${label}`, verdictLabels, hazardLabel = 'Hazard', formatHazardCount = (count) => `${count} blocking safety ${count === 1 ? 'item is' : 'items are'} failing.`, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // Which row is one press away from clearing its hazard. One at a time: arming
    // a second row disarms the first, so a forgotten arm cannot fire later.
    const [armed, setArmed] = React.useState(null);
    const list = Array.isArray(items) ? items : [];
    const hazards = (0, verdict_v4_1.hazardCount)(list);
    const failCount = list.filter((item) => item.verdict === 'fail').length;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: "outlined", style: [{ backgroundColor: colors.card }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading safety checklist", style: { gap: tokens.spacing.sm }, children: Array.from({ length: SKELETON_ROWS }, (_, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, minHeight: tap }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: tap,
                                height: tap,
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, job_v4_1.skeletonFill)(theme),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                flex: 1,
                                height: tokens.spacing.md,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, job_v4_1.skeletonFill)(theme),
                            } })] }, i))) }) }));
    }
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: "Safety checkpoints will appear here.", style: style }));
    }
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "outlined", style: [{ backgroundColor: colors.card }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [title != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", children: title })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: failCount > 0 ? 'danger' : 'success', ...job_v4_1.BADGE_V4, children: failCount > 0 ? `✕ ${failCount} failing` : '✓ All clear' })] }), hazards > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(AlertV4_1.AlertV4, { tone: "danger", title: "Hazard \u2014 do not proceed", children: formatHazardCount(hazards) }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: list.map((item) => {
                    const meta = VERDICT_META[item.verdict] ?? VERDICT_META.unchecked;
                    const next = (0, verdict_v4_1.nextVerdict)(item.verdict);
                    const nextMeta = VERDICT_META[next] ?? VERDICT_META.unchecked;
                    const verdictWord = verdictLabels?.[item.verdict] ?? meta.label;
                    const nextWord = verdictLabels?.[next] ?? nextMeta.label;
                    const guarded = (0, verdict_v4_1.clearsHazard)(item, next);
                    const isArmed = armed === item.id;
                    const name = isArmed
                        ? confirmHazardLabel(item.label)
                        : (0, job_v4_1.spokenLine)([item.label, verdictWord, item.hazard === true ? hazardLabel : null]);
                    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.md,
                            minHeight: tap,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.md,
                            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                                    width: tap,
                                    height: tap,
                                    borderRadius: tokens.radius.full,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: (0, job_v4_1.discGround)(theme, meta.tone),
                                }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: meta.glyph, size: "sm", style: { color: (0, job_v4_1.discInk)(theme, meta.tone) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "medium", tone: "onCard", children: item.label }), isArmed ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: colors.dangerText }, children: confirmHazardLabel(item.label) })) : null] }), item.hazard === true ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "danger", ...job_v4_1.BADGE_V4, children: `⚠ ${hazardLabel}` })) : null] }));
                    // No handler, no button: the base shipped a live `Pressable` that
                    // cycled nothing when a caller left `onToggle` off.
                    if (!onToggle) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: body(false) }, item.id));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, accessibilityHint: nextWord, accessibilityLiveRegion: isArmed ? 'polite' : 'none', onPress: () => {
                            if (guarded && !isArmed) {
                                setArmed(item.id);
                                return;
                            }
                            setArmed(null);
                            onToggle(item.id, next);
                        }, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => body(pressed) }, item.id));
                }) })] }));
}
//# sourceMappingURL=SafetyChecklistV4.js.map
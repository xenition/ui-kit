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
exports.InterestPickerV4 = InterestPickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * **V4 interest picker** — the base's props plus `fullScreen`,
 * `formatSelectionCount` and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The cap explains itself.** With `maxSelections` set, a live counter sits
 *    under the chips and the chips that can no longer be chosen say so through
 *    `accessibilityState` as well as opacity. The base just stopped responding.
 * 2. **Chips press.** An M3 state layer over the chip's own fill. The base had
 *    no pressed state at all, so on a slow render a tap looked ignored.
 * 3. **Unselected chips sit on `card`.** On `surface` they were the page
 *    colour with a hairline around them — the border was doing all the work,
 *    and on a dark seed the row read as a field of outlines.
 * 4. **Selected chips answer in the configured accent**, so two apps on one
 *    seed do not have identical chip rows.
 * 5. **`fullScreen`** — the shared shell, which is where the scroll, the
 *    pinned CTA and the safe-area inset come from.
 *
 * An empty `options` renders `emptyMessage`, never a bare gap. Selection stays
 * fully controlled: the component computes nothing it does not display.
 */
function InterestPickerV4({ options, selectedIds, onChange, title, helper, maxSelections, accessibilityLabel = 'Interests', subtitle, illustration, logoGlyph, progress, onBack, onDismiss, error, ctaLabel = 'Continue', onContinue, loading = false, secondaryLabel, onSecondary, emptyMessage = 'No topics to choose from.', fullScreen = false, formatSelectionCount, ground = 'plain', accent = 'primary', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const grounds = (0, flow_v4_1.flowGrounds)(theme, ground, accent);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);
    const atCap = maxSelections != null && selectedSet.size >= maxSelections;
    const toggle = (id) => {
        const next = new Set(selectedSet);
        if (next.has(id))
            next.delete(id);
        else {
            if (atCap)
                return;
            next.add(id);
        }
        onChange(Array.from(next));
    };
    const subhead = subtitle ?? helper;
    // `helper` keeps its own slot only when it is not already doing the
    // subhead's job, so the two never print the same sentence twice.
    const caption = subtitle != null ? helper : undefined;
    const showHero = illustration != null || logoGlyph != null;
    const counter = maxSelections != null
        ? (formatSelectionCount ?? ((n, max) => `${n} of ${max} selected`))(selectedSet.size, maxSelections)
        : '';
    const chips = options.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: { padding: tokens.spacing.lg, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", align: "center", children: emptyMessage }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: `${accessibilityLabel}, ${selectedSet.size} selected`, 
        // §7 — wrap, never scroll. A user cannot choose what they cannot see.
        style: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: tokens.spacing.sm,
            justifyContent: 'center',
        }, children: options.map((opt) => {
            const selected = selectedSet.has(opt.id);
            const blocked = !selected && atCap;
            const fill = selected ? grounds.fill : colors.card;
            const ink = selected ? grounds.onFill : colors.onCard;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: selected, disabled: blocked }, accessibilityLabel: opt.label, 
                // The reason, once, on the control that is refusing — not a
                // silent no-op the way the base handled the cap.
                accessibilityHint: blocked && counter ? counter : undefined, disabled: blocked, onPress: () => toggle(opt.id), style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    minHeight: tap,
                    borderRadius: tokens.radius.full,
                    borderWidth: 1,
                    borderColor: selected ? grounds.fill : colors.border,
                    backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, fill, ink) : fill,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, blocked),
                }), children: [selected ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm", style: { color: ink } })) : opt.icon ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: opt.icon, size: "sm", style: { color: ink } })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", style: { color: ink }, children: opt.label })] }, opt.id));
        }) }));
    const messages = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [counter ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityLiveRegion: "polite", size: "sm", tone: "mutedText", align: "center", children: counter })) : null, error ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "assertive", style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "error", size: "sm", color: "dangerText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "dangerText", children: error })] })) : null] }));
    const header = ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: progress }));
    const footer = onContinue ? ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { secondaryLabel: onSecondary ? secondaryLabel : undefined, onSecondary: onSecondary, safeArea: fullScreen, children: (0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: ctaLabel, loading: loading, onPress: onContinue }) })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showHero ? ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { illustration: illustration, logoGlyph: logoGlyph, grounds: grounds })) : null, (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title ?? '', subtitle: subhead }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: caption })) : null, chips, messages] }));
    if (fullScreen) {
        return ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowScreenV4, { grounds: grounds, center: false, header: header, footer: footer, style: style, children: body }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.lg }, style], children: [onBack != null || onDismiss != null || progress != null ? header : null, body, footer ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: 'auto', alignSelf: 'stretch' }, children: footer }) : null] }));
}
//# sourceMappingURL=InterestPickerV4.js.map
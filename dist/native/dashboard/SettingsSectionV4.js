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
exports.SettingsSectionV4 = SettingsSectionV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const ListSeparatorV4_1 = require("../layout/ListSeparatorV4");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const theme_1 = require("../theme");
const row_v4_1 = require("./internal/row-v4");
/**
 * **V4 settings section** — HIG's inset-grouped list, and the container that
 * makes a settings row look right.
 *
 * ## What V4 changes
 *
 * 1. **The ground is `colors.card`, not `colors.surface`.** Same headline fix
 *    as `SectionCardV4`: a grouped list painted the colour of the page is a
 *    border with rows in it, and `card` is the slot the shadcn pass added so a
 *    raised surface reads as raised in both schemes.
 * 2. **The separators are `ListSeparatorV4`.** Both twins hand-roll a
 *    `<View style={{ height: 1 }} />` today, which is how the leading inset
 *    went missing in the first place. They are drawn **between** the rows, so
 *    the last row gets none and the list ends on the card's own edge (§4.4).
 * 3. **The uppercase `xs` heading is gone.** Admin styling; HIG's grouped
 *    headers are sentence case. It becomes `size="sm" weight="semibold"
 *    tone="mutedText"` — `mutedText`, never the `muted` **fill**, which is what
 *    both base twins paint their heading and footnote with.
 * 4. **The heading and footnote pay the row gutter.** `rowMetrics().padX`, read
 *    off `internal/row-v4.ts` rather than retyped, not the base's `spacing.sm`
 *    — so the heading sits over the row labels rather than near them.
 * 5. **It renders nothing for zero rows.** §4.5, and the base's exact bug: an
 *    empty `SettingsSection` today is a bordered rectangle with a heading over
 *    it.
 *
 * The card is `overflow: 'hidden'` and pays no padding of its own: the rows own
 * their gutters (`internal/row-v4.ts`), so they run flush to the card edge and
 * clip to `radius.lg`. §4.3 in one sentence — **a list of rows is one card with
 * rows in it, not a stack of cards.**
 *
 * ### Platform divergence
 *
 * None. Same props, same names, same defaults as the web twin.
 */
function SettingsSectionV4({ title, footnote, insetSeparators = false, variant = 'elevated', empty, style, children, ...rest }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // The row family's own horizontal padding, read from the shared metric so the
    // heading and the row labels below it cannot drift apart (§5).
    const { padX } = (0, row_v4_1.rowMetrics)(theme);
    const rows = React.Children.toArray(children).filter(Boolean);
    const hasBody = rows.length > 0 || empty !== undefined;
    // §4.5: a group with no rows and nothing to say about it renders nothing —
    // not an empty bordered box, and not a heading floating over one.
    if (!hasBody)
        return null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], ...rest, children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-settings-heading", style: { paddingHorizontal: padX }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "mutedText", children: title }) })) : null, (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { testID: "xen-v4-settings-card", variant: variant, radius: "lg", 
                // No padding: the rows own their gutters, and a card that also paid one
                // would push every row's label into a channel down the middle.
                padding: "none", style: {
                    // §4.2's headline fix. `CardV4` paints `colors.surface`, which is the
                    // page; a card has its own ground and this is it.
                    backgroundColor: colors.card,
                    // So the first and last rows clip to `radius.lg` instead of squaring
                    // off the card's corners.
                    overflow: 'hidden',
                }, children: rows.length > 0
                    ? rows.map((row, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? ((0, jsx_runtime_1.jsx)(ListSeparatorV4_1.ListSeparatorV4, { inset: insetSeparators ? 'leading' : undefined })) : null, row] }, i)))
                    : empty !== undefined
                        ? (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ...empty })
                        : null }), footnote ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-settings-footnote", style: { paddingHorizontal: padX }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: footnote }) })) : null] }));
}
//# sourceMappingURL=SettingsSectionV4.js.map
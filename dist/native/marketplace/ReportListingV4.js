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
exports.ReportListingV4 = ReportListingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
const InputV4_1 = require("../primitives/InputV4");
const PopconfirmV4_1 = require("../primitives/PopconfirmV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
/**
 * **V4 report-a-listing form** — the one component in Group D where `danger`
 * is spent honestly, and the one that grows a step it did not have.
 *
 * ## The confirmation step
 *
 * Reporting is **outward-facing and hard to reverse**: it names another person
 * to a moderator, and nothing in the product un-names them. The base fired it
 * on a single tap of a button that sat exactly where "Save" sits on every other
 * form in the kit. §25 asks for friction proportional to risk, and this is the
 * highest-risk tap in either module — so the submit is wrapped in
 * `PopconfirmV4`, the kit's existing confirmation affordance, rather than a new
 * one invented here. Popconfirm already gets the parts that are easy to get
 * wrong right: it clones the trigger instead of nesting a second `Pressable`
 * under it (which on native would eat the responder and make the whole thing a
 * silent no-op), the destructive button is the only coloured thing in the
 * bubble, and the scrim is the shadow colour rather than `onSurface`, which
 * inverts.
 *
 * A single tap now opens the sheet and submits nothing.
 *
 * ## Everything else
 *
 * 1. **The reasons are an option list, not a radio list.** Same treatment as
 *    `ShippingOptionV4`, for the same HIG rule: a persistent `selected`
 *    highlight plus a trailing checkmark. The 18pt hand-drawn dot, its
 *    `borderWidth: 2` and the `withAlpha(primary, 0.08)` tint all go.
 *    `accessibilityRole="radio"` and the `selected` state stay.
 * 2. **The rows are the family's rows**, on the 56 metric with `md` gutters,
 *    so a list of reasons is a list rather than a stack of outlined chips.
 * 3. **The details field is `InputV4`** — the 48/`radius.md` metric — and its
 *    requirement is a **sentence** when it is unmet, not a red outline
 *    (Addendum item 2, the same exception `MakeOfferFormV4` takes).
 * 4. **Both twins degrade to `EmptyStateV4`.** This twin rendered a bare grey
 *    line of text where the web one composed an empty state — the parity defect
 *    this pass keeps finding, closed here.
 * 5. **The panel is a card on `card`** (rule 4), not `surface`.
 */
function ReportListingV4({ reasons, title = 'Report this listing', submitLabel = 'Submit report', loading = false, onSubmit, onCancel, confirmMessage = 'Report this listing? A moderator will review it, and the seller is not told who reported it.', confirmLabel = 'Report', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [selectedId, setSelectedId] = React.useState(null);
    const [details, setDetails] = React.useState('');
    const selected = reasons.find((r) => r.id === selectedId) ?? null;
    const detailsRequired = selected?.requiresDetails === true;
    const detailsOk = !detailsRequired || details.trim().length > 0;
    const valid = selected != null && detailsOk;
    // Words, not a border. Only once the user has typed and cleared the box —
    // shouting at an empty field nobody has touched is not a validation.
    const detailsError = detailsRequired && !detailsOk && details.length > 0
        ? 'Tell us what happened — this reason needs details.'
        : undefined;
    const submit = () => {
        if (!valid || loading || selected == null)
            return;
        onSubmit?.(selected.id, details.trim() ? details.trim() : undefined);
    };
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "outlined", padding: "lg", radius: "lg", style: [
            // Rule 4: a card's ground is `card`, not `surface`.
            { backgroundColor: colors.card, gap: tokens.spacing.md },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", children: title }), reasons.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: "No report reasons available", description: "There is nothing to report against on this listing yet." })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: title, children: reasons.map((reason) => {
                    const isSel = reason.id === selectedId;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected: isSel }, accessibilityLabel: reason.label, onPress: () => setSelectedId(reason.id), style: ({ pressed }) => [
                            (0, row_v4_1.rowContainerStyle)(theme),
                            {
                                borderRadius: tokens.radius.md,
                                backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed, selected: isSel }),
                            },
                        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: isSel ? 'onSelected' : 'onSurface', children: reason.label }) }), isSel ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), testID: "xen-report-check", children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "base", color: "primary" }) })) : null] }, reason.id));
                }) })), selected != null ? ((0, jsx_runtime_1.jsx)(InputV4_1.InputV4, { testID: "xen-mkt-report-details", label: detailsRequired ? 'Details (required)' : 'Details (optional)', placeholder: "Add any specifics", value: details, onChangeText: setDetails, error: detailsError, multiline: true })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onCancel != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", onPress: onCancel, style: { flex: 1 }, children: "Cancel" })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(PopconfirmV4_1.PopconfirmV4, { message: confirmMessage, confirmLabel: confirmLabel, onConfirm: submit, trigger: (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", tone: "danger", disabled: !valid || loading, loading: loading, children: submitLabel }) }) })] })] }));
}
//# sourceMappingURL=ReportListingV4.js.map
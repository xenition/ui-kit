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
exports.ApplyButtonV4 = ApplyButtonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
/** Which `ButtonV4` variant each state wears. The base's own mapping. */
const VARIANT = {
    apply: 'primary',
    applied: 'secondary',
    withdrawn: 'ghost',
};
/**
 * The ink and the type step each state's variant is labelled in.
 *
 * A deliberate, small duplication of `ButtonV4`'s own variant→foreground and
 * size→scale resolution, and the only reason either exists is the busy row
 * below: a spinner and a label drawn as `children` have to be coloured and
 * sized by the caller, because `ButtonV4` only styles a **string** child
 * itself. Three ink slots, matching its `primary` / `secondary` / `ghost`
 * cases, and its three sizes.
 */
const BUSY_INK = {
    apply: 'onPrimary',
    applied: 'primaryText',
    withdrawn: 'onSurface',
};
const LABEL_SIZE = { sm: 'sm', md: 'base', lg: 'lg' };
/**
 * The tick the `applied` state wears.
 *
 * Decoration, not copy. It is drawn beside `appliedLabel` and excluded from
 * the accessible name, because a reader says `✓` out loud as "check mark" and
 * "Applied check mark — press to withdraw" is not a sentence. Keeping it out
 * of the prop also keeps a glyph out of the translator's string. The web twin
 * holds the same constant and hides it the same way.
 */
const APPLIED_TICK = '✓';
/**
 * **V4 apply button** — same props as {@link ApplyButton} plus `applyLabel`,
 * `appliedLabel` and `reapplyLabel`.
 *
 * ## Three changes
 *
 * 1. **A double tap no longer submits twice.** The base wired `onApply`
 *    straight to the press, and an application is not an idempotent request —
 *    two taps on a slow connection is two applications to the same job, which
 *    a recruiter sees and the applicant cannot undo. The button latches on the
 *    first press and releases when the caller moves `state` or flips
 *    `loading`, which is exactly the moment the submission has been
 *    acknowledged. A caller that does neither gets a one-shot button, which is
 *    the correct behaviour for a submit.
 * 2. **Busy is not disabled.** `ButtonV4` treats `loading` as `disabled` — it
 *    dims to M3's 0.38 disabled band **and** reports `accessibilityState`
 *    `disabled: true`, which on both platforms drops focus and tells the
 *    reader the control is unavailable rather than working. So V4 does not
 *    hand `loading` down: while busy the button keeps its full ink, keeps its
 *    place in the focus order, shows a spinner beside its own label, announces
 *    `busy`, and swallows presses itself. `disabled` still means disabled and
 *    still dims. The two states now look and sound different, which is the
 *    whole point of having both.
 * 3. **Every label is a prop, and the tick is not one of them.** The base
 *    hard-coded "Apply", "Applied ✓" and "Re-apply" with no override, in the
 *    one component in the module a localised app cannot avoid rendering. The
 *    applied state's tick is drawn as decoration beside the label and kept out
 *    of the name (see {@link APPLIED_TICK}), so `appliedLabel` is a word a
 *    translator can translate.
 *
 * The accessible name still names the state, so what the press will do is
 * never carried by the variant's colour alone — and it is composed from the
 * same three props on both twins, so the two announce identically.
 */
function ApplyButtonV4({ state = 'apply', onApply, onWithdraw, loading = false, disabled = false, size = 'md', block = false, applyLabel = 'Apply', appliedLabel = 'Applied', reapplyLabel = 'Re-apply', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [submitting, setSubmitting] = React.useState(false);
    // The latch releases the moment the caller acknowledges the submission —
    // either by moving the application on or by taking ownership of the spinner.
    React.useEffect(() => {
        setSubmitting(false);
    }, [state, loading]);
    // Composed from the labels, not spelled out beside them: a caller who
    // translates `appliedLabel` translates what the reader hears too, and the
    // web twin composes the same three sentences from the same three props.
    const config = {
        apply: { label: applyLabel, onPress: onApply, a11y: `${applyLabel} to this job` },
        applied: {
            label: appliedLabel,
            onPress: onWithdraw,
            a11y: `${appliedLabel} — press to withdraw`,
        },
        withdrawn: {
            label: reapplyLabel,
            onPress: onApply,
            a11y: `Application withdrawn — press to ${reapplyLabel.toLowerCase()}`,
        },
    }[state];
    const busy = loading || submitting;
    const press = () => {
        // Guard, not a debounce: the second tap is discarded outright rather than
        // deferred, because a deferred submit still submits.
        if (busy || disabled)
            return;
        setSubmitting(true);
        config.onPress?.();
    };
    const ink = colors[BUSY_INK[state]];
    const step = LABEL_SIZE[size];
    // Hidden from the reader on both platforms: the composed name above already
    // says "Applied", and a tick spoken after it is noise.
    const tick = state === 'applied' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: step, weight: "semibold", style: { color: ink }, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: APPLIED_TICK })) : null;
    return ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: VARIANT[state], size: size, disabled: disabled, onPress: press, accessibilityLabel: config.a11y, 
        // `busy` and `disabled` are separate flags on purpose; the reader hears
        // "busy" for one and "dimmed, unavailable" for the other.
        accessibilityState: { disabled, busy }, style: [
            { minHeight: (0, chrome_v4_1.minTap)(tokens.spacing) },
            block ? { alignSelf: 'stretch' } : null,
            style,
        ], children: busy || tick ? (
        // `ButtonV4` only inks and sizes a **string** child, so the moment the
        // label shares the row with anything — a spinner, the tick — the
        // caller owns both. Same ink, same step, either way.
        (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [busy ? ((0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { size: "small", color: ink, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants" })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: step, weight: "semibold", style: { color: ink }, children: config.label }), tick] })) : (config.label) }));
}
//# sourceMappingURL=ApplyButtonV4.js.map
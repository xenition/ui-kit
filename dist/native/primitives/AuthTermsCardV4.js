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
exports.AUTH_DEFAULT_TERMS_LINKS = void 0;
exports.AuthTermsCardV4 = AuthTermsCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CheckboxV4_1 = require("./CheckboxV4");
const TextV4_1 = require("./TextV4");
const field_v4_1 = require("./internal/field-v4");
const nav_v4_1 = require("./internal/nav-v4");
const state_v4_1 = require("./internal/state-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const AuthCard_1 = require("./AuthCard");
Object.defineProperty(exports, "AUTH_DEFAULT_TERMS_LINKS", { enumerable: true, get: function () { return AuthCard_1.AUTH_DEFAULT_TERMS_LINKS; } });
/**
 * **V4 terms consent** — the native twin of the web `AuthTermsCardV4`, the same
 * props as {@link AuthTermsCard} plus three additive ones, a different design
 * line.
 *
 * `ONBOARDING-DESIGN-SPEC.md` §9 asks the register screen for a terms
 * "checkbox in a bordered card with the two links inline", with the CTA
 * disabled until the box is ticked. That last part is why this component
 * matters more than its size suggests: it is the one control standing between
 * a user and the end of the funnel, so if it is hard to find, hard to hit, or
 * reads as an error, the sign-up stops there.
 *
 * What the V4 line changes:
 *
 * 1. **It answers.** The base card looked identical ticked and unticked — only
 *    the 20pt box changed, and the user's own thumb was on top of it. V4 moves
 *    the border to `colors.primary` and cross-fades in the M3 `hover` state
 *    layer of the brand behind the copy, so the change is visible from the far
 *    side of the card. It is a tint, not a fill: this is a consent, not a
 *    selected plan, and §7's filled treatment would make it shout. The fade
 *    runs on the native driver in {@link FIELD_MOTION}ms — the same duration
 *    the tick inside it takes — and under Reduce Motion it lands on the final
 *    value on the first frame (§36.10): the state is never something you have
 *    to wait to see.
 * 2. **The whole card is the target.** `pressToToggle` makes the card itself
 *    press, taking the tap area from one small square to the full card.
 * 3. **The links are real targets.** This is the one place the twins diverge
 *    in construction rather than in props. The web can leave an inline
 *    `<button>` in flowing text and expand its hit area with an absolute
 *    `::after`; React Native has no equivalent — a nested `<Text onPress>` is
 *    exactly as tall as its own line, which is about half the platform floor,
 *    and `Text` takes no `hitSlop`. So the sentence is laid out as a
 *    **wrapping row** — the same `flexWrap` §7 insists on for chips — with the
 *    lead-in copy and every link in a box a full `minTap()` tall. It still
 *    reads as one inline sentence; every part of it can now actually be hit.
 *    §46, accessibility before tidiness.
 * 4. **It composes V4 children.** `CheckboxV4` and `TextV4`, never the bases
 *    (§10.5) — so the tick, the press halo and the type scale here are the
 *    ones the rest of the V4 register screen is using.
 *
 * The empty states §12 asks about all hold: `links={[]}` renders the lead-in
 * copy alone with no dangling separator, no `error` renders no message row,
 * and no `description` renders the single-line card the base drew.
 *
 * No gradient, no glass, no shadow. §16 asks that forms stay minimal, and the
 * one thing on this card that should catch the eye is whether the box is
 * ticked.
 */
function AuthTermsCardV4({ checked = false, onCheckedChange, label = 'I agree to the', links = AuthCard_1.AUTH_DEFAULT_TERMS_LINKS, onLinkPress, separator = 'and', description, align = 'center', pressToToggle = true, error, disabled = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const invalid = Boolean(error);
    /** The floor for anything incidental a thumb has to find — 44 at the kit's scale. */
    const tap = (0, nav_v4_1.minTap)(tokens.spacing);
    /*
      The card only ever tints in the brand slot, or in `danger` once there is a
      real error to report. It must not read as a warning for the ordinary state
      of being untouched, which is what a red card before submission would say.
    */
    const tint = invalid ? colors.danger : colors.primary;
    const on = React.useRef(new react_native_1.Animated.Value(checked || invalid ? 1 : 0)).current;
    // A card that animates into its initial state is an entrance animation,
    // which §36.1 asks us not to replay; the first pass only records where we
    // already are, so only a real change is worth moving for.
    const mounted = React.useRef(false);
    React.useEffect(() => {
        const to = checked || invalid ? 1 : 0;
        if (reduced || !mounted.current) {
            mounted.current = true;
            on.setValue(to);
            return;
        }
        const anim = react_native_1.Animated.timing(on, {
            toValue: to,
            duration: field_v4_1.FIELD_MOTION,
            useNativeDriver: true,
        });
        anim.start();
        return () => anim.stop();
    }, [checked, invalid, reduced, on]);
    const card = {
        flexDirection: 'row',
        alignItems: align === 'top' ? 'flex-start' : 'center',
        gap: tokens.spacing.sm,
        padding: tokens.spacing.md,
        borderWidth: 1,
        borderColor: invalid ? colors.danger : checked ? colors.primary : colors.border,
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.surface,
        // The tint is a layer rather than the card's own `backgroundColor` so it
        // can cross-fade on the native driver; clipping keeps it inside the radius.
        overflow: 'hidden',
        opacity: disabled ? theme.state.disabledContent : 1,
    };
    /** One box on the sentence row, all of them the same height so baselines agree. */
    const cell = { minHeight: tap, justifyContent: 'center' };
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
                    react_native_1.StyleSheet.absoluteFill,
                    { backgroundColor: (0, state_v4_1.stateLayer)(theme, 'hover', tint), opacity: on },
                ] }), (0, jsx_runtime_1.jsx)(CheckboxV4_1.CheckboxV4, { checked: checked, onCheckedChange: onCheckedChange, invalid: invalid, disabled: disabled, accessibilityLabel: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: cell, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: label }) }), links.map((link, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: cell, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: separator }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "link", accessibilityLabel: link.label, disabled: disabled, onPress: () => onLinkPress?.(link.id), style: ({ pressed }) => ({
                                            ...cell,
                                            borderRadius: tokens.radius.sm,
                                            backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                                        }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "primaryText", children: link.label }) })] }, link.id)))] }), description !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: description })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [pressToToggle ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable
            // A touch convenience, not a second control: the `CheckboxV4` inside
            // is the thing a screen reader announces, and the links stay
            // individually reachable because this wrapper does not merge them.
            , { 
                // A touch convenience, not a second control: the `CheckboxV4` inside
                // is the thing a screen reader announces, and the links stay
                // individually reachable because this wrapper does not merge them.
                accessible: false, disabled: disabled, onPress: () => onCheckedChange?.(!checked), style: card, children: body })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: card, children: body })), error ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "dangerText", accessibilityRole: "alert", children: error })) : null] }));
}
//# sourceMappingURL=AuthTermsCardV4.js.map
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
exports.TextV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * The seven steps of the compiled type scale, as the preset's `fontSize` keys.
 * Identical to the base `Text` — the scale is the scale, and V4 is not allowed
 * to invent an eighth step.
 */
const SIZE_CLASS = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
};
/**
 * Leading, as a unitless ratio of the resolved font size.
 *
 * The base `Text` runs 1.5 for body, 1.375 at `lg` and 1.25 for everything
 * above — Tailwind's `leading-normal / snug / tight`, which are the framework's
 * ratios rather than this kit's. V4 opens the body end and closes the display
 * end, which is the whole difference between the reference onboarding screens
 * and what shipped: a paragraph of grey subhead at 1.5 reads dense on a phone,
 * and a 30px headline at 1.25 reads as two disconnected lines.
 *
 * Written as literal classes, not interpolated, because Tailwind's scanner is
 * static and cannot see a template string. Keep this table in step with
 * `LEADING_RATIO` in the native twin — the two are the same numbers.
 */
const LEADING_CLASS = {
    xs: 'leading-[1.5]',
    sm: 'leading-[1.55]',
    base: 'leading-[1.6]',
    lg: 'leading-[1.5]',
    xl: 'leading-[1.35]',
    '2xl': 'leading-[1.25]',
    '3xl': 'leading-[1.2]',
};
/**
 * Optical tracking, as a ratio of the em.
 *
 * One tracking across a 12→30px range is wrong at both ends. Caps and small
 * text lose the word-shape a reader scans by and want air; display sizes set
 * at the default tracking read loose and unresolved, which is a large part of
 * why the shipped headlines felt generic. The correction is the same one
 * `EyebrowV4` makes for the 12px step, generalised across the scale — and it
 * is an em ratio precisely so both twins land on the same width instead of
 * `0.22em` here and `2px` there.
 *
 * Keep in step with `TRACKING_RATIO` in the native twin.
 */
const TRACKING_CLASS = {
    xs: 'tracking-[0.01em]',
    sm: 'tracking-[0.005em]',
    base: 'tracking-[0em]',
    lg: 'tracking-[0em]',
    xl: 'tracking-[-0.01em]',
    '2xl': 'tracking-[-0.015em]',
    '3xl': 'tracking-[-0.02em]',
};
/**
 * Semantic slot → token class. Keyed by `TextTone` (which is
 * `keyof SemanticColors`) so a slot added to the compiler and forgotten here
 * is a type error, not a silently unstyled span.
 */
const TONE_CLASS = {
    surface: 'text-surface',
    onSurface: 'text-on-surface',
    primary: 'text-primary',
    onPrimary: 'text-on-primary',
    accent: 'text-accent',
    onAccent: 'text-on-accent',
    muted: 'text-muted',
    mutedText: 'text-muted-text',
    ring: 'text-ring',
    input: 'text-input',
    card: 'text-card',
    onCard: 'text-on-card',
    popover: 'text-popover',
    onPopover: 'text-on-popover',
    selected: 'text-selected',
    onSelected: 'text-on-selected',
    primaryText: 'text-primary-text',
    accentText: 'text-accent-text',
    successText: 'text-success-text',
    warnText: 'text-warn-text',
    dangerText: 'text-danger-text',
    border: 'text-border',
    success: 'text-success',
    onSuccess: 'text-on-success',
    warn: 'text-warn',
    onWarn: 'text-on-warn',
    danger: 'text-danger',
    onDanger: 'text-on-danger',
};
const WEIGHT_CLASS = {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
};
const ALIGN_CLASS = {
    auto: '',
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
};
/** The steps that read as display type rather than as copy. */
const DISPLAY_SIZES = ['xl', '2xl', '3xl'];
/**
 * The measure a run of copy is allowed to reach.
 *
 * `2xl × 7` off the spacing scale — the same expression `EmptyStateV4` and
 * `ResultV4` already compose, so the kit has one answer to "how wide is a
 * comfortable line" and a re-scaled seed re-scales it. `inline-block` comes
 * with it because a `max-width` on an inline span does nothing at all.
 */
const MEASURE_CLASS = 'inline-block max-w-[calc(var(--xen-space-2xl)*7)]';
/**
 * Balanced wrapping for display type. Written as an arbitrary property rather
 * than Tailwind 3.4's `text-balance` so it resolves on any JIT Tailwind a
 * consuming app happens to be on, and it degrades to normal wrapping in a
 * browser that does not implement it.
 */
const BALANCE_CLASS = '[text-wrap:balance]';
/** The house spelling, matching `StatisticV4` and `DataTableV4`. */
const TABULAR_CLASS = '[font-variant-numeric:tabular-nums]';
/**
 * **V4 text** — the web twin of the native `TextV4`, the base `Text`'s props
 * plus three, a different design line.
 *
 * This is the typographic foundation the whole auth/onboarding family reads
 * from, so it is the one component where getting the *defaults* right matters
 * more than what it can be told to do. Four changes, and nothing else.
 *
 * 1. **The face is bound.** The base `Text` sets no font family at all — the
 *    web twin inherits whatever the page happens to be in and the native twin
 *    falls through to the system font, so the same sentence is two typefaces
 *    across a product. That is the defect `LabelV4` documented for `Label`,
 *    and it is worse here because `Text` is where nearly all of a screen's
 *    type comes from. V4 binds it: display steps take the seed's heading face,
 *    copy takes its body face, and `face` overrides either way.
 * 2. **Copy gets air, display gets tightened.** See {@link LEADING_CLASS}. The
 *    "airy, generous" feel of the reference screens is almost entirely leading;
 *    the base was carrying Tailwind's named ratios, which are a framework's
 *    defaults rather than a decision.
 * 3. **Tracking is optical.** See {@link TRACKING_CLASS}. A 30px headline and a
 *    12px caption cannot share one tracking and both look deliberate.
 * 4. **Display type balances its wrap.** A headline that breaks with one
 *    orphan word on the second line is the single loudest "nobody set this"
 *    signal on an onboarding screen, and `text-wrap: balance` fixes it for
 *    free. Web only — React Native has no equivalent, exactly as the base's
 *    `-webkit-line-clamp` is web only.
 *
 * What V4 deliberately does **not** do is change `weight`. A `3xl` at the
 * default `regular` is thin, and it is tempting to bump it — but a component
 * that silently disobeys the weight it was handed is a worse bug than a
 * headline that needs `weight="bold"` (which is what §4 asks the caller for).
 *
 * There is no motion sheet and no state layer here on purpose. Text is not
 * interactive: `v4-motion` exists for a control changing state and `v4-state`
 * for a surface acknowledging a pointer, and a transition on every span in an
 * app would be decoration bought with a repaint (§7 — subtraction before
 * addition).
 *
 * Renders a `<span>` and forwards the rest of its props, so the DOM contract is
 * the base's. `numberOfLines` clamps to N lines with an ellipsis — the native
 * prop name, kept because prop parity beats platform idiom.
 */
exports.TextV4 = React.forwardRef(function TextV4({ size = 'base', tone = 'onSurface', weight = 'regular', align = 'auto', face = 'auto', measure = false, numeric = 'proportional', numberOfLines, className, style, children, ...rest }, ref) {
    const display = DISPLAY_SIZES.includes(size);
    const resolvedFace = face === 'auto' ? (display ? 'heading' : 'body') : face;
    // Line clamping has no token to violate — it is pure layout, so an inline
    // rule is fine here where a colour or a size would not be.
    const clamp = numberOfLines != null
        ? {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: numberOfLines,
            overflow: 'hidden',
        }
        : undefined;
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, "data-xen-v4-text": size, className: (0, cn_1.cn)(resolvedFace === 'heading' ? 'font-heading' : 'font-body', SIZE_CLASS[size], LEADING_CLASS[size], TRACKING_CLASS[size], TONE_CLASS[tone], WEIGHT_CLASS[weight], ALIGN_CLASS[align], display && BALANCE_CLASS, measure && MEASURE_CLASS, numeric === 'tabular' && TABULAR_CLASS, className), style: clamp ? { ...clamp, ...style } : style, ...rest, children: children }));
});
//# sourceMappingURL=TextV4.js.map
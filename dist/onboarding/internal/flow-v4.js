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
exports.FlowScreenV4 = exports.FLOW_STAGGER_CAP = exports.FLOW_V4_CSS = exports.FLOW_STAGGER = exports.FLOW_V4_STYLE_ID = void 0;
exports.flowGroundVars = flowGroundVars;
exports.flowRegion = flowRegion;
exports.FlowHeaderV4 = FlowHeaderV4;
exports.FlowHeroV4 = FlowHeroV4;
exports.FlowHeadlineV4 = FlowHeadlineV4;
exports.FlowLinkV4 = FlowLinkV4;
exports.FlowFooterV4 = FlowFooterV4;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * The spine of the **V4 onboarding line** (web) — the twin of
 * `native/onboarding/internal/flow-v4.tsx`, at prop parity with it.
 *
 * Same reasoning as the native file: `ONBOARDING-DESIGN-SPEC.md` §1 draws one
 * anatomy, the 0.9.0 pass wrote that anatomy out inside each screen, and eight
 * copies of a rule are eight chances to get it wrong. Here it is once.
 *
 * Where the two platforms differ, they differ the way the rest of the kit
 * already does: the tints are `color-mix()` over the `--xen-*` custom
 * properties rather than hex arithmetic (so they follow `[data-theme="dark"]`
 * with no dark rule of their own), navigation is `onClick`, and the entrance is
 * a keyframe injected once instead of an `Animated.Value`.
 *
 * Nothing here is exported from the package.
 */
const React = __importStar(require("react"));
const cn_1 = require("../../primitives/cn");
const IconV4_1 = require("../../primitives/IconV4");
const TextV4_1 = require("../../primitives/TextV4");
const AuthStickyFooterV4_1 = require("../../primitives/AuthStickyFooterV4");
const chrome_v4_1 = require("../../primitives/internal/chrome-v4");
const inject_1 = require("../../motion/internal/inject");
const compile_1 = require("../../theme/compile");
/* ────────────────────────────────────────────────────────────────────────
   Grounds
   ──────────────────────────────────────────────────────────────────────── */
/**
 * How far each tint travels from the page toward the brand. Low on purpose: a
 * tint that reads as a *colour* competes with the CTA, which is the one thing
 * on the screen allowed to be loud. Identical to the native twin's numbers.
 */
const PAGE_TINT = 5;
const PANEL_TINT = 12;
const BADGE_TINT = 16;
/**
 * Resolve a screen's grounds as CSS custom properties on its root.
 *
 * `color-mix()` over the semantic variables rather than a `--xen-primary-50`
 * ramp step, for the same reason the native twin mixes rather than ramps: the
 * ramps carry the light orientation, so `primary-50` is a near-white panel on
 * a dark page. A mix of `surface` and `primary` is correct in both schemes
 * with no dark rule, because both sides of the mix have already inverted.
 */
function flowGroundVars(ground = 'plain', accent = 'primary') {
    const fill = accent === 'accent' ? 'var(--xen-accent)' : 'var(--xen-primary)';
    const onFill = accent === 'accent' ? 'var(--xen-on-accent)' : 'var(--xen-on-primary)';
    const ink = accent === 'accent' ? 'var(--xen-accent-text)' : 'var(--xen-primary-text)';
    const page = ground === 'tinted'
        ? `color-mix(in srgb, ${fill} ${PAGE_TINT}%, var(--xen-surface))`
        : 'var(--xen-surface)';
    return {
        '--flow-page': page,
        '--flow-hero': ground === 'brand' ? fill : `color-mix(in srgb, ${fill} ${PANEL_TINT}%, ${page})`,
        '--flow-on-hero': ground === 'brand' ? onFill : ink,
        '--flow-badge': `color-mix(in srgb, ${fill} ${BADGE_TINT}%, ${page})`,
        '--flow-fill': fill,
        '--flow-on-fill': onFill,
        '--flow-ink': ink,
    };
}
/* ────────────────────────────────────────────────────────────────────────
   Entrance
   ──────────────────────────────────────────────────────────────────────── */
/** The `<style>` id the line's entrance shares. Injection is idempotent. */
exports.FLOW_V4_STYLE_ID = 'xen-v4-onboarding-flow';
/** How far apart the body's regions arrive, in ms (brief §8). */
exports.FLOW_STAGGER = 60;
/**
 * The line's one entrance: a short fade-and-rise on the M3 `enter` duration.
 *
 * `prefers-reduced-motion` removes it entirely rather than shortening it — a
 * user who asked for less motion asked for less motion, not for the same
 * motion hurried. The rule sets the final state so nothing is left invisible.
 */
exports.FLOW_V4_CSS = `
@keyframes xen-flow-rise {
  from { opacity: 0; transform: translateY(var(--xen-space-md)); }
  to   { opacity: 1; transform: none; }
}
[data-xen-flow-region] {
  animation: xen-flow-rise ${compile_1.MOTION.enter}ms ${chrome_v4_1.EASE_ENTER} both;
  animation-delay: calc(var(--flow-region, 0) * ${exports.FLOW_STAGGER}ms);
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-flow-region] { animation: none; opacity: 1; transform: none; }
}
`;
/**
 * How many regions the entrance staggers before every later one arrives at
 * once. Three is where a stagger stops reading as choreography and starts
 * reading as a slow screen.
 */
exports.FLOW_STAGGER_CAP = 3;
/** Mark a subtree as one staggered region of the entrance. */
function flowRegion(index) {
    return {
        'data-xen-flow-region': '',
        style: { ['--flow-region']: Math.min(index, exports.FLOW_STAGGER_CAP) },
    };
}
/* ────────────────────────────────────────────────────────────────────────
   Header
   ──────────────────────────────────────────────────────────────────────── */
/** A header control — 44×44 whatever the glyph, with the chrome state layer. */
function HeaderControl({ label, icon, onClick, tone, }) {
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('flex w-11 shrink-0 items-center justify-center rounded-full', chrome_v4_1.MIN_TAP_CLASS, tone), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: icon, size: "lg" }) }));
}
/**
 * The header row from §1: back · progress · dismiss, each optional, each a
 * 44×44 tap target, with **spacers** where a control is absent so the progress
 * bars do not shift the moment one appears.
 *
 * Renders nothing when all three slots are empty (§10.6).
 */
function FlowHeaderV4({ onBack, onDismiss, progress, }) {
    if (!onBack && !onDismiss && !progress)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 items-center gap-md px-lg pt-md", children: [onBack ? ((0, jsx_runtime_1.jsx)(HeaderControl, { label: "Go back", icon: "chevron-left", onClick: onBack, tone: "text-on-surface" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('w-11 shrink-0', chrome_v4_1.MIN_TAP_CLASS) })), (0, jsx_runtime_1.jsx)("div", { className: "min-w-0 flex-1", children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)(HeaderControl, { label: "Dismiss", icon: "close", onClick: onDismiss, tone: "text-muted-text" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('w-11 shrink-0', chrome_v4_1.MIN_TAP_CLASS) }))] }));
}
/**
 * The hero slot (§3): a tinted 4:3 panel capped at 38% of the viewport,
 * holding the caller's artwork — or, when there is none, the brand medallion
 * at hero size. **Never empty space.**
 */
function FlowHeroV4({ illustration, logoGlyph, show = true, }) {
    if (!show)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex aspect-[4/3] max-h-[38vh] w-full items-center justify-center overflow-hidden', 'rounded-[var(--xen-radius-lg)] bg-[var(--flow-hero)]'), children: illustration ?? (
        // A ratio of the panel, not a fixed 96: the panel is already
        // viewport-relative, so a pinned size looks right on one screen only.
        (0, jsx_runtime_1.jsx)("span", { className: "flex h-[13%] min-h-16 w-auto min-w-16 items-center justify-center rounded-full bg-[var(--flow-fill)] p-md text-[var(--flow-on-fill)]", children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: logoGlyph ?? '✦', size: "3xl" }) })) }));
}
/**
 * The headline block (§4): `2xl` bold over a muted value line held to a
 * readable measure.
 *
 * The subhead takes `muted-text`, not `muted`. `muted` is a ramp step with no
 * contrast promise against `surface`, and it is the token every 0.9.0 screen
 * reached for.
 */
function FlowHeadlineV4({ title, subtitle, align = 'center', }) {
    if (!title && !subtitle)
        return null;
    const centered = align === 'center';
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-full flex-col gap-sm', centered ? 'items-center' : 'items-start'), children: [title ? ((0, jsx_runtime_1.jsx)("h2", { className: (0, cn_1.cn)('font-heading text-2xl font-bold leading-tight text-on-surface', centered ? 'text-center' : 'text-left'), children: title })) : null, subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", align: centered ? 'center' : 'left', measure: true, className: centered ? 'mx-auto' : undefined, children: subtitle })) : null] }));
}
/**
 * A footer text link.
 *
 * **Underlined**, which is the whole point. §31 asks for familiar
 * interactions, and a centred un-underlined label under a filled button is
 * indistinguishable from a caption — the 0.9.0 footers rendered "No thanks,
 * start my free trial" as muted text and users read it as fine print.
 */
function FlowLinkV4({ label, onClick, emphasis = 'secondary', disabled = false, }) {
    if (!label)
        return null;
    const secondary = emphasis === 'secondary';
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, disabled: disabled, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('flex w-full items-center justify-center rounded-[var(--xen-radius-md)] underline', chrome_v4_1.MIN_TAP_CLASS, secondary
            ? 'text-base font-semibold text-on-surface'
            : 'text-sm font-medium text-muted-text'), children: label }));
}
/**
 * The footer stack from brief §4, in a fixed order so it cannot drift between
 * screens: footnote · reassurance · CTA · secondary · tertiary · legal.
 *
 * Built on `AuthStickyFooterV4`, which already pins the band and pays the
 * inset. Renders nothing when every slot is empty.
 */
function FlowFooterV4({ children, reassurance, reassuranceIcon = 'success', secondaryLabel, onSecondary, tertiaryLabel, onTertiary, legalLinks, onLegalLinkClick, footnote, safeArea = true, className, }) {
    const hasCta = React.Children.toArray(children).length > 0;
    const legal = legalLinks?.filter((link) => link.label) ?? [];
    if (!hasCta && !secondaryLabel && !tertiaryLabel && !reassurance && legal.length === 0) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(AuthStickyFooterV4_1.AuthStickyFooterV4, { safeArea: safeArea, className: className, children: [footnote ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", children: footnote })) : null, reassurance ? ((0, jsx_runtime_1.jsxs)("p", { className: "flex items-center justify-center gap-sm text-sm font-semibold text-on-surface", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: reassuranceIcon, size: "base", className: "text-success-text" }), reassurance] })) : null, children, secondaryLabel ? ((0, jsx_runtime_1.jsx)(FlowLinkV4, { label: secondaryLabel, onClick: onSecondary, emphasis: "secondary" })) : null, tertiaryLabel ? ((0, jsx_runtime_1.jsx)(FlowLinkV4, { label: tertiaryLabel, onClick: onTertiary, emphasis: "tertiary" })) : null, legal.length > 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "flex items-center justify-center gap-sm text-xs text-muted-text", children: legal.map((link, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: "\u00B7" }) : null, (0, jsx_runtime_1.jsx)("button", { type: "button", className: "underline", onClick: onLegalLinkClick ? () => onLegalLinkClick(link.id) : undefined, children: link.label })] }, link.id))) })) : null] }));
}
/**
 * The scroll/pin shell (brief §3) — the structural fix of this whole pass.
 *
 * Every 0.9.0 screen laid its body out as one flex column and centred it. That
 * is correct for a welcome screen and broken for a paywall: four feature rows
 * plus a plan card plus fine print does not fit a small viewport, and the
 * overflow was simply not reachable.
 *
 * `min-h-0` on the scrolling child is the part that is easy to get wrong: a
 * flex item defaults to `min-height: auto`, so without it the body grows to
 * its content and the page scrolls instead of the region — which un-pins the
 * footer.
 */
exports.FlowScreenV4 = React.forwardRef(function FlowScreenV4({ ground = 'plain', accent = 'primary', header, children, footer, center = true, className, style, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.FLOW_V4_STYLE_ID, exports.FLOW_V4_CSS);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-flow": "", style: { ...flowGroundVars(ground, accent), ...style }, className: (0, cn_1.cn)('flex min-h-full flex-col bg-[var(--flow-page)]', className), ...rest, children: [header, (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex min-h-0 flex-1 flex-col items-center gap-lg overflow-y-auto px-lg py-lg', center ? 'justify-center' : 'justify-start'), children: children }), footer] }));
});
//# sourceMappingURL=flow-v4.js.map
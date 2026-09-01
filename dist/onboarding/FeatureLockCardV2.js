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
exports.FeatureLockCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
/**
 * Locked feature — V2, the editorial line: a **banner** on the brand fill,
 * with the plan ribbon over it and the CTA as a light button on the colour.
 *
 * The base is a quiet card that says "this is locked". This one is an
 * advertisement: it is the loudest thing on whatever screen it lands on, which
 * is right when the gate IS the screen — an empty state, a feature the user
 * just tried to open — and wrong in a list, which is what V3 is for.
 *
 * The copy is `on-primary` throughout rather than `on-surface`, so the contrast
 * promise is the one the compiler actually made about this fill; the CTA
 * inverts to a `surface` fill with `primary-text` on it, which is the only
 * shape that stays legible on a saturated band.
 *
 * `variant="inline"` is accepted and ignored: an inline banner is a
 * contradiction, and an app that wants a compact row wants V3.
 *
 * Same props as {@link FeatureLockCard}. Token-pure.
 */
exports.FeatureLockCardV2 = React.forwardRef(function FeatureLockCardV2({ title, description, icon = '🔒', planLabel = 'Pro', unlockLabel = 'Unlock', onUnlock, className, ...rest }, ref) {
    if (!title)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md rounded-[var(--xen-radius-lg)] bg-primary p-lg', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-label": "Locked", className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--xen-radius-lg)] bg-surface", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, size: "2xl" }) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [planLabel ? ((0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "neutral", size: "sm", children: planLabel }) })) : null, (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "lg", weight: "bold", tone: "onPrimary", children: title })] })] }), description ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "onPrimary", className: "opacity-90", children: description })) : null, (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "secondary", size: "md", onClick: onUnlock, "aria-label": unlockLabel, className: "w-full bg-surface text-primary-text", children: unlockLabel })] }));
});
//# sourceMappingURL=FeatureLockCardV2.js.map
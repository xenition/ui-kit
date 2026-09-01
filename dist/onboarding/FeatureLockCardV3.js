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
exports.FeatureLockCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
/**
 * Locked feature — V3, the compact line: **one row, the whole row is the
 * button**, ending in a chevron. No card, no badge circle, no separate CTA.
 *
 * The shape a settings list or a feature index needs. The base and V2 both put
 * a button inside a container, which means a list of eight gated features is a
 * list of eight buttons — and a user scanning it has to aim at a small target
 * inside a big one. Here the row is the target, which is how every other list
 * row in the kit behaves (§31: use the familiar interaction).
 *
 * `unlockLabel` moves to the row's accessible name rather than being drawn: the
 * chevron already says "this goes somewhere", and a visible "Unlock" beside it
 * would be the second affordance for one action.
 *
 * `variant` is accepted and ignored — this line is the compact row.
 *
 * Same props as {@link FeatureLockCard}. Token-pure.
 */
exports.FeatureLockCardV3 = React.forwardRef(function FeatureLockCardV3({ title, description, icon = '🔒', planLabel = 'Pro', unlockLabel = 'Unlock', onUnlock, className, 
// The base's props type is a `<div>`'s; the compact line's root is the
// button itself, so the DOM attributes are not forwarded here rather
// than being spread onto an element that cannot take them.
...rest }, ref) {
    void rest;
    if (!title)
        return null;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": `${title}, ${planLabel}. ${unlockLabel}`, onClick: onUnlock, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('flex min-h-11 w-full items-center gap-md rounded-[var(--xen-radius-md)] px-md py-sm text-left', className), children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, size: "lg" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: "semibold", tone: "onSurface", children: title }), description ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "xs", tone: "mutedText", numberOfLines: 1, children: description })) : null] }), planLabel ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "xs", weight: "bold", tone: "primaryText", children: planLabel })) : null, (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "chevron-right", size: "lg", color: "muted" })] }));
});
//# sourceMappingURL=FeatureLockCardV3.js.map
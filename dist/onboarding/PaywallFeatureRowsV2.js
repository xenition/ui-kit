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
exports.PaywallFeatureRowsV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
const icon_names_1 = require("../primitives/icon-names");
/**
 * Feature rows — V2, the editorial line: **tiles, not a list**. Each benefit
 * gets its own card with a large glyph plate above the copy, and the cards
 * stack full-width.
 *
 * The idea: a list says "here are four facts"; tiles say "here are four
 * things". On the screen where the value proposition IS the product — a
 * welcome-offer, a first paywall — the extra weight per row is the point, and
 * a rail joining four cards would fight the separation the cards already have.
 *
 * `rail` is therefore accepted and ignored. `dense` still tightens the stack.
 *
 * Same props as {@link PaywallFeatureRows}. Renders nothing for an empty list.
 * Token-pure.
 */
exports.PaywallFeatureRowsV2 = React.forwardRef(function PaywallFeatureRowsV2({ rows, heading, dense = false, className, ...rest }, ref) {
    const list = rows?.filter((row) => row.title) ?? [];
    if (list.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full flex-col', dense ? 'gap-sm' : 'gap-md', className), ...rest, children: [heading ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "semibold", tone: "mutedText", children: heading })) : null, (0, jsx_runtime_1.jsx)("ul", { className: (0, cn_1.cn)('flex flex-col', dense ? 'gap-sm' : 'gap-md'), children: list.map((row) => {
                    const glyph = row.icon;
                    return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(Card_1.Card, { className: "flex flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-14 w-14 items-center justify-center rounded-[var(--xen-radius-lg)] bg-primary-50", children: glyph && (0, icon_names_1.isIconName)(glyph) ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: glyph, size: "2xl", color: "primary" })) : ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph ?? '✦', size: "2xl", color: "primary" })) }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "lg", weight: "bold", tone: "onSurface", children: row.title }), row.description ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "mutedText", children: row.description })) : null] }) }, row.id ?? row.title));
                }) })] }));
});
//# sourceMappingURL=PaywallFeatureRowsV2.js.map
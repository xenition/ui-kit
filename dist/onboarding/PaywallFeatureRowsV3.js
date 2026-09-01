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
exports.PaywallFeatureRowsV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
/**
 * Feature rows — V3, the compact line: **a checklist**. One `✓` per row in the
 * success tone, the title inline beside it, the description folded onto the
 * same block at caption size.
 *
 * Where it earns its place: the confirmation half of a flow — a plan card with
 * "what's included" under it, a sheet, the second half of a screen whose hero
 * already spent the vertical budget. Six benefits as §8 rows is a scroll; six
 * as a checklist is a paragraph.
 *
 * `rail` is accepted and ignored — a rail is what makes badges read as one
 * list, and a checklist already reads as one. The row's glyph is ignored too:
 * a checklist's mark is the check, and letting each row bring its own turns
 * the column of ticks back into the icon list this line exists to compress.
 *
 * Same props as {@link PaywallFeatureRows}. Renders nothing for an empty list.
 * Token-pure.
 */
exports.PaywallFeatureRowsV3 = React.forwardRef(function PaywallFeatureRowsV3({ rows, heading, dense = false, className, ...rest }, ref) {
    const list = rows?.filter((row) => row.title) ?? [];
    if (list.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full flex-col', dense ? 'gap-xs' : 'gap-sm', className), ...rest, children: [heading ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "semibold", tone: "mutedText", children: heading })) : null, (0, jsx_runtime_1.jsx)("ul", { className: (0, cn_1.cn)('flex flex-col', dense ? 'gap-xs' : 'gap-sm'), children: list.map((row) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-start gap-sm", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "check", size: "base", color: "success" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: "semibold", tone: "onSurface", children: row.title }), row.description ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "xs", tone: "mutedText", children: row.description })) : null] })] }, row.id ?? row.title))) })] }));
});
//# sourceMappingURL=PaywallFeatureRowsV3.js.map
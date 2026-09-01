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
exports.DaySegment = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * DaySegment — a segmented pill selector on the page surface (web parity of the
 * native `DaySegment`). An inline pill-shaped, bordered `surface` track holding
 * one `role="tab"` button per option; the selected tab fills with `primary` and
 * flips its text to `on-primary`, the rest read as `on-surface`. Every color
 * comes from `--xen-*` Tailwind classes, no literals.
 */
exports.DaySegment = React.forwardRef(function DaySegment({ options, selectedIndex, onSelect, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('inline-flex rounded-full border border-border bg-surface p-1', className), ...rest, children: options.map((option, index) => {
            const selected = index === selectedIndex;
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "tab", "aria-selected": selected, onClick: () => onSelect(index), className: (0, cn_1.cn)('rounded-full px-4 py-2 text-sm', selected ? 'bg-primary text-on-primary font-bold' : 'text-on-surface font-semibold'), children: option }, `${option}-${index}`));
        }) }));
});
//# sourceMappingURL=DaySegment.js.map
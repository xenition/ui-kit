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
exports.FilterChips = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
function normalize(o) {
    return typeof o === 'string' ? { value: o, label: o } : o;
}
/**
 * A row of selectable filter chips (single- or multi-select). The selected
 * chip(s) fill with the `primary` token. Token-only; wraps by default, or lays
 * out in a horizontal scroller when `scroll` is set.
 */
exports.FilterChips = React.forwardRef(function FilterChips({ options, selected, onChange, multi = false, scroll = false, className, ...rest }, ref) {
    const selectedList = Array.isArray(selected) ? selected : [selected];
    const toggle = (value) => {
        if (multi) {
            const set = new Set(selectedList);
            if (set.has(value))
                set.delete(value);
            else
                set.add(value);
            onChange(Array.from(set));
        }
        else {
            onChange(value);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "group", className: (0, cn_1.cn)('flex gap-sm', scroll ? 'overflow-x-auto pr-md' : 'flex-wrap', className), ...rest, children: options.map(normalize).map((opt) => {
            const active = selectedList.includes(opt.value);
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": active, onClick: () => toggle(opt.value), className: (0, cn_1.cn)('shrink-0 rounded-full border px-md py-xs text-sm transition-colors', active
                    ? 'border-primary bg-primary font-semibold text-on-primary'
                    : 'border-border bg-surface font-medium text-on-surface hover:bg-neutral-100'), children: opt.label }, opt.value));
        }) }));
});
//# sourceMappingURL=FilterChips.js.map
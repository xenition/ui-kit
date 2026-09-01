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
exports.DateSeparatorV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * **V4 date separator** — the web twin of the native `DateSeparatorV4`, same
 * props as {@link DateSeparator}.
 *
 * ## Two changes
 *
 * 1. **It is a heading, not a caption.** A date separator is the only landmark
 *    in a long thread; marking it a heading is what lets a screen reader jump
 *    between days instead of scrolling through every message.
 * 2. **The pill takes the card ground and `muted-text`**, where the base used
 *    `surface` — the same colour as the page behind it — so the chip read as
 *    floating text rather than a marker.
 */
exports.DateSeparatorV4 = React.forwardRef(function DateSeparatorV4({ label, className, ...rest }, ref) {
    if (!label)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-date-separator": "", className: (0, cn_1.cn)('flex justify-center py-sm', className), ...rest, children: (0, jsx_runtime_1.jsx)("h3", { className: "rounded-full border border-border bg-card px-md py-xs text-xs font-semibold text-muted-text", children: label }) }));
});
//# sourceMappingURL=DateSeparatorV4.js.map
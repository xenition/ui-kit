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
exports.DoctorCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const AVAIL_DOT = { available: 'bg-success', busy: 'bg-warn', off: 'bg-neutral-400' };
const AVAIL_LABEL = { available: 'Available', busy: 'Busy', off: 'Off' };
/**
 * DoctorCard, redesigned (v3): a **compact directory row**. A small avatar, the
 * name over a specialty·credentials line, a small rating, an availability dot +
 * word (never color alone), and a quiet Book button on the trailing edge —
 * hairline-bordered for provider lists. The opposite of v2's banner. Same props,
 * token-only.
 */
exports.DoctorCardV3 = React.forwardRef(function DoctorCardV3({ name, specialty, avatar, rating, reviewCount, credentials, availability, onBook, bookLabel, className, ...rest }, ref) {
    void reviewCount;
    const sub = [specialty, credentials].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-doctor-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1.5", children: [typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }) : null, sub.length > 0 ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: sub.join(' · ') }) : null] })] }), availability ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1 text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-block h-2 w-2 rounded-full', AVAIL_DOT[availability]), "aria-hidden": true }), AVAIL_LABEL[availability]] })) : null, onBook ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", disabled: availability === 'off', onClick: onBook, children: bookLabel ?? 'Book' })) : null] }));
});
//# sourceMappingURL=DoctorCardV3.js.map
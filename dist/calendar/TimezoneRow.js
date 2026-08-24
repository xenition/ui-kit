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
exports.TimezoneRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
function prettifyZone(id) {
    const tail = id.split('/').slice(-1)[0] ?? id;
    return tail.replace(/_/g, ' ');
}
/**
 * A timezone display/select row for an event form. `row` renders a tappable
 * settings line (globe icon, title, current zone, chevron) that hands off to a
 * host-owned picker; `inline` is a static caption. No date math is done here —
 * offset text is passed in. Token colors only.
 */
exports.TimezoneRow = React.forwardRef(function TimezoneRow({ timezone, label, offsetLabel, title = 'Time zone', variant = 'row', onPress, className, ...rest }, ref) {
    const zoneLabel = label ?? prettifyZone(timezone);
    if (variant === 'inline') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF10", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-1 text-sm text-muted", children: offsetLabel ? `${zoneLabel} · ${offsetLabel}` : zoneLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": `${title}: ${zoneLabel}${offsetLabel ? `, ${offsetLabel}` : ''}`, onClick: onPress, className: (0, cn_1.cn)('flex w-full items-center py-2 text-left transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-[var(--xen-radius-sm)]', className), children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF10", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-base font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: zoneLabel }), offsetLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: offsetLabel }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "ml-1 text-base text-muted", children: "\u203A" })] }));
});
//# sourceMappingURL=TimezoneRow.js.map
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
exports.ServiceStatusV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * ServiceStatus, redesigned (v3): a **compact inline chip line**. A state dot +
 * utility glyph lead, the line label and a soft state badge sit together, and the
 * location / "updated" caption trails muted on the right — a single scannable row
 * with no card. Distinct at a glance from v1's rail card and v2's banner. Same
 * props; state is dot + glyph + label (never color alone); token-pure.
 */
exports.ServiceStatusV3 = React.forwardRef(function ServiceStatusV3({ kind, state, location, updated, detail: _detail, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const sd = (0, status_1.serviceState)(state);
    const slot = (0, format_1.tintSlot)(sd.tone);
    const trailing = [location, updated != null ? `Updated ${updated}` : undefined]
        .filter((s) => s != null)
        .join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2 w-2 shrink-0 rounded-full', format_1.SOLID_TINT[slot]), "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: kd.glyph, size: "sm", "aria-label": `${kd.label} service` }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: kd.label }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` }), trailing !== '' ? ((0, jsx_runtime_1.jsx)("span", { className: "ml-auto min-w-0 shrink truncate text-xs text-muted", children: trailing })) : null] }));
});
//# sourceMappingURL=ServiceStatusV3.js.map
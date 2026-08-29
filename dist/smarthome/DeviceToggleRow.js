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
exports.DeviceToggleRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Switch_1 = require("../primitives/Switch");
/**
 * A compact list row with a trailing on/off {@link Switch} — the building block
 * of {@link RoomGroup}. Renders a glyph, label, and optional subtitle; when
 * `offline` the switch is disabled and the subtitle is replaced by a muted
 * "Offline" note so unreachability is textual, not color-only. A hairline
 * `border` divider separates rows unless `last`. Token-bound throughout (no
 * literal colors).
 */
exports.DeviceToggleRow = React.forwardRef(function DeviceToggleRow({ label, icon, subtitle, checked = false, offline = false, onCheckedChange, onChange, last = false, className, style, }, ref) {
    const secondary = offline ? 'Offline' : subtitle;
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onCheckedChange ?? onChange;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', !last && 'border-b border-border', offline && 'opacity-70', className), children: [icon != null ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: checked && !offline ? 'primary' : 'muted', size: "lg" }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-medium text-on-surface", children: label }), secondary != null ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: secondary }) : null] }), (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: checked, disabled: offline, onCheckedChange: emit, "aria-label": label })] }));
});
//# sourceMappingURL=DeviceToggleRow.js.map
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
exports.ToggleGroup = ToggleGroup;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * Segmented toggle group — a row of connected buttons that toggle on/off. Single
 * mode is deselectable; `multiple` mode lets several be active at once (value
 * becomes a `string[]`). Web parity of the native `ToggleGroup`; active options
 * fill with `primary`/`on-primary`. No literal colors (kit lint rule).
 */
function ToggleGroup({ options, value, onChange, multiple = false, disabled = false, accessibilityLabel, className, }) {
    const selected = React.useMemo(() => {
        if (multiple)
            return Array.isArray(value) ? value : [];
        return typeof value === 'string' && value ? [value] : [];
    }, [value, multiple]);
    const toggle = (v) => {
        if (multiple) {
            const set = new Set(selected);
            if (set.has(v))
                set.delete(v);
            else
                set.add(v);
            onChange?.(Array.from(set));
        }
        else {
            onChange?.(selected[0] === v ? '' : v);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { role: "group", "aria-label": accessibilityLabel, className: (0, cn_1.cn)('inline-flex overflow-hidden border border-border rounded-[var(--xen-radius-md)]', disabled && 'pointer-events-none opacity-50', className), children: options.map((opt, i) => {
            const active = selected.includes(opt.value);
            const itemDisabled = disabled || opt.disabled;
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: multiple ? 'checkbox' : 'radio', "aria-checked": active, "aria-label": opt.label, disabled: itemDisabled, onClick: () => toggle(opt.value), className: (0, cn_1.cn)('px-md py-sm text-sm transition-colors', i > 0 && 'border-l border-border', 'disabled:pointer-events-none disabled:opacity-50', active
                    ? 'bg-primary font-bold text-on-primary'
                    : 'bg-surface font-medium text-on-surface hover:bg-neutral-100'), children: opt.label }, opt.value));
        }) }));
}
//# sourceMappingURL=ToggleGroup.js.map
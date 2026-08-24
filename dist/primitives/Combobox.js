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
exports.Combobox = Combobox;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const useDismiss_1 = require("./useDismiss");
/** Searchable single-select (typeahead) bound to the theme tokens. */
function Combobox({ options, value, onChange, placeholder = 'Search…', className, }) {
    const [query, setQuery] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    const selected = options.find((o) => o.value === value);
    const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative', className), children: [(0, jsx_runtime_1.jsx)("input", { value: open ? query : selected?.label ?? '', onChange: (e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                }, onFocus: () => setOpen(true), placeholder: placeholder, className: "w-full rounded-[var(--xen-radius-sm)] border border-border bg-surface px-3 py-2 text-base text-on-surface placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" }), open && ((0, jsx_runtime_1.jsx)("div", { className: "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-[var(--xen-radius-md)] border border-border bg-surface py-1 shadow-lg", children: filtered.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "px-3 py-2 text-sm text-muted", children: "No matches" })) : (filtered.map((o) => ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                        onChange(o.value);
                        setQuery('');
                        setOpen(false);
                    }, className: (0, cn_1.cn)('block w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-neutral-100', o.value === value ? 'font-medium text-primary' : 'text-on-surface'), children: o.label }, o.value)))) }))] }));
}
//# sourceMappingURL=Combobox.js.map
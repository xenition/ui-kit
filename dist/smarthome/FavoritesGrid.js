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
exports.FavoritesGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const DeviceTileV4_1 = require("./DeviceTileV4");
const COL_CLASS = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};
/**
 * FavoritesGrid — **V4** "ambient" quick-control grid. A responsive grid of
 * favorite devices, each rendered as a glowing {@link DeviceTileV4} so active
 * devices light up while idle ones stay calm. Wraps to a single column on
 * narrow widths. Exposed as a `list` with each tile a `listitem` for
 * assistive tech; presentational only (data + the tiles' own callbacks). All
 * colors come from the reused tile and `--xen-*` token classes (no literals);
 * dark-mode safe.
 */
exports.FavoritesGrid = React.forwardRef(function FavoritesGrid({ devices, title = 'Favorites', columns = 2, emptyLabel = 'No favorites yet', className, style, ...rest }, ref) {
    const list = Array.isArray(devices) ? devices : [];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [title != null ? ((0, jsx_runtime_1.jsx)("p", { className: "px-[var(--xen-space-xs)] text-sm font-bold uppercase tracking-wide text-muted", children: title })) : null, list.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "rounded-[var(--xen-radius-lg)] border border-dashed border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-lg)] text-center text-sm text-muted", children: emptyLabel })) : ((0, jsx_runtime_1.jsx)("ul", { role: "list", "aria-label": typeof title === 'string' ? title : 'Favorites', className: (0, cn_1.cn)('grid gap-[var(--xen-space-sm)]', COL_CLASS[columns]), children: list.map((device, i) => {
                    const { id, ...tile } = device;
                    return ((0, jsx_runtime_1.jsx)("li", { role: "listitem", children: (0, jsx_runtime_1.jsx)(DeviceTileV4_1.DeviceTileV4, { ...tile }) }, id ?? `${device.name}-${i}`));
                }) }))] }));
});
//# sourceMappingURL=FavoritesGrid.js.map
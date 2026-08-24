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
exports.QueueList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const PlaylistRow_1 = require("./PlaylistRow");
/**
 * The playback **queue** (web) — an ordered list of upcoming tracks built from
 * {@link PlaylistRow}s. The row matching `nowPlayingId` is marked active;
 * `onSelect(track, index)` jumps to a track and `onRemove` handles the row
 * overflow. When `tracks` is empty it renders an `EmptyState` (from `commerce`)
 * instead of a bare list. Indexing is guarded — the active match is by id, never
 * by position. Token-only — no literal hex.
 */
exports.QueueList = React.forwardRef(function QueueList({ tracks, nowPlayingId, state = 'paused', title = 'Up Next', rowVariant = 'standard', onSelect, onRemove, emptyLabel = 'Your queue is empty', className, ...rest }, ref) {
    if (tracks.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-queue-list": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFB5", size: "2xl", color: "muted", "aria-label": "Queue" }), title: emptyLabel, description: "Add songs to build up your queue." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-queue-list": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', className), ...rest, children: [title ? ((0, jsx_runtime_1.jsx)("p", { className: "mb-[var(--xen-space-xs)] px-[var(--xen-space-sm)] text-xs font-bold uppercase tracking-wide text-muted", children: title })) : null, tracks.map((track, index) => ((0, jsx_runtime_1.jsx)(PlaylistRow_1.PlaylistRow, { track: track, index: index, variant: rowVariant, active: nowPlayingId != null && track.id === nowPlayingId, state: state, onClick: onSelect ? (t, i) => onSelect(t, i ?? index) : undefined, onMore: onRemove ? () => onRemove(track, index) : undefined }, track.id)))] }));
});
//# sourceMappingURL=QueueList.js.map
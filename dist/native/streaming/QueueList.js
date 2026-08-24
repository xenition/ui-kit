"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueList = QueueList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const PlaylistRow_1 = require("./PlaylistRow");
/**
 * The playback **queue** — an ordered list of upcoming tracks built from
 * {@link PlaylistRow}s. The row matching `nowPlayingId` is marked active;
 * `onSelect(track, index)` jumps to a track and `onRemove` handles the row
 * overflow. When `tracks` is empty it renders an `EmptyState` instead of a bare
 * list. Indexing is guarded — the active match is by id, never by position.
 * Token-only — no literal hex.
 */
function QueueList({ tracks, nowPlayingId, state = 'paused', title = 'Up Next', rowVariant = 'standard', onSelect, onRemove, emptyLabel = 'Your queue is empty', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (tracks.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFB5", size: "2xl", color: "muted", accessibilityLabel: "Queue" }), title: emptyLabel, description: "Add songs to build up your queue." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    paddingHorizontal: tokens.spacing.sm,
                    marginBottom: tokens.spacing.xs,
                }, children: title })) : null, tracks.map((track, index) => ((0, jsx_runtime_1.jsx)(PlaylistRow_1.PlaylistRow, { track: track, index: index, variant: rowVariant, active: nowPlayingId != null && track.id === nowPlayingId, state: state, onPress: onSelect ? (t, i) => onSelect(t, i ?? index) : undefined, onMore: onRemove ? () => onRemove(track, index) : undefined }, track.id)))] }));
}
//# sourceMappingURL=QueueList.js.map
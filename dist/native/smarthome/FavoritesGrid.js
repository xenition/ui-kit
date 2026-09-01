"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesGrid = FavoritesGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const DeviceTileV4_1 = require("./DeviceTileV4");
/**
 * FavoritesGrid — **V4** "ambient" quick-control grid. A responsive grid of
 * favorite devices, each rendered as a glowing {@link DeviceTileV4} so active
 * devices light up while idle ones stay calm. Tiles wrap across `columns`.
 * Exposed as a `list` for assistive tech; presentational only (data + the
 * tiles' own callbacks). Token-only colors via `useXenitionTheme()` and the
 * reused tile; dark-mode safe.
 */
function FavoritesGrid({ devices, title = 'Favorites', columns = 2, emptyLabel = 'No favorites yet', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = Array.isArray(devices) ? devices : [];
    const cols = Math.min(4, Math.max(1, columns));
    // Column width as a percentage, leaving room for the inter-tile gap.
    const basisPct = 100 / cols - (cols > 1 ? 2 : 0);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [title != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    paddingHorizontal: tokens.spacing.xs,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    color: colors.muted,
                }, children: title })) : null, list.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.lg,
                    alignItems: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: colors.muted }, children: emptyLabel }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: typeof title === 'string' ? title : 'Favorites', style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: list.map((device, i) => {
                    const { id, ...tile } = device;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexGrow: 1, flexBasis: `${basisPct}%` }, children: (0, jsx_runtime_1.jsx)(DeviceTileV4_1.DeviceTileV4, { ...tile }) }, id ?? `${device.name}-${i}`));
                }) }))] }));
}
//# sourceMappingURL=FavoritesGrid.js.map
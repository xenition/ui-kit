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
exports.ListingGalleryV3 = ListingGalleryV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * ListingGallery — design variant **V3**: a **2-column photo grid**. Where V1 is
 * a single swipe-paged frame, V3 lays every photo out as a tappable tile in two
 * columns (a contact-sheet view); tapping a tile selects it and reports the
 * index (uncontrolled, or drive it with `index`). The selected tile is ringed in
 * the primary color. Same props as {@link ListingGalleryProps}; empty renders
 * the shared `EmptyState`. `height` sets the total grid height cap via tile
 * aspect ratio. Token-only.
 */
function ListingGalleryV3({ images, height = 220, index, onIndexChange, emptyLabel = 'No photos yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const [internal, setInternal] = React.useState(0);
    const active = Math.min(index ?? internal, Math.max(images.length - 1, 0));
    if (images.length === 0) {
        return (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { title: emptyLabel, description: "Photos will appear here once uploaded.", style: style });
    }
    const select = (i) => {
        setInternal(i);
        onIndexChange?.(i);
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "none", accessibilityLabel: `Listing gallery, ${images.length} photos`, style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style], children: images.map((uri, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { testID: `xen-re-gallery-v3-tile-${i}`, accessibilityRole: "button", accessibilityState: { selected: i === active }, accessibilityLabel: `Photo ${i + 1} of ${images.length}`, onPress: () => select(i), style: {
                width: '48%',
                aspectRatio: 3 / 2,
                maxHeight: height,
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
                backgroundColor: colors.border,
                borderWidth: 2,
                borderColor: i === active ? colors.primary : 'transparent',
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri }, style: { width: '100%', height: '100%' }, resizeMode: "cover" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        top: tokens.spacing.xs,
                        left: tokens.spacing.xs,
                        backgroundColor: colors.surface,
                        borderRadius: tokens.radius.full,
                        paddingVertical: 1,
                        paddingHorizontal: tokens.spacing.xs,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: i + 1 }) })] }, `${uri}-${i}`))) }));
}
//# sourceMappingURL=ListingGalleryV3.js.map
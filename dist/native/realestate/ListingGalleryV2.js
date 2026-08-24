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
exports.ListingGalleryV2 = ListingGalleryV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * ListingGallery — design variant **V2**: a large **hero photo above a
 * thumbnail strip**. Where V1 is a swipe-paged carousel with a dot indicator,
 * V2 shows one hero and a horizontal row of tappable thumbnails below it;
 * tapping a thumbnail selects that photo (uncontrolled, or drive it with
 * `index`). Same props as {@link ListingGalleryProps}; empty renders the shared
 * `EmptyState`. Token-only.
 */
function ListingGalleryV2({ images, height = 220, index, onIndexChange, emptyLabel = 'No photos yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const [internal, setInternal] = React.useState(0);
    const active = Math.min(index ?? internal, Math.max(images.length - 1, 0));
    if (images.length === 0) {
        return (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { title: emptyLabel, description: "Photos will appear here once uploaded.", style: style });
    }
    const select = (i) => {
        if (i === active)
            return;
        setInternal(i);
        onIndexChange?.(i);
    };
    const hero = images[active] ?? images[0];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `Listing photo ${active + 1} of ${images.length}`, style: { borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: colors.border }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: hero }, style: { height, width: '100%' }, resizeMode: "cover" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: tokens.spacing.sm,
                            right: tokens.spacing.sm,
                            backgroundColor: colors.surface,
                            borderRadius: tokens.radius.full,
                            borderWidth: 1,
                            borderColor: colors.border,
                            paddingVertical: 2,
                            paddingHorizontal: tokens.spacing.sm,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: `${active + 1} / ${images.length}` }) })] }), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { testID: "xen-re-gallery-v2-strip", horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm }, children: images.map((uri, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: i === active }, accessibilityLabel: `Show photo ${i + 1}`, onPress: () => select(i), style: {
                        width: 72,
                        height: 54,
                        borderRadius: tokens.radius.md,
                        overflow: 'hidden',
                        borderWidth: 2,
                        borderColor: i === active ? colors.primary : colors.border,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri }, style: { width: '100%', height: '100%' }, resizeMode: "cover" }) }, `${uri}-${i}`))) })] }));
}
//# sourceMappingURL=ListingGalleryV2.js.map
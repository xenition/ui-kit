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
exports.ListingGallery = ListingGallery;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * Horizontally paged photo carousel for a listing — a token-styled `ScrollView`
 * with a "n / total" counter and a dot indicator. The active page is derived
 * from the scroll offset (works uncontrolled, or drive it with `index`). Data
 * only: URIs in, an `onIndexChange` callback out; nothing fetches. On an empty
 * `images` array it renders the shared `EmptyState`. Token-only colors.
 */
function ListingGallery({ images, height = 220, index, onIndexChange, emptyLabel = 'No photos yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const [internal, setInternal] = React.useState(0);
    const active = index ?? internal;
    if (images.length === 0) {
        return (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { title: emptyLabel, description: "Photos will appear here once uploaded.", style: style });
    }
    const handleScroll = (e) => {
        const { contentOffset, layoutMeasurement } = e.nativeEvent;
        const pageWidth = layoutMeasurement.width || 1;
        const next = Math.min(Math.max(Math.round(contentOffset.x / pageWidth), 0), images.length - 1);
        if (next !== active) {
            setInternal(next);
            onIndexChange?.(next);
        }
    };
    const current = Math.min(active, images.length - 1);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "adjustable", accessibilityLabel: `Listing photo ${current + 1} of ${images.length}`, style: [{ borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: colors.border }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { testID: "xen-re-gallery-scroll", horizontal: true, pagingEnabled: true, showsHorizontalScrollIndicator: false, onScroll: handleScroll, scrollEventThrottle: 16, style: { height }, children: images.map((uri, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri }, style: { height, aspectRatio: 3 / 2 }, resizeMode: "cover", accessibilityLabel: `Photo ${i + 1}` }, `${uri}-${i}`))) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: tokens.spacing.sm,
                    right: tokens.spacing.sm,
                    backgroundColor: colors.surface,
                    borderRadius: tokens.radius.full,
                    borderWidth: 1,
                    borderColor: colors.border,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: `${current + 1} / ${images.length}` }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    bottom: tokens.spacing.sm,
                    left: 0,
                    right: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                }, children: images.map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: tokens.spacing.xs,
                        height: tokens.spacing.xs,
                        borderRadius: tokens.radius.full,
                        backgroundColor: i === current ? colors.onPrimary : colors.muted,
                    } }, i))) })] }));
}
//# sourceMappingURL=ListingGallery.js.map